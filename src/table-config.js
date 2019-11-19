const chalk = require('chalk');

const tableConfig = {
  border: {
    topBody: chalk.dim('─'),
    topJoin: chalk.dim('┬'),
    topLeft: chalk.dim('┌'),
    topRight: chalk.dim('┐'),

    bottomBody: chalk.dim('─'),
    bottomJoin: chalk.dim('┴'),
    bottomLeft: chalk.dim('└'),
    bottomRight: chalk.dim('┘'),

    bodyLeft: chalk.dim('│'),
    bodyRight: chalk.dim('│'),
    bodyJoin: chalk.dim('│'),

    joinBody: chalk.dim('─'),
    joinLeft: chalk.dim('├'),
    joinRight: chalk.dim('┤'),
    joinJoin: chalk.dim('┼'),
  },
  columns: {
    0: {
      alignment: 'left',
    },
    1: {
      alignment: 'right',
    },
    2: {
      alignment: 'right',
    },
    3: {
      alignment: 'right',
    }
  },
  drawHorizontalLine: (index, size) => {
    return index === 0 || index === 1 || index === size;
  }
};

module.exports = tableConfig;