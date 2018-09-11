import * as yargs from 'yargs';
const argv = yargs.argv;

export const configName: string = argv.config || 'headless';
export const profileName: string = argv.profile || 'default';
export const targetUrl: string = argv.url || 'url';
export const outputDir = `./testoutput/${profileName}`;
