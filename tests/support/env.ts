import * as yargs from 'yargs';
const argv = yargs.argv;
const radixValue = 10;

export const configName: string = argv.config || 'headless';
export const profileName: string = argv.profile || 'default';
export const targetUrl: string = argv.targetUrl || 'url';
export const outputDir = `./testoutput/${profileName}`;
export const testTags: string = argv.tags || '@smoke';
export const isLocal = () => configName !== 'headless' ? true : false;
export const projectName: string = argv.testProjectName || 'local';
export const buildNumber: string = argv.buildNumber || 'local';
export const browserstackUserName: string = process.env.BROWSERSTACK_USERNAME || 'myUserName';
export const browserstackAccessKey: string = process.env.BROWSERSTACK_ACCESS_KEY || 'myKey';
export const taskId: number = parseInt(process.env.TASK_ID as string, radixValue) || 0;
