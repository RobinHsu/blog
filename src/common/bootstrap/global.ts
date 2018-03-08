import * as fs from 'fs';
import * as path from 'path';
import config, {BlogConfig} from '../../config';
import Logger from '../Logger';

const blogConfig = config;

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger;
      blogConfig: BlogConfig;
    }
  }
}

global.logger = new Logger({
  filename: path.join(blogConfig.ROOT_PATH, './runtime/blog.log'),
  level: blogConfig.dev ? 'debug' : 'info',
  type: blogConfig.dev ? 'dev' : 'app'
});

blogConfig.isInstalled = false;

try {
  const installedFile = blogConfig.ROOT_PATH + path.sep + '.installed';
  if (fs.existsSync(installedFile)) {
    blogConfig.isInstalled = true;
  }
} catch (e) {
  global.logger.error(e);
}

global.blogConfig = blogConfig;
