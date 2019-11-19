const importCwd = require('import-cwd');
const argv = require('yargs').argv;

const readConfig = () => {
  let config = {};

  try {
    config = importCwd.silent(argv['config']) || importCwd.silent('./.coverage-summary.js') || require('./.coverage-summary.js');
  } catch (error) {
    config = { bundles: [] };
  }

  return config;
}

module.exports = readConfig;