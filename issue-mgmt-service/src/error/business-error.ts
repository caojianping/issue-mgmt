/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import ResponseCode from './../response/response-code';

export default class BusinessError implements Error {
  status!: boolean; // 补充字段：响应状态
  code!: number;
  message!: string;
  name!: string;
  stack!: string;

  constructor(code: number, message: string) {
    this.status = code === ResponseCode.Success;
    this.code = code;
    this.message = message;
  }
}
