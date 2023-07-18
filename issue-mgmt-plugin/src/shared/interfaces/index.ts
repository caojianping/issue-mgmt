/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 16:58:05
 */
import { OperationTypeEnum } from '../enums';
import { IssueModel, IssuePositionModel } from '../models';

// 基类接口
export interface IBaseOptions {
  disabled?: boolean; // 禁用
  onStart?: Function; // 开始事件
  onStop?: Function; // 停止事件
}

// 问题查看器选项接口
export interface IIssueViewerOptions extends IBaseOptions {
  issues?: Array<IssueModel>; // 问题列表
  onView?: Function; // 查看事件
  onDelete?: Function; // 删除事件
}

// 问题框选器选项接口
export interface IIssueSelectableOptions extends IBaseOptions {
  visible: boolean; // 可见性
  position?: IssuePositionModel; // 位置
  onShow?: Function; // 显示事件
  onHide?: Function; // 隐藏事件
}

// 问题模态框选项接口
export interface IIssueModalOptions extends IBaseOptions {
  visible: boolean; // 可见性
  operationType?: OperationTypeEnum; // 操作类型
  issue?: IssueModel; // 问题数据
  position?: IssuePositionModel; // 位置
  onShow?: Function; // 模态框显示事件
  onHide?: Function; // 模态框隐藏事件
  onReset?: Function; // 表单重置事件
  onSave?: Function; // 表单保存事件
}

// 问题片段选项接口
export interface IIssuePartOptions extends IBaseOptions {
  operationType?: OperationTypeEnum; // 操作类型
  issues?: Array<IssueModel>; // 问题列表
  id?: string; // 问题编号
}
