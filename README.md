flow_splitter
=============

Split \Merge node red flow file 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/flow_splitter.svg)](https://npmjs.org/package/flow_splitter)
[![CircleCI](https://circleci.com/gh/maordavidov/flow_splitter/tree/master.svg?style=shield)](https://circleci.com/gh/maordavidov/flow_splitter/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/flow_splitter.svg)](https://npmjs.org/package/flow_splitter)
[![License](https://img.shields.io/npm/l/flow_splitter.svg)](https://github.com/maordavidov/flow_splitter/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @maordavidov/flow_splitter
$ flow_splitter COMMAND
running command...
$ flow_splitter (-v|--version|version)
@maordavidov/flow_splitter/1.0.1 win32-x64 node-v8.15.0
$ flow_splitter --help [COMMAND]
USAGE
  $ flow_splitter COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`flow_splitter help [COMMAND]`](#flow_splitter-help-command)
* [`flow_splitter join`](#flow_splitter-join)
* [`flow_splitter split`](#flow_splitter-split)

## `flow_splitter help [COMMAND]`

display help for flow_splitter

```
USAGE
  $ flow_splitter help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_

## `flow_splitter join`

Provide flows.json and output folder

```
USAGE
  $ flow_splitter join

OPTIONS
  -i, --input=input        input folder folder
  -o, --flowFile=flowFile  flow.json file

DESCRIPTION
  ...
```

_See code: [src\commands\join.js](https://github.com/maordavidov/flow_splitter/blob/v1.0.1/src\commands\join.js)_

## `flow_splitter split`

Provide flows.json and output folder

```
USAGE
  $ flow_splitter split

OPTIONS
  -f, --flowFile=flowFile  flow.json file
  -o, --output=output      ouput folder

DESCRIPTION
  ...
```

_See code: [src\commands\split.js](https://github.com/maordavidov/flow_splitter/blob/v1.0.1/src\commands\split.js)_
<!-- commandsstop -->
