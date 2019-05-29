/* eslint-disable node/no-deprecated-api */
const fs = require('fs')
const util = require('util')
const _ = require('lodash')
const path = require('path')
const fse = require('fs-extra')
const filenamify = require('filenamify')
const readdirp = require('readdirp')

module.exports = {
  split: split,
  join: join,
}

/**
 *
 * @param {string} input Input folder path
 * @param {string} flowFile Output flow file path
 * @returns {Promise} void promise
 */
async function join(input, flowFile) {
  const files = await readdirp.promise(input, {type: 'files'})

  const all = []

  _.each(files, file => {
    const p = fse.readFile(file.fullPath)
    .then(b => b.toString())
    .then(content => JSON.parse(content))
    .then(obj => {
      if (!obj.children) {
        return [obj]
      }

      const children = obj.children
      delete obj.children
      const arr = [obj]
      return arr.concat(children)
    })

    all.push(p)
  })

  const arrays = await Promise.all(all)

  let joindArray = []

  _.each(arrays, array => {
    joindArray = joindArray.concat(array)
  })

  const flowContent = JSON.stringify(joindArray, null, 2)

  await fse.outputFile(flowFile, flowContent)
}

/**
 *
 * @param {string} filePath Flow JSON file path
 * @param {string} outputFolder Output folder path
 * @returns {Promise} Void Promise
 */
async function split(filePath, outputFolder) {
  const readFile = util.promisify(fs.readFile)
  const exists = util.promisify(fs.exists)

  const isThere = await exists(filePath)

  if (isThere === false) {
    throw new Error(`Expecting file '${filePath}'`)
  }

  const file = await readFile(filePath)

  const json = JSON.parse(file)

  const map = {}

  map.tabs = _.filter(json, node => node.type === 'tab')
  map.tabs = _.keyBy(map.tabs, node => node.id)

  map.subflows = _.filter(json, node => node.type === 'subflow')
  map.subflows = _.keyBy(map.subflows, node => node.id)
  
  map.configNodes = _.filter(json, node => !node.z);
  map.configNodes = _.keyBy(map.subflows, node => node.id)


  const nodes = _.filter(json, node => node.z)

  _.each(nodes, node => {
    const parent = map.tabs[node.z] || map.subflows[node.z]
    if (!parent) {
      throw new Error(`node with id ${node.id} has no parent - fisshy....!`)
    }

    if (!parent.children) {
      parent.children = []
    }

    parent.children.push(node)
  })

  const arr = []

  _.each(Object.keys(map), async key => {
    const output = path.join(outputFolder, key)

    _.each(map[key], node => {

      const fileName = key === 'configNodes' ? filenamify(node.id) : filenamify(`${node.name || node.label}.json`);
      const thePath = path.join(output, fileName)

      const promise = fse.outputFile(thePath, JSON.stringify(node, null, 2))

      arr.push(promise)
    })
  })
 
  await Promise.all(arr)
}
