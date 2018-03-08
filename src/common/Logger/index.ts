import * as assert from 'assert';
import * as log4js from 'log4js';

interface LoggerConfig {
  filename: string;
  level: string;
  type?: string;
}

export default class Logger {
  public debug: Function;
  public info: Function;
  public warn: Function;
  public error: Function;
  private logger: log4js.Logger;

  constructor(config: LoggerConfig) {
    log4js.configure({
      appenders: {
        app: {
          filename: config.filename,
          type: 'dateFile'
        },
        out: {
          type: 'stdout'
        }
      },
      categories: {
        default: {
          appenders: ['app'],
          level: config.level
        },
        dev: {
          appenders: ['out'],
          level: config.level
        }
      }
    });

    this.logger = log4js.getLogger(config.type);

    ['debug', 'info', 'warn', 'error'].forEach((level) => {
      assert(this.logger[level], `adapter function ${level} not exist!`);
      this[level] = this.logger[level].bind(this.logger);
    });
  }
}
