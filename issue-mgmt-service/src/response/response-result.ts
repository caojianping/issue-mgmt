/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import uuidv1 from 'uuid/v1';
import ResponseCode from './response-code';
import ResponseOptions from './response-options';

function getOptions(options?: number | ResponseOptions, message?: string): ResponseOptions {
  let tcode, tmessage;
  if (options === undefined) {
    tcode = ResponseCode.Unknown;
    tmessage = '操作失败';
  } else if (typeof options === 'number') {
    tcode = options;
    tmessage = message;
  } else {
    let toptions: ResponseOptions = <ResponseOptions>options;
    tcode = toptions.code;
    tmessage = toptions.message;
  }
  tcode = tcode === undefined ? ResponseCode.Unknown : tcode;
  tmessage = tmessage || '操作失败';
  return <ResponseOptions>{ code: tcode, message: tmessage };
}

export default class ResponseResult<T extends Object> {
  status: boolean;
  code: number;
  data: T;
  message: string;
  trace: string;

  constructor(status: boolean, code: number, data: T, message: string) {
    this.status = status;
    this.code = code;
    this.data = data;
    this.message = message;
    this.trace = uuidv1();
  }

  public static success<T>(data: T): ResponseResult<T> {
    return new ResponseResult<T>(true, ResponseCode.Success, data, '操作成功');
  }

  public static failure<T>(options?: number | ResponseOptions, message?: string): ResponseResult<T> {
    let roptions: ResponseOptions = getOptions(options, message);
    return new ResponseResult<T>(false, roptions.code, null, roptions.message);
  }
}
