/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { IBaseDocument } from './base.interface';

export interface IIssueDocument extends IBaseDocument {
  _id: any; // 问题编号
  title: string; // 问题标题
  description: string; // 问题描述
  position: any; // 方位信息
}

export interface IIssueDTODocument {
  id: string; // 问题编号(客户端使用)
  title: string; // 问题标题
  description: string; // 问题描述
  position: any; // 方位信息
}
