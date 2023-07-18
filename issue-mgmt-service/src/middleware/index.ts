/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import path from 'path';
import koaCompose from 'koa-compose';
import koaConvert from 'koa-convert';
import koaHelmet from 'koa-helmet';
import koaCors from 'koa-cors';
import koaBodyParser from 'koa-bodyparser';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';
import koaStatic from 'koa-static';

import { koaError } from '../error';
import { koaResponse } from '../response';

export default function middlewares() {
  return koaCompose([
    koaError(),

    koaHelmet(),
    koaConvert(koaCors()),
    koaBodyParser(),
    koaJson(),
    koaLogger(),
    koaStatic(path.join(__dirname, '../../', 'static')),

    koaResponse(),
  ]);
}
