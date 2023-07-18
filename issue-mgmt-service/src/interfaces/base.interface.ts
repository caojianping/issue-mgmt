/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { Document } from 'mongoose';

export interface IBaseDocument extends Document {
  createTime: Date;
  updateTime?: Date;
  isDelete: boolean;
}
