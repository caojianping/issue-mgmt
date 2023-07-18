/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import Koa from 'koa';
import config from 'config';
import { Console } from './logger';
import middleware from './middleware';
import routes from './routes';

import Database from './database';
Database.connect();

const app = new Koa();
app.use(middleware());
app.use(routes());

const port = config.get<number>('services.port');
app.listen(port, () => {
  Console.info(`Koa server listen on port ${port}.`);
});
