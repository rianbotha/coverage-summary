import { formatThreshold } from './format-threshold.js';

export const formatPercent = (number, total) => {
  if (number === 0 || total === 0) return formatThreshold('0%', 0);
  const percent = Math.round(number / total * 100 * 100) / 100;
  return formatThreshold(percent + '%', percent);
};