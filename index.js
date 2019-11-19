#!/usr/bin/env node
const xml2js = require('xml2js');
const fs = require('fs');
const chalk = require('chalk');
const { table } = require('table');
const tableConfig = require('./src/table-config');
const { bold } = require('./src/format');

const argv = require('yargs')
  .usage('Usage: $0 <filename> [options]')
  .demandCommand(1, 'You need to provide a filename for the istanbul coverage report you want to summarize.')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

const filename = argv._[0];

const parser = new xml2js.Parser({ attrkey: 'ATTR' });

let xmlString;

try {
  xmlString = fs.readFileSync(filename, 'utf8');
} catch (error) {
  console.log(chalk.red(error));
}

const report = [
  [bold('Section'), bold('Covered'), bold('Lines'), bold('Coverage %')]
];

if (xmlString) {
  parser.parseString(xmlString, (error, result) => {
    if (!error) {
      console.log(chalk.bold('Coverage Summary'));
      const lines = result.coverage.project[0].metrics[0].ATTR.statements;
      const coveredLines = result.coverage.project[0].metrics[0].ATTR.coveredstatements;
      const coveredPercent = `${Math.round(coveredLines/lines * 100 * 100)/100}%`
      report.push(['All Files', coveredLines, lines, coveredPercent])
      console.log(table(report, tableConfig));
    } else {
      console.log(chalk.red(error));
    }
  });
}
