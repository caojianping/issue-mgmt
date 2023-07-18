/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import { Schema, PaginateModel, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { IIssueDocument } from '../interfaces';

const IssueSchema: Schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    position: {
      type: Schema.Types.Mixed,
      required: false,
    },
    createTime: {
      type: Schema.Types.Date,
      required: true,
    },
    updateTime: {
      type: Schema.Types.Date,
      required: false,
    },
    isDelete: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { _id: true }
);

IssueSchema.plugin(mongoosePaginate);

IssueSchema.pre('findOneAndUpdate', function (next: any) {
  this.setOptions({ runValidators: true });
  next();
});

export const IssueModel: PaginateModel<IIssueDocument> = model('issue', IssueSchema, 'issue');
