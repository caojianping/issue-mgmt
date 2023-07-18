/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-19 10:34:45
 */

// ajax类型枚举
export enum AjaxTypeEnum {
  GET = 'GET', // GET方法
  POST = 'POST', // POST方法
}

// 问题位置类型枚举
export enum PositionTypeEnum {
  Rectangle = 0, // 矩形
  Ellipse = 1, // 椭圆形
}

// 操作类型枚举
export enum OperationTypeEnum {
  Add = 0, // 添加
  Edit = 1, // 编辑
  Delete = 2, // 删除
  Toggle = 3, // 切换
}
