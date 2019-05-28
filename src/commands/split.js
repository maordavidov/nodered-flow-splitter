/* eslint-disable no-unused-vars */
const {Command, flags} = require('@oclif/command')
const flowUtil = require('../logic/flow-util')

class SplitCommand extends Command {
  async run() {
    const {flags} = this.parse(SplitCommand)

    if (!flags.flowFile) {
      throw new Error("'flowFile' is required parameter")
    }

    if (!flags.output) {
      throw new Error("'output' is required parameter")
    }

    flowUtil.split(flags.flowFile, flags.output)
  }
}

SplitCommand.description = `Provide flows.json and output folder
...

`

SplitCommand.flags = {
  flowFile: flags.string({char: 'f', description: 'flow.json file'}),
  output: flags.string({char: 'o', description: 'ouput folder'}),
}

module.exports = SplitCommand
