/***
 * @file:
 * @author: caojianping
 * @Date: 2021-02-10 09:48:15
 */
import * as $ from 'jquery';
import { CACHE_PART, pluginDefaultOptions } from '../../shared/constants';
import { OperationTypeEnum } from '../../shared/enums';
import { IssuePartComponent } from './issue-part.component';

// 问题片段插件
export class IssuePartPlugin {
  // 注入插件
  public static injectPlugin($: any, window: any, document: any) {
    $['fn'].extend({
      issuePart: function (options: any) {
        if (typeof options === 'string') {
          const params = Array.prototype.slice.call(arguments, 1);
          return $['fn'].issuePart.methods[options](this, params);
        }
        return new IssuePartComponent(this, options).init();
      },
    });

    $['fn'].issuePart.defaults = pluginDefaultOptions;

    $['fn'].issuePart.methods = {
      // 问题片段选项
      options: function (elements: any) {
        return $.data(elements[0], CACHE_PART);
      },
      // 启用问题片段
      enable: function (elements: any) {
        return elements.each(function () {
          $(this).issuePart({ disabled: false });
        });
      },
      // 禁用问题片段
      disable: function (elements: any) {
        return elements.each(function () {
          $(this).issuePart({ disabled: true });
        });
      },
      // 刷新问题片段
      refresh: function (elements: any, params: Array<any>) {
        const issues: any = params[0];
        if (issues) {
          return elements.each(function () {
            $(this).issuePart({ disabled: false, issues });
          });
        }
      },
      // 切换问题片段
      toggle: function (elements: any, params: Array<any>) {
        const id: any = params[0];
        if (id) {
          return elements.each(function () {
            $(this).issuePart({ disabled: false, operationType: OperationTypeEnum.Toggle, id });
          });
        }
      },
      // 删除问题片段
      delete: function (elements: any, params: Array<any>) {
        const id: any = params[0];
        if (id) {
          return elements.each(function () {
            $(this).issuePart({ disabled: false, operationType: OperationTypeEnum.Delete, id });
          });
        }
      },
    };
  }
}
