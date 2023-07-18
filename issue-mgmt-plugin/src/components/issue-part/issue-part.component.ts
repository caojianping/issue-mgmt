/***
 * @file:
 * @author: caojianping
 * @Date: 2021-02-09 22:11:07
 */
import * as $ from 'jquery';
import { TypeUtil } from '../../shared/utils';
import { CACHE_PART, EVENT_PART, pluginDefaultOptions } from '../../shared/constants';
import { OperationTypeEnum } from '../../shared/enums';
import { IIssueModalOptions, IIssuePartOptions } from '../../shared/interfaces';
import { IssueModel, IssuePositionModel } from '../../shared/models';

// 问题片段组件
export class IssuePartComponent {
  private $elements: any;
  private options: IIssueModalOptions;

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
        self.renderDOM(cache);
        self.bindEvents(this);
      }
    });
  }

  // 缓存数据
  private cacheData(element: any) {
    let cache = $.data(element, CACHE_PART);
    if (!cache) {
      cache = $.extend({}, pluginDefaultOptions, this.options || {});
    } else {
      cache = $.extend(cache, this.options || {});
    }

    $(element).off(EVENT_PART);
    $.data(element, CACHE_PART, cache);
    return cache;
  }

  // 渲染DOM
  private renderDOM(options: IIssuePartOptions) {
    const { operationType, id, issues } = options;
    if (issues) {
      issues.forEach((issue: IssueModel) => {
        const id = issue.id;
        const $issuePart = this.getElement(id);
        if ($issuePart.length > 0) {
          this.setStyles($issuePart, issue);
        } else {
          const $newIssuePart = $(
            `<div class="issue-part" data-id="${id}" data-issue='${JSON.stringify(issue)}'>
                <i class="issue-part-close">x</i>
                <span class="issue-part-title">${issue.title}</span>
              </div>`
          );
          this.setStyles($newIssuePart, issue);
          $newIssuePart.appendTo(document.body);
        }
      });
    }

    if (!TypeUtil.isUndefinedOrNull(operationType)) {
      if (operationType === OperationTypeEnum.Toggle) {
        const $issuePart = this.getElement(id);
        $issuePart.toggle();
      } else if (operationType === OperationTypeEnum.Delete) {
        const $issuePart = this.getElement(id);
        $issuePart.remove();
      }
    }
  }

  // 获取元素
  private getElement(id: string) {
    return $(`.issue-part[data-id="${id}"]`);
  }

  // 设置样式
  private setStyles($issuePart: any, issue: IssueModel) {
    if (!issue) return;

    const position: IssuePositionModel = issue.position;
    const top = position.startY || 0;
    const left = position.startX || 0;
    const width = Math.abs((position.endX || 0) - (position.startX || 0));
    const height = Math.abs((position.endY || 0) - (position.startY || 0));

    if ($issuePart.length > 0) {
      const typeStyle = ['rectangle', 'ellipse'][position.type];
      $issuePart.css({ top, left, width, height }).addClass(`issue-part-${typeStyle}`);
    }
  }

  // 绑定事件
  private bindEvents(element: any) {
    const selector = '.issue-part .issue-part-close';
    $(element).off(EVENT_PART);
    $(element).on('click' + EVENT_PART, selector, { element: element }, function (event: any) {
      event.stopPropagation();
      $(this).parents('.issue-part').hide();
    });
  }
}
