/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-31 16:35:40
 */
import { TypeUtil } from './type.util';

/**
 * 数字补零
 * @param digit 数字
 */
function digitZeroize(digit: number): string {
  return digit >= 0 && digit < 10 ? `0${String(digit)}` : String(digit);
}

/**
 * 数字转换
 * @param digit 数字
 */
function digitConvert(digit: any): number | undefined | null {
  if (TypeUtil.isUndefinedOrNull(digit)) {
    return digit;
  }
  if (TypeUtil.isNumber(digit)) {
    return digit;
  }

  const ndigit = Number(digit);
  return isNaN(ndigit) ? 0 : ndigit;
}

/**
 * 数字百分比
 * @param digit 数字
 * @param precision 小数点位数
 * @param isString 是否返回字符串
 * @param isDivide 是否为除尘运算
 */
function digitPercent(
  digit: any,
  precision: number = 2,
  isString: boolean = false,
  isDivide: boolean = false
): number | string {
  let cdigit = digitConvert(digit) || 0,
    ndigit = isDivide ? cdigit / 100 : cdigit * 100;

  if (!isString) {
    return Number(ndigit.toFixed(precision));
  }
  return ndigit.toFixed(precision);
}

/**
 * 数字精度
 * @param digit 数字
 * @param precision 小数点位数
 * @param isString 是否返回字符串
 */
function digitPrecision(digit: any, precision: number = 2, isString: boolean = false) {
  let cdigit = digitConvert(digit) || 0;

  if (!isString) {
    return Number(cdigit.toFixed(precision));
  }
  return cdigit.toFixed(precision);
}

export const DigitUtil = {
  digitZeroize,
  digitConvert,
  digitPercent,
  digitPrecision,
};
