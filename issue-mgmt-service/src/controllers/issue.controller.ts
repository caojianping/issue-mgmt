/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { Context } from 'koa';
import { Console, Logger } from '../logger';
import { ErrorType } from '../error';
import { IIssueDocument } from '../interfaces';
import { IssueService } from '../services';

const issueService = new IssueService();

export default class IssueController {
  // 获取问题列表
  async getIssues(ctx: Context, next: Function) {
    const issues = await issueService.getIssues();
    Console.info('/getIssues issues:', issues);
    ctx.success(issues);
  }

  // 获取问题分页列表
  async getPageIssues(ctx: Context, next: Function) {
    const params: any = ctx.params || {};
    const mpage: any = Number(params.page || 1);
    const mlimit: any = Number(params.limit || 10);
    const page = isNaN(mpage) ? 1 : mpage;
    const limit = isNaN(mlimit) ? 10 : mlimit;
    const conditions: any = ctx.request.body || {};
    const options = { sort: { createTime: -1 }, page, limit };
    Console.info('/getPageIssues conditions,options:', conditions, options);

    const result = await issueService.getPage<IIssueDocument>(conditions, options);
    Console.info('/getPageIssues result:', result);
    ctx.success(result);
  }

  // 获取问题数据
  async getIssue(ctx: Context, next: Function) {
    const params: any = ctx.params || {};
    Console.info('/getIssue params:', params);

    const issue = await issueService.getIssueById(params.id);
    Console.info('/getIssue issue:', issue);
    ctx.success(issue);
  }

  // 添加问题
  async addIssue(ctx: Context, next: Function) {
    const data: any = ctx.request.body || {};
    Console.info('/addIssue data:', data);

    await issueService.addIssue(data);
    const issues = await issueService.getIssues();
    Console.info('/addIssue issues:', issues);
    ctx.success(issues);
  }

  // 更新问题
  async updateIssue(ctx: Context, next: Function) {
    const data: any = ctx.request.body || {};
    Console.info('/updateIssue data:', data);

    await issueService.updateIssue(data.id, data);
    const issues = await issueService.getIssues();
    Console.info('/updateIssue issues:', issues);
    ctx.success(issues);
  }

  // 删除问题
  async deleteIssue(ctx: Context, next: Function) {
    const data: any = ctx.request.body || {};
    Console.info('/deleteIssue data:', data);

    await issueService.softDelete(data.id);
    const issues = await issueService.getIssues();
    Console.info('/deleteIssue issues:', issues);
    ctx.success(issues);
  }
}
