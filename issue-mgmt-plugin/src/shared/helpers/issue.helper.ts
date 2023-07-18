/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-19 18:19:52
 */
import { LocalStorage } from 'jts-storage';
import { CACHE_ISSUES } from '../constants';
import { IssueModel } from '../models';

export class IssueHelper {
  // 获取问题列表
  public static getIssues(): Array<IssueModel> {
    return LocalStorage.getItem<Array<IssueModel>>(CACHE_ISSUES);
  }

  // 设置问题列表
  public static setIssues(issues: Array<IssueModel>): boolean {
    return LocalStorage.setItem<Array<IssueModel>>(CACHE_ISSUES, issues);
  }

  // 删除问题列表
  public static deleteIssues(): boolean {
    return LocalStorage.removeItem(CACHE_ISSUES);
  }

  // 删除问题
  public static deleteIssue(id: string): Array<IssueModel> {
    const issues = IssueHelper.getIssues();
    const filterIssues = issues.filter((item) => item.id !== id);
    IssueHelper.setIssues(filterIssues);
    return filterIssues;
  }

  // 添加问题
  public static addIssue(issue: IssueModel): Array<IssueModel> {
    const issues = IssueHelper.getIssues();
    const filterIssue = issues.filter((item) => item.title === issue.title)[0];
    if (filterIssue) {
      throw new Error('问题已经存在');
    }

    issues.push(issue);
    IssueHelper.setIssues(issues);
    return issues;
  }

  // 更新问题
  public static updateIssue(issue: IssueModel): Array<IssueModel> {
    const issues = IssueHelper.getIssues();
    for (let i = 0; i < issues.length; i++) {
      let item = issues[i];
      if (item.id === issue.id) {
        issues.splice(i, 1, issue);
      }
    }
    IssueHelper.setIssues(issues);
    return issues;
  }
}
