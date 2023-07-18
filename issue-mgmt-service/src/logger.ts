/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import log4js from 'log4js';
import config from 'config';

const logPath = config.get<string>('logPath');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: logPath + 'logger.log' },
    dateFile: {
      type: 'dateFile',
      filename: logPath + 'logger',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      absolute: false,
    },
  },
  categories: {
    default: { appenders: ['dateFile'], level: 'INFO' },
    console: { appenders: ['console'], level: 'INFO' },
    logger: { appenders: ['file'], level: 'INFO' },
    loggers: { appenders: ['dateFile'], level: 'INFO' },
  },
});

export const Console = log4js.getLogger('console');
export const Logger = log4js.getLogger('logger');
export const Loggers = log4js.getLogger('loggers');
