const tableConfig = {
  border: {
    topBody: '\033[2m─\033[0m',
    topJoin: '\033[2m┬\033[0m',
    topLeft: '\033[2m┌\033[0m',
    topRight: '\033[2m┐\033[0m',

    bottomBody: '\033[2m─\033[0m',
    bottomJoin: '\033[2m┴\033[0m',
    bottomLeft: '\033[2m└\033[0m',
    bottomRight: '\033[2m┘\033[0m',

    bodyLeft: '\033[2m│\033[0m',
    bodyRight: '\033[2m│\033[0m',
    bodyJoin: '\033[2m│\033[0m',

    joinBody: '\033[2m─\033[0m',
    joinLeft: '\033[2m├\033[0m',
    joinRight: '\033[2m┤\033[0m',
    joinJoin: '\033[2m┼\033[0m'
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