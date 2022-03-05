import importCwd from 'import-cwd';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

export const readConfig = () => {
  let config = {};

  try {
    config = importCwd.silent(yargs(hideBin(process.argv)).argv['config']) || importCwd.silent('./.coverage-summary.js') || require('./.coverage-summary.js');
  } catch (error) {
    config = { bundles: [] };
  }

  return config;
}