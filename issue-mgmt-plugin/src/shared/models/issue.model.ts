/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 17:52:48
 */
import { PositionTypeEnum } from '../enums';

// 问题模型
export class IssueModel {
  public id?: string; // 编号
  public title: string; // 标题
  public description: string; // 描述
  public position: IssuePositionModel; // 位置信息

  // 创建实例
  public static createInstance(id: string, title: string, description: string, position: IssuePositionModel) {
    const issue = new IssueModel();
    issue.id = id;
    issue.title = title;
    issue.description = description;
    issue.position = position;
    return issue;
  }
}

// 问题位置模型
export class IssuePositionModel {
  public type: PositionTypeEnum; // 类型：0矩形；1椭圆形；
  public startX: number; // 起始位置：X轴偏移量
  public startY: number; // 起始位置：Y轴偏移量
  public endX: number; // 结束位置：X轴偏移量
  public endY: number; // 结束位置：Y轴偏移量

  public static createInstance(type: PositionTypeEnum, startX: number, startY: number, endX: number, endY: number) {
    const position = new IssuePositionModel();
    position.type = type;
    position.startX = startX;
    position.startY = startY;
    position.endX = endX;
    position.endY = endY;
    return position;
  }
}
