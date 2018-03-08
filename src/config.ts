import * as path from 'path';

export interface BlogConfig {
  ROOT_PATH: string;
  dev: boolean;
  isInstalled?: boolean;
}

const config: BlogConfig = {
  ROOT_PATH: path.join(__dirname, '../'),
  dev: process.env.NODE_ENV !== 'production'
};

export default config;
