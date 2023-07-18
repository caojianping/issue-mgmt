/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 16:30:00
 */
import * as $ from 'jquery';
import { CACHE_VIEWER, pluginDefaultOptions } from '../../shared/constants';
import { IssueModel } from '../../shared/models';
import { IssueViewerComponent } from './issue-viewer.component';

// 问题查看器插件
export class IssueViewerPlugin {
  // 注入插件
  public static injectPlugin($: any, window: any, document: any) {
    $['fn'].extend({
      issueViewer: function (options: any) {
        if (typeof options === 'string') {
          const params = Array.prototype.slice.call(arguments, 1);
          return $['fn'].issueViewer.methods[options](this, params);
        }
        return new IssueViewerComponent(this, options).init();
      },
    });

    $['fn'].issueViewer.defaults = pluginDefaultOptions;

    $['fn'].issueViewer.methods = {
      // 问题查看器选项
      options: function (elements: any) {
        return $.data(elements[0], CACHE_VIEWER);
      },
      // 启用问题查看器
      enable: function (elements: any) {
        return elements.each(function () {
          $(this).issueViewer({ disabled: false });
        });
      },
      // 禁用问题查看器
      disable: function (elements: any) {
        return elements.each(function () {
          $(this).issueViewer({ disabled: true });
        });
      },
      // 刷新问题查看器
      refresh: function (elements: any, params: Array<any>) {
        const issues: Array<IssueModel> | undefined = params[0];
        if (issues) {
          return elements.each(function () {
            $(this).issueViewer({ disabled: false, issues });
          });
        }
      },
    };
  }
}
