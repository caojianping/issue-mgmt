/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { Context } from 'koa';
import { Logger } from '../logger';
import ResponseResult from './response-result';
import ResponseOptions from './response-options';

export default () => async (ctx: Context, next: Function) => {
  ctx.success = function success<T>(data: T) {
    ctx.body = ResponseResult.success<T>(data);
  };

  ctx.failure = function failure<T>(options?: number | ResponseOptions, message?: string) {
    let result = ResponseResult.failure<T>(options, message);
    ctx.body = result;
    Logger.info('/Failure trace,message:', result.trace, result.message);
  };

  await next();
};
