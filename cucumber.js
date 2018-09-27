require('dotenv-safe').load({
  allowEmptyValues: true
});
const yargs = require('yargs');
const fs = require('fs-extra');
const argv = yargs.argv;

const makeDir = require('make-dir');
const profileName = argv.profile || 'default';
const outputDir = `./testoutput/${profileName}`;
fs.emptyDir(outputDir);
const targetResultJson = `${outputDir}/${profileName}.json`;
const commonOptions = `--format json:${targetResultJson} --format summary --require-module ts-node/register --require tests/step_definitions/*.ts --fail-fast`;
const common = `${commonOptions}`;

makeDir(outputDir);

module.exports = {
  'default': common
};
