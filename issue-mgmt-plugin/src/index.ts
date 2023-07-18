/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 17:23:16
 */
// import * as $ from 'jquery';
import 'jqueryui/jquery-ui.js';
import 'jqueryui/jquery-ui.css';

// const $test: any = $('#test');
// $test.draggable();

import App from './app';
const app = new App(document.body);
app.initPlugins();
app.initData();
