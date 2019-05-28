/* eslint-disable node/no-deprecated-api */
const fs = require('fs')
const util = require('util')
const _ = require('lodash')
const path = require('path')
const fse = require('fs-extra')
const filenamify = require('filenamify')

module.exports = {
  split: split,
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
      const thePath = path.join(output, filenamify(`${node.name || node.label}.json`))

      const promise = fse.outputFile(thePath, JSON.stringify(node, null, 2))

      arr.push(promise)
    })
  })

  await Promise.all(arr)
}
