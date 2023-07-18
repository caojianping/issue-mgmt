/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { Context } from 'koa';
import { Console, Logger } from '../logger';
import BusinessError from './business-error';

export default () => async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof BusinessError) {
      Console.info('/BusinessError err:', err);
      Logger.info('/BusinessError err:', err);
      ctx.status = 200;
      ctx.failure(err.code, err.message);
    } else {
      Console.info('/NonBusinessError status,message,err:', err.status, err.message, err);
      Logger.info('/NonBusinessError status,message,err:', err.status, err.message, err);
      let status = err.status || 500;
      ctx.status = status;
      ctx.failure(status, err.message || err);
    }
  }
};
