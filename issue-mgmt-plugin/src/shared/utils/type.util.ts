/**
 * 解析数据类型
 * @param data 被解析数据
 */
function resolveType(data: any): string {
  switch (typeof data) {
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'undefined':
      return 'undefined';
    case 'function':
      return 'function';
    case 'symbol':
      return 'symbol';
    case 'object':
    default:
      switch (Object.prototype.toString.call(data)) {
        case '[object Number]':
          return 'number';
        case '[object String]':
          return 'string';
        case '[object Boolean]':
          return 'boolean';
        case '[object Undefined]':
          return 'undefined';
        case '[object Null]':
          return 'null';
        case '[object Function]':
          return 'function';
        case '[object Array]':
          return 'array';
        case '[object Symbol]':
          return 'symbolin';
        case '[object Promise]':
          return 'promise';
        case '[object Error]':
          return 'error';
        case '[object RegExp]':
          return 'regexp';
        default:
          if (typeof Array !== 'undefined' && data instanceof Array) return 'array';
          if (typeof Function !== 'undefined' && data instanceof Function) return 'function';
          if (typeof Promise !== 'undefined' && data instanceof Promise) return 'promise';
          if (typeof Error !== 'undefined' && data instanceof Error) return 'error';
          if (typeof RegExp !== 'undefined' && data instanceof RegExp) return 'regexp';
      }
  }
  return 'object';
}

/**
 * 验证是否为生成器函数
 * @param data 数据
 */
function isGenerator(data: any): boolean {
  return (
    Object.prototype.toString.call(data) === '[Object GeneratorFunction]' || /^\s*(?:function)?\*/.test(data.toString())
  );
}

export const TypeUtil = {
  getType: resolveType,
  isUndefined: function (data: any): boolean {
    return resolveType(data) === 'undefined';
  },
  isNull: function (data: any): boolean {
    return resolveType(data) === 'null';
  },
  isUndefinedOrNull: function (data: any): boolean {
    return resolveType(data) === 'undefined' || resolveType(data) === 'null';
  },
  isNumber: function (data: any): boolean {
    return resolveType(data) === 'number';
  },
  isString: function (data: any): boolean {
    return resolveType(data) === 'string';
  },
  isBoolean: function (data: any): boolean {
    return resolveType(data) === 'boolean';
  },
  isArray: function (data: any): boolean {
    return (Array.isArray && Array.isArray(data)) || resolveType(data) === 'array';
  },
  isFunction: function (data: any): boolean {
    return resolveType(data) === 'function';
  },
  isPlainFunction: function (data: any): boolean {
    return resolveType(data) === 'function' && !isGenerator(data);
  },
  isGeneratorFunction: function (data: any): boolean {
    return resolveType(data) === 'function' && isGenerator(data);
  },
  isSymbol: function (data: any): boolean {
    return resolveType(data) === 'symbol';
  },
  isPlainObject: function (data: any): boolean {
    return resolveType(data) === 'object';
  },
  isPromise: function (data: any): boolean {
    return resolveType(data) === 'promise';
  },
  isError: function (data: any): boolean {
    return resolveType(data) === 'error';
  },
  isRegExp: function (data: any): boolean {
    return resolveType(data) === 'regexp';
  },
  /**
   * 判断是否为空对象
   * @param data 数据
   */
  isEmptyObject: function (data: any): boolean {
    return !data || JSON.stringify(data) === '{}';
  },
};
