/* eslint-disable no-unused-vars */
const {Command, flags} = require('@oclif/command')
const flowUtil = require('../logic/flow-util')

class JoinCommand extends Command {
  async run() {
    const {flags} = this.parse(JoinCommand)

    if (!flags.input) {
      throw new Error("'input' is required parameter")
    }

    if (!flags.flowFile) {
      throw new Error("'flowFile' is required parameter")
    }

    flowUtil.joinToFile(flags.input, flags.flowFile, flags.tab)
  }
}

JoinCommand.description = `Provide flows.json and output folder
...

`

JoinCommand.flags = {
  input: flags.string({char: 'i', description: 'input folder folder'}),
  flowFile: flags.string({char: 'o', description: 'flow.json file'}),
  tab: flags.string({char: 't', description: 'join flow from specific tabs', multiple: true}),
}

module.exports = JoinCommand
