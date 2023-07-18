/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-31 22:29:46
 */
export const throttle = function (callback: Function, delay: number) {
  let timeout: any,
    now = Date.now() - 0;
  return function (event: any) {
    let last = Date.now() - 0;
    clearTimeout(timeout);

    if (last - now >= delay) {
      callback(event);
      now = last;
    } else {
      timeout = setTimeout(() => {
        callback(event);
      }, delay);
    }
  };
};
