#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-add-component-signatures';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('component-structure', {
    choices: ['flat', 'nested'] as const,
    default: 'flat',
    describe: 'Component structure (how your components are colocated)',
    type: 'string',
  })
  .option('convert-javascript', {
    default: false,
    describe: 'Convert *.{js,gjs} files?',
    type: 'boolean',
  })
  .option('root', {
    describe: 'Location of your Ember project',
    type: 'string',
  })
  .option('type', {
    choices: ['app', 'v1-addon', 'v2-addon'] as const,
    demandOption: true,
    describe: 'Type of your Ember project',
    type: 'string',
  })
  .parseSync();

const codemodOptions: CodemodOptions = {
  componentStructure: argv[
    'component-structure'
  ] as CodemodOptions['componentStructure'],
  convertJavaScript: argv['convert-javascript'],
  projectRoot: argv['root'] ?? process.cwd(),
  projectType: argv['type'],
};

runCodemod(codemodOptions);
