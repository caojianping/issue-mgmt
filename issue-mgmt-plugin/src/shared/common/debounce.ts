/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-31 22:27:34
 */

export const debounce = function (callback: Function, delay: number) {
  let timeout: any;

  return function (event: any) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(event);
    }, delay);
  };
};
