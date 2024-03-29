import chalk from 'chalk';
import { readConfig } from './read-config.js';

export const formatThreshold = (string, number) => {
  const config = readConfig();
  const threshold = (config && config.threshold) || [50, 75];

  if (number < threshold[0]) return chalk.red(string);
  if (number < threshold[1]) return chalk.yellow(string);

  return chalk.green(string);
};