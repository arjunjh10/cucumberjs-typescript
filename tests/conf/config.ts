export interface Config {
  capabilities: {
    browser: 'chrome' | 'firefox' | 'edge' | 'android' | 'ios' | 'safari';
    browserName: 'chrome' | 'firefox' | 'edge' | 'galaxy s8' | 'iPhone' | 'safari';
    name?: string;
    project?: string;
    build?: string
    server?: string;
    os?: string;
    os_version?: string;
    resolution?: string;
    chromeOptions?: object;
    failure_url?: string
    'browserstack.user'?: string;
    'browserstack.key'?: string;
    'browserstack.debug'?: boolean;
    'browserstack.networkLogs'?: boolean;
    'browserstack.local'?: boolean;
    'browserstack.localIdentifier'?: string;
    device?: string;
  }
}
