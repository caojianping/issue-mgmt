/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-19 20:05:18
 */
import * as $ from 'jquery';
import { CACHE_SELECTABLE, pluginDefaultOptions } from '../../shared/constants';
import { IssueSelectableComponent } from './issue-selectable.component';

// 问题框选器插件
export class IssueSelectablePlugin {
  public static injectPlugin($: any, window: any, document: any) {
    $['fn'].extend({
      issueSelectable: function (options: any) {
        if (typeof options === 'string') {
          const args = Array.prototype.slice.call(arguments, 1);
          return $['fn'].issueSelectable.methods[options](this, args);
        }
        return new IssueSelectableComponent(this, options).init();
      },
    });

    $['fn'].issueSelectable.defaults = pluginDefaultOptions;

    $['fn'].issueSelectable.methods = {
      // 问题框选器选项
      options: function (elements: any) {
        return $.data(elements[0], CACHE_SELECTABLE);
      },
      // 启用问题框选器
      enable: function (elements: any) {
        return elements.each(function () {
          $(this).issueSelectable({ disabled: false });
        });
      },
      // 禁用问题框选器
      disable: function (elements: any) {
        return elements.each(function () {
          $(this).issueSelectable({ disabled: true });
        });
      },
      // 打开问题框选器
      open: function (elements: any, params: Array<any>) {
        const options: any = params[0];
        if (options) {
          options['disabled'] = false;
          options['visible'] = true;
          return elements.each(function () {
            $(this).issueSelectable(options);
          });
        }
      },
      // 关闭问题框选器
      close: function (elements: any) {
        return elements.each(function () {
          $(this).issueSelectable({ disabled: false, visible: false });
        });
      },
    };
  }
}
