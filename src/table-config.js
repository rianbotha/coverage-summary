const { feint } = require('./format');

const tableConfig = {
  border: {
    topBody: feint('─'),
    topJoin: feint('┬'),
    topLeft: feint('┌'),
    topRight: feint('┐'),

    bottomBody: feint('─'),
    bottomJoin: feint('┴'),
    bottomLeft: feint('└'),
    bottomRight: feint('┘'),

    bodyLeft: feint('│'),
    bodyRight: feint('│'),
    bodyJoin: feint('│'),

    joinBody: feint('─'),
    joinLeft: feint('├'),
    joinRight: feint('┤'),
    joinJoin: feint('┼'),
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