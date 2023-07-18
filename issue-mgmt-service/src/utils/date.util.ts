import { DigitUtil } from './digit.util';

/**
 * 日期替换函数，解决兼容问题，返回yyyy/MM/dd hh:mm格式日期
 * @param date 日期
 */
function dateReplace(date: string): string {
  if (!date) {
    return '';
  }
  return date.replace(/-/g, '/');
}

/**
 * 日期转换函数
 * @param date 日期
 */
function dateConvert(date: string | number | Date): Date | null {
  if (!date) {
    return null;
  }

  let result: Date = new Date();
  if (typeof date === 'string') {
    if (date.indexOf('-') > -1) {
      result = new Date(dateReplace(date));
    } else {
      result = new Date(date);
    }
  } else if (typeof date === 'number') {
    result = new Date(date);
  } else if (date instanceof Date) {
    result = date;
  } else {
    result = new Date(date);
  }
  return result;
}

/**
 * 日期格式化函数，返回自定义格式日期
 * @param date 日期
 * @param format 格式
 * @param isZeroize 是否需要补零
 * @param isUTC 是否为UTC时间
 */
function dateFormat(
  date: string | number | Date,
  format: string = 'yyyy-MM-dd hh:mm',
  isZeroize: boolean = true,
  isUTC: boolean = false
): string {
  const cdate = dateConvert(date);
  if (!cdate) {
    return '';
  }

  const dy = isUTC ? cdate.getUTCFullYear() : cdate.getFullYear(),
    dM = (isUTC ? cdate.getUTCMonth() : cdate.getMonth()) + 1,
    dd = isUTC ? cdate.getUTCDate() : cdate.getDate(),
    dh = isUTC ? cdate.getUTCHours() : cdate.getHours(),
    dm = isUTC ? cdate.getUTCMinutes() : cdate.getMinutes(),
    ds = isUTC ? cdate.getUTCSeconds() : cdate.getSeconds(),
    dS = isUTC ? cdate.getUTCMilliseconds() : cdate.getMilliseconds(),
    config: any = {
      'y+': dy.toString(),
      'M+': !isZeroize ? dM.toString() : dM < 10 ? '0' + dM.toString() : dM.toString(),
      'd+': !isZeroize ? dd.toString() : dd < 10 ? '0' + dd.toString() : dd.toString(),
      'h+': !isZeroize ? dh.toString() : dh < 10 ? '0' + dh.toString() : dh.toString(),
      'm+': !isZeroize ? dm.toString() : dm < 10 ? '0' + dm.toString() : dm.toString(),
      's+': !isZeroize ? ds.toString() : ds < 10 ? '0' + ds.toString() : ds.toString(),
      S: dS.toString(),
    };

  for (const key in config) {
    const pattern = new RegExp(key);
    if (!pattern.test(format)) {
      continue;
    }

    const matches = format.match(pattern);
    if (!matches) {
      continue;
    }

    let first = matches[0],
      value = config[key];
    if (key === 'S') {
      format = format.replace(first, value);
    } else {
      format = format.replace(first, value.substr(value.length - first.length));
    }
  }
  return format;
}

/**
 * 日期凌晨化函数，返回日期凌晨时间
 * @param date 日期
 */
function dateMorning(date: string | number | Date): Date {
  const cdate: Date = dateConvert(date) || new Date(),
    year = cdate.getFullYear(),
    month = cdate.getMonth(),
    day = cdate.getDate();
  return new Date(year, month, day, 0, 0, 0, 0);
}

/**
 * 日期星期几函数，返回周期几
 * @param date 日期
 * @param prefix 前缀
 */
function dateWeek(date: string | number | Date, prefix: string = '周'): string {
  const cdate: Date = dateConvert(date) || new Date();
  return prefix + '日一二三四五六'.charAt(cdate.getDay());
}

/**
 * 日期换行函数
 * @param date 日期
 */
function dateLine(date: number | string): string {
  if (typeof date == 'number' && date <= 0) {
    return '--';
  }
  if (!date) {
    return '--';
  }

  let cdate = dateFormat(date),
    parts = cdate.split(' ');
  return parts.join('<br/>');
}

/**
 * 日期计算函数，返回计算后的新日期
 * @param date 日期
 * @param type 类型：y M d h m s S
 * @param value
 */
function dateCalculate(date: Date, type: string = 'y', value: number = 0): Date {
  let result: number = 0,
    clone = new Date(date.getTime());
  switch (type) {
    case 'y':
      result = clone.setFullYear(clone.getFullYear() + value);
      break;
    case 'M':
      result = clone.setMonth(clone.getMonth() + value);
      break;
    case 'd':
      result = clone.setDate(clone.getDate() + value);
      break;
    case 'h':
      result = clone.setHours(clone.getHours() + value);
      break;
    case 'm':
      result = clone.setMinutes(clone.getMinutes() + value);
      break;
    case 's':
      result = clone.setSeconds(clone.getSeconds() + value);
      break;
    case 'S':
      result = clone.setMilliseconds(clone.getMilliseconds() + value);
      break;
  }
  return new Date(result);
}

/**
 * 日期倒计时函数，返回倒计时
 * @param seconds 秒数
 * @param isComplex 是否显示复杂格式
 */
function dateCountdown(seconds: number, isComplex: boolean = false): string {
  let secondTime = 0, // 秒数
    minuteTime = 0, // 分钟
    hourTime = 0, // 小时
    dayTime = 0; // 天数
  if (seconds > 60) {
    minuteTime = parseInt(String(seconds / 60)); // 分钟：秒数除以60取整
    secondTime = parseInt(String(seconds % 60)); // 秒数：秒数除以60取余（处理分钟后得重新处理秒数）

    if (minuteTime > 60) {
      hourTime = parseInt(String(minuteTime / 60)); // 小时：分钟除以60取整
      minuteTime = parseInt(String(minuteTime % 60)); // 分钟：分钟除以60取余（处理小时后得重新处理分钟）

      if (hourTime > 24) {
        dayTime = parseInt(String(hourTime / 24)); // 天数：小时除以24取整
        hourTime = parseInt(String(hourTime % 24)); // 小时：小时除以24取余（处理天数后得重新处理小时）
      }
    }
  } else {
    secondTime = parseInt(String(seconds));
  }
  if (!isComplex) {
    let result = '';
    if (seconds >= 3600 * 24) {
      result += `<i>${dayTime}</i>天`;
    }
    if (seconds >= 3600) {
      result += `<i>${DigitUtil.digitZeroize(hourTime)}</i>时`;
    }
    if (seconds >= 60) {
      result += `<i>${DigitUtil.digitZeroize(minuteTime)}</i>分`;
    }
    if (seconds > 0) {
      result += `<i>${DigitUtil.digitZeroize(secondTime)}</i>秒`;
    }
    return result;
  } else {
    let dayStr = '';
    if (seconds >= 3600 * 24) {
      dayStr = String(dayTime)
        .split('')
        .map((item: string) => `<i>${item}</i>`)
        .join('');
      dayStr += '<span>天</span>';
    }

    let hourStr = DigitUtil.digitZeroize(hourTime)
      .split('')
      .map((item: string) => `<i>${item}</i>`)
      .join('');
    hourStr += '<span>时</span>';

    let minuteStr = DigitUtil.digitZeroize(minuteTime)
      .split('')
      .map((item: string) => `<i>${item}</i>`)
      .join('');
    minuteStr += '<span>分</span>';

    let secondStr = DigitUtil.digitZeroize(secondTime)
      .split('')
      .map((item: string) => `<i>${item}</i>`)
      .join('');
    secondStr += '<span>秒</span>';
    return dayStr + hourStr + minuteStr + secondStr;
  }
}

/**
 * 日期时长函数
 * @param seconds 秒数
 */
function dateDuration(seconds: number): string {
  let secondTime = 0, // 秒数
    minuteTime = 0, // 分钟
    hourTime = 0, // 小时
    dayTime = 0; // 天数
  if (seconds > 60) {
    minuteTime = parseInt(String(seconds / 60)); // 分钟：秒数除以60取整
    secondTime = parseInt(String(seconds % 60)); // 秒数：秒数除以60取余（处理分钟后得重新处理秒数）

    if (minuteTime > 60) {
      hourTime = parseInt(String(minuteTime / 60)); // 小时：分钟除以60取整
      minuteTime = parseInt(String(minuteTime % 60)); // 分钟：分钟除以60取余（处理小时后得重新处理分钟）

      if (hourTime > 24) {
        dayTime = parseInt(String(hourTime / 24)); // 天数：小时除以24取整
        hourTime = parseInt(String(hourTime % 24)); // 小时：小时除以24取余（处理天数后得重新处理小时）
      }
    }
  } else {
    secondTime = parseInt(String(seconds));
  }

  let result = '';
  if (seconds >= 3600 * 24) {
    result += `${dayTime}天`;
  }
  if (seconds >= 3600) {
    result += `${hourTime}时`;
  }
  if (seconds >= 60) {
    result += `${minuteTime}分`;
  }
  // if (seconds > 0) {
  // 	result += `${secondTime}秒`;
  // }
  return result;
}

/**
 * 日期相等校验函数，返回true/false
 * @param leftDate
 * @param rightDate
 * @param hasTime
 */
function dateEqual(leftDate: Date, rightDate: Date, hasTime: boolean = false): boolean {
  if (!hasTime) {
    return dateMorning(leftDate).getTime() === dateMorning(rightDate).getTime();
  }
  return leftDate.getTime() === rightDate.getTime();
}

export const DateUtil = {
  dateReplace,
  dateConvert,
  dateFormat,
  dateMorning,
  dateWeek,
  dateLine,
  dateCalculate,
  dateCountdown,
  dateDuration,
};
