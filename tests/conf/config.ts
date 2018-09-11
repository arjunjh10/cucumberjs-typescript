export interface Config {
  capabilities: {
    browser: 'chrome' | 'Firefox' | 'Edge' | 'android' | 'ios' | 'Safari';
    browserName: 'chrome' | 'Firefox' | 'Edge' | 'galaxy s8' | 'iPhone' | 'Safari';
    name?: string;
    project?: string;
    build?: string
    server?: string;
    os?: string;
    os_version?: string;
    resolution?: string;
    device?: string;
    chromeOptions?: object;
    failure_url?: string
  }
}
