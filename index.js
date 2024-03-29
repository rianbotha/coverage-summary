#!/usr/bin/env node
import xml2js from 'xml2js';
import fs from 'node:fs';
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { table } from 'table';
import { tableConfig } from './src/table-config.js';
import { summarizePath } from './src/summarize-path.js';
import { formatPercent } from './src/format-percent.js';
import { readConfig } from './src/read-config.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <filename> [options]')
  .describe('config', 'Path to config file.')
  .demandCommand(1, 'You need to provide a filename for the istanbul coverage report you want to summarize.')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

const config = readConfig();

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
      report.push(['All Files', coveredLines, lines, formatPercent(coveredLines, lines)])

      config.bundles.forEach(bundle => report.push(summarizePath(result, bundle.path, bundle.name)));
      const date = new Date(parseInt(result.coverage.ATTR.generated)).toLocaleString();
      console.log('Summary for report generated on', date);
      console.log(table(report, tableConfig));
    } else {
      console.log(chalk.red(error));
    }
  });
}
