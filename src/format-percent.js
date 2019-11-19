const formatThreshold = require('./format-threshold');

const formatPercent = (number, total) => {
  const percent = Math.round(number / total * 100 * 100) / 100;
  return formatThreshold(percent + '%', percent);
};

module.exports = formatPercent;