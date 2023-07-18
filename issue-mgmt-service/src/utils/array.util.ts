/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-31 16:35:40
 */

/**
 * 数组去重函数，返回去重后的新数组
 * @param arrs 数组
 * @param key key
 */
function arrayDistinct(arrs: any[], key: string = ''): any[] {
  if (!arrs || arrs.length <= 0) {
    return [];
  }

  let temp: any = {},
    result: Array<any> = [];
  for (let i = 0; i < arrs.length; i++) {
    let item: any = arrs[i],
      value = key ? item[key] : JSON.stringify(item);
    if (!temp[value]) {
      result.push(item);
      temp[value] = true;
    }
  }
  return result;
}

/**
 * 数组排序，返回排序后的新数组
 * @param arrs 数组
 * @param field 字段
 * @param isAsc 是否升序
 */
function arraySort(arrs: any[], field: string = '', isAsc: boolean = false): any[] {
  if (!arrs || arrs.length <= 0) {
    return [];
  }

  arrs.sort((m, n) => {
    let v1 = field ? m[field] : m,
      v2 = field ? n[field] : n;
    if (v1 > v2) {
      return isAsc ? 1 : -1;
    } else if (v1 < v2) {
      return isAsc ? -1 : 1;
    } else {
      return 0;
    }
  });
  return arrs;
}

/**
 * 数组分组，返回分组后的新数组
 * @param arrs 数组
 * @param field 字段
 */
function arrayGroup(arrs: any[], field: string = ''): any[] {
  if (!arrs || arrs.length <= 0) {
    return [];
  }

  let temp: any = {},
    result: any[] = [];
  arrs.forEach((item: any) => {
    let key = item[field] || '';
    if (!temp.hasOwnProperty(key)) {
      temp[key] = [];
    }
    temp[key].push(item);
  });
  for (let key in temp) {
    let value = temp[key];
    result.push({ group: key, items: value });
  }
  return result;
}

/**
 * 判断数组是否相等、
 * @param arrs1 数组1
 * @param arrs2 数组2
 */
function isEqual(arrs1: Array<any>, arrs2: Array<any>): boolean {
  return JSON.stringify(arrs1) === JSON.stringify(arrs2);
}

export const ArrayUtil = {
  arrayDistinct,
  arraySort,
  arrayGroup,
  isEqual,
};
