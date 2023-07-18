/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import Router from 'koa-router';
import compose from 'koa-compose';
import config from 'config';
import apiRoute from './api.route';

const virtual = config.get<string>('services.virtual');
const childrens: Array<any> = [{ prefix: `${virtual}/api`, routes: apiRoute }];

export default function routes() {
  const router = new Router();
  childrens.forEach((children: any) => {
    const nestedRouter = new Router();
    children.routes(nestedRouter);
    router.use(children.prefix, nestedRouter.routes(), nestedRouter.allowedMethods());
  });
  return compose([router.routes(), router.allowedMethods()]);
}
