/***
import { IIssueDTODocument } from "./../interfaces/issue.interface";
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { BusinessError, ErrorType } from '../error';
import { IssueModel } from '../models';
import { IIssueDocument, IIssueDTODocument } from '../interfaces';
import BaseService from './base.service';

export default class IssueService extends BaseService {
  constructor() {
    super(IssueModel);
  }

  // 转换函数
  private convert(issues: Array<IIssueDocument> = []): Array<IIssueDTODocument> {
    return issues.map((item: IIssueDocument) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      position: item.position,
    }));
  }

  // 获取问题列表
  async getIssues(): Promise<Array<IIssueDTODocument>> {
    const issues = await this.model.find({ isDelete: false }, null, { lean: true });
    return this.convert(issues);
  }

  // 获取问题
  async getIssueById(id: string): Promise<IIssueDocument | null> {
    if (!id) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[问题编号]`)
      );
    } else {
      return await this.model.findOne({ _id: id, isDelete: false });
    }
  }

  // 添加问题
  async addIssue(issue: any): Promise<IIssueDocument | null> {
    if (!issue) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[问题]`)
      );
    }

    const { title, description, position } = issue;
    if (!title) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[问题标题]`)
      );
    }
    if (!description) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[问题描述]`)
      );
    }
    if (!position) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[方位信息]`)
      );
    }

    let result = await this.isExist({ title: title, isDelete: false });
    if (result.status) {
      return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[问题]`));
    } else {
      issue['createTime'] = new Date();
      issue['isDelete'] = false;
      return await this.model.create(issue);
    }
  }

  // 更新问题
  async updateIssue(id: string, update: any): Promise<IIssueDocument | null> {
    if (!id) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[问题编号]`)
      );
    }
    if (!update) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[问题更新数据]`)
      );
    }

    update['updateTime'] = new Date();
    delete update.id;
    return await this.model.findByIdAndUpdate(id, { $set: update }, { new: true });
  }
}
