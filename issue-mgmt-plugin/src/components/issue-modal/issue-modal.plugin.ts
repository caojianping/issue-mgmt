/***
 * @file:
 * @author: caojianping
 * @Date: 2021-02-10 09:43:37
 */
import * as $ from 'jquery';
import { CACHE_MODAL, pluginDefaultOptions } from '../../shared/constants';
import { IssueModalComponent } from './issue-modal.component';

// 问题模态框插件
export class IssueModalPlugin {
  // 注入插件
  public static injectPlugin($: any, window: any, document: any) {
    $['fn'].extend({
      issueModal: function (options: any) {
        if (typeof options === 'string') {
          const params = Array.prototype.slice.call(arguments, 1);
          return $['fn'].issueModal.methods[options](this, params);
        }
        return new IssueModalComponent(this, options).init();
      },
    });

    $['fn'].issueModal.defaults = pluginDefaultOptions;

    $['fn'].issueModal.methods = {
      // 问题模态框选项
      options: function (elements: any) {
        return $.data(elements[0], CACHE_MODAL);
      },
      // 启用问题模态框
      enable: function (elements: any) {
        return elements.each(function () {
          $(this).issueModal({ disabled: false });
        });
      },
      // 禁用问题模态框
      disable: function (elements: any) {
        return elements.each(function () {
          $(this).issueModal({ disabled: true });
        });
      },
      // 打开问题模态框
      open: function (elements: any, params: Array<any>) {
        const options: any = params[0];
        if (options) {
          options['disabled'] = false;
          options['visible'] = true;
          console.log('open:', options);
          return elements.each(function () {
            $(this).issueModal(options);
          });
        }
      },
      // 关闭问题模态框
      close: function (elements: any) {
        return elements.each(function () {
          $(this).issueModal({ disabled: false, visible: false });
        });
      },
    };
  }
}
