/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 16:30:00
 */
import * as $ from 'jquery';
import Util from '../../shared/utils';
import { CACHE_VIEWER, EVENT_VIEWER, pluginDefaultOptions } from '../../shared/constants';
import { IIssueViewerOptions } from '../../shared/interfaces';
import { IssueModel } from '../../shared/models';

// 问题查看器组件
export class IssueViewerComponent {
  private $elements: any;
  private options: IIssueViewerOptions;

  constructor(elements: any, options: any) {
    this.$elements = elements;
    this.options = options;
  }

  // 初始化
  public init() {
    const self = this;
    return self.$elements.each(function () {
      const cache = self.cacheData(this);
      if (!cache.disabled) {
        self.renderDOM();
        self.setData(this, cache);
        self.bindEvents(this);
      }
    });
  }

  // 缓存数据
  private cacheData(element: any) {
    const self = this;
    let cache = $.data(element, CACHE_VIEWER);
    if (!cache) {
      cache = $.extend({}, pluginDefaultOptions, self.options || {});
    } else {
      cache = $.extend(cache, self.options || {});
    }

    $(element).off(EVENT_VIEWER);
    $.data(element, CACHE_VIEWER, cache);
    return cache;
  }

  // 渲染DOM
  private renderDOM() {
    let $viewer = $('.issue-viewer');
    if (Util.isEmptyElement($viewer)) {
      $viewer = $(`<div class="issue-viewer">
          <header class="issue-viewer-header">
            <h1 class="issue-viewer-title">问题管理器</h1>
            <span class="issue-viewer-switch">开关</span>
          </header>
          <div class="issue-viewer-body"></div>
        </div>`);
      $viewer.appendTo(document.body);
    }
  }

  // 设置数据
  private setData(element: any, options: IIssueViewerOptions) {
    if (!options) return;

    const issues = options.issues;
    if (issues) {
      let tableHtml = '<table><thead><tr><th>标题</th><th>描述</th><th>操作</th></tr></thead><tbody>';
      issues.forEach((item: IssueModel) => {
        tableHtml += `<tr data-issue='${JSON.stringify(item)}'>
          <td>${item.title}</td>
          <td>${item.description}</td>
          <td>
            <span class="issue-viewer-delete">删除</span>
            <span class="issue-viewer-view">查看</span>
          </td>
        </tr>`;
      });
      tableHtml += '</tbody></table>';
      $('.issue-viewer').find('.issue-viewer-body').empty().append(tableHtml);
    }
    $('.issue-viewer').show();

    const onStart = options.onStart;
    if (onStart) {
      onStart.call(element, issues);
    }
  }

  // 绑定事件
  private bindEvents(element: any) {
    this.toggleViewer(element);
    this.deleteIssue(element);
    this.viewIssue(element);
  }

  // 切换查看器
  private toggleViewer(element: any) {
    const selector = '.issue-viewer-switch';
    $(element).on('click' + EVENT_VIEWER, selector, function (event: any) {
      event.stopPropagation();

      let $viewer = $(this).parents('.issue-viewer');
      $viewer.toggleClass('issue-viewer-collapsed');
    });
  }

  // 删除问题
  private deleteIssue(element: any) {
    const selector = '.issue-viewer-delete';
    $(element).on('click' + EVENT_VIEWER, selector, { element: element }, function (event: any) {
      event.stopPropagation();

      const $tr = $(this).parents('tr');
      const issueJson = $tr.attr('data-issue');
      const issueData: any = Util.parseJSON(issueJson);

      const delement = event.data.element;
      const cache = $.data(delement, CACHE_VIEWER);
      if (cache && cache.onDelete) {
        cache.onDelete.call(delement, { issue: issueData, $tr: $tr });
      }
    });
  }

  // 查看问题
  private viewIssue(element: any) {
    const selector = '.issue-viewer-view';
    $(element).on('click' + EVENT_VIEWER, selector, { element: element }, function (event: any) {
      event.stopPropagation();

      const $tr = $(this).parents('tr');
      const issueJson = $tr.attr('data-issue');
      const issueData: any = Util.parseJSON(issueJson);

      const delement = event.data.element;
      const cache = $.data(delement, CACHE_VIEWER);
      if (cache && cache.onView) {
        cache.onView.call(delement, issueData.id);
      }
    });
  }
}
