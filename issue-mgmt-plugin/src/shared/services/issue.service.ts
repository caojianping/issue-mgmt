/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 17:52:03
 */
import * as $ from 'jquery';
import { Urls } from '../config';
import { AjaxTypeEnum } from '../enums';
import { IssueModel } from '../models';
// import { IssueHelper } from '../helpers';

// 问题服务
export class IssueService {
  // 获取问题列表
  public async getIssues(): Promise<Array<IssueModel>> {
    return new Promise((resolve, reject) => {
      $.getJSON(Urls.issue.list, function (result: any) {
        if (result.status) {
          const issues = result.data || [];
          // IssueHelper.setIssues(issues);
          return resolve(issues);
        } else {
          return reject(result.message);
        }
      });
    });
  }

  // 添加问题
  public async addIssue(issue: IssueModel): Promise<Array<IssueModel>> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: Urls.issue.add,
        type: AjaxTypeEnum.POST,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(issue),
        success: function (result: any) {
          if (result.status) {
            // const issues = IssueHelper.addIssue(result.data);
            const issues = result.data || [];
            return resolve(issues);
          } else {
            return reject(result.message);
          }
        },
      });
    });
  }

  // 更新问题
  public async updateIssue(issue: IssueModel): Promise<Array<IssueModel>> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: Urls.issue.update,
        type: AjaxTypeEnum.POST,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(issue),
        success: function (result: any) {
          if (result.status) {
            // const issues = IssueHelper.updateIssue(result.data);
            const issues = result.data || [];
            return resolve(issues);
          } else {
            return reject(result.message);
          }
        },
      });
    });
  }

  // 删除问题
  public async deleteIssue(id: string): Promise<Array<IssueModel>> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: Urls.issue.delete,
        type: AjaxTypeEnum.POST,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ id: id }),
        success: function (result: any) {
          if (result.status) {
            // const issues = IssueHelper.deleteIssue(id);
            const issues = result.data || [];
            return resolve(issues);
          } else {
            return reject(result.message);
          }
        },
      });
    });
  }
}
