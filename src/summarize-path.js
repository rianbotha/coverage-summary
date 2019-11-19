const formatPercent = require('./format-percent');

const summarizePath = (report, paths, name) => {
  let lines = 0;
  let coveredLines = 0;
  const packages = paths;

  packages.forEach(path => {
    const package = path.replace(/\//g, '.');
    const sections = report.coverage.project[0].package.filter(entry => entry.ATTR.name.indexOf(package) === 0);
    sections.forEach(section => {
      lines += parseInt(section.metrics[0].ATTR.statements, 10);
      coveredLines += parseInt(section.metrics[0].ATTR.coveredstatements, 10);
    });
  });

  return [name || path[0], coveredLines, lines, formatPercent(coveredLines, lines)];
};

module.exports = summarizePath;