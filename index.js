#!/usr/bin/env node
const xml2js = require('xml2js');
const fs = require('fs');
const chalk = require('chalk');
const importCwd = require('import-cwd');
const { table } = require('table');
const tableConfig = require('./src/table-config');
const summarizePath= require('./src/summarize-path');

const argv = require('yargs')
  .usage('Usage: $0 <filename> [options]')
  .describe('config', 'Path to config file.')
  .demandCommand(1, 'You need to provide a filename for the istanbul coverage report you want to summarize.')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

let config = {};

try {
  config = importCwd.silent(argv['config'] || './.coverage-summary.js');
} catch (error) {
  config = { bundles: [] };
}

const filename = argv._[0];

const parser = new xml2js.Parser({ attrkey: 'ATTR' });

let xmlString;

try {
  xmlString = fs.readFileSync(filename, 'utf8');
} catch (error) {
  console.log(chalk.red('Error reading report', error));
}


const report = [
  [chalk.bold('Section'), chalk.bold('Covered'), chalk.bold('Lines'), chalk.bold('Coverage %')]
];

if (xmlString) {
  parser.parseString(xmlString, (error, result) => {
    if (!error) {
      const lines = result.coverage.project[0].metrics[0].ATTR.statements;
      const coveredLines = result.coverage.project[0].metrics[0].ATTR.coveredstatements;
      const coveredPercent = `${Math.round(coveredLines/lines * 100 * 100)/100}%`
      report.push(['All Files', coveredLines, lines, coveredPercent])

      config.bundles.forEach(bundle => report.push(summarizePath(result, bundle.path, bundle.name)));

      console.log(table(report, tableConfig));
    } else {
      console.log(chalk.red(error));
    }
  });
}
