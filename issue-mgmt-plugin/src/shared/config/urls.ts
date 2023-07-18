/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-23 13:54:59
 */
const env: any = process.env;
const baseUrl = env.API_HOST;

console.log('env:', typeof env, env);
console.log('baseUrl:', typeof baseUrl, baseUrl);

export const Urls = {
  issue: {
    list: `${baseUrl}/issue/list`, // 获取问题列表接口
    page: `${baseUrl}/issue/page`, // 获取问题分页列表接口
    detail: `${baseUrl}/issue/detail`, // 获取问题详情接口
    add: `${baseUrl}/issue/add`, // 添加问题接口
    update: `${baseUrl}/issue/update`, // 更新问题接口
    delete: `${baseUrl}/issue/delete`, // 删除问题接口
  },
};
