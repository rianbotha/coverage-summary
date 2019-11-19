const summarizePath = (report, path, name) => {
  let lines = 0;
  let coveredLines = 0;

  const package = path.replace(/\//g, '.');
  const sections = report.coverage.project[0].package.filter(entry => entry.ATTR.name.indexOf(package) === 0);
  sections.forEach(section => {
    lines += parseInt(section.metrics[0].ATTR.statements, 10);
    coveredLines += parseInt(section.metrics[0].ATTR.coveredstatements, 10);
  });

  const coveredPercent = `${Math.round(coveredLines / lines * 100 * 100) / 100}%`

  return [name || path, coveredLines, lines, coveredPercent];
};

module.exports = summarizePath;