/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-31 21:50:56
 */
const utils = require('../utils');
const argv = require('yargs').argv;
const env = argv.e;
const envConfigFile = utils.resolvePath('config/env/' + env + '.env.js');
module.exports = require(envConfigFile);
