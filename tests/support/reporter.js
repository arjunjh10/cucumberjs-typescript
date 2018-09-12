// Can be used to separate the reporting process out from the test run
const reporter = require('cucumber-html-reporter');
const outputDir = './testoutput';

const options = {
  brandTitle: 'Test Report',
  theme: 'hierarchy',
  jsonDir: outputDir,
  output: `${outputDir}/test-report.html`,
  reportSuiteAsScenarsios: true,
  launchReport: false
};

// This generates HTML report.
reporter.generate(options);