/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-19 17:24:54
 */
export * from './type.util';
export * from './digit.util';
export * from './array.util';
export * from './date.util';

// json字符串转换对象函数
function parseJSON<T extends object>(value: string = ''): T {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    throw error;
  }
}

// 对象副本函数
function duplicate<T extends object>(data: T): T {
  return parseJSON(JSON.stringify(data)) as T;
}

// 打印错误
function printError(err: any, flag: string, isAlert: boolean = false): void {
  window.console && window.console.log(`${flag} err:`, typeof err, err);
  isAlert && alert(`${flag} err:` + JSON.stringify(err, null, 2));
}

const Util = {
  parseJSON, // json字符串转换对象函数
  duplicate, // 对象副本函数
  printError, // 打印错误
};

export default Util;
