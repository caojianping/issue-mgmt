/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 13:57:32
 */
const fs = require("fs");
const path = require("path");

module.exports = {
  resolvePath: function (relativePath) {
    let rootPath = fs.realpathSync(process.cwd());
    return path.resolve(rootPath, relativePath);
  },
};
