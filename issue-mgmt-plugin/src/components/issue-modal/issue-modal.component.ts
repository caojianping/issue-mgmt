/***
 * @file:
 * @author: caojianping
 * @Date: 2021-02-09 20:21:27
 */
import * as $ from 'jquery';
import Util, { TypeUtil } from '../../shared/utils';
import { CACHE_MODAL, EVENT_MODAL, pluginDefaultOptions } from '../../shared/constants';
import { OperationTypeEnum, PositionTypeEnum } from '../../shared/enums';
import { IssueModel, IssuePositionModel } from '../../shared/models';
import { IIssueModalOptions } from '../../shared/interfaces';

// 问题模态框
export class IssueModalComponent {
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
        self.renderDOM();
        self.setData(this, cache);
        self.bindEvents(this);
      }
    });
  }

  // 缓存数据
  private cacheData(element: any) {
    let cache = $.data(element, CACHE_MODAL);
    if (!cache) {
      cache = $.extend({}, pluginDefaultOptions, this.options || {});
    } else {
      cache = $.extend(cache, this.options || {});
    }

    $(element).off(EVENT_MODAL);
    $.data(element, CACHE_MODAL, cache);
    return cache;
  }

  // 渲染DOM
  private renderDOM() {
    let $modal = $('.issue-modal');
    if (Util.isEmptyElement($modal)) {
      $modal = $(`<div class="issue-modal">
        <header class="issue-modal-header">
          <h1 class="issue-modal-title"></h1>
          <span class="issue-modal-close">X</span>
        </header>
        <div class="issue-modal-body">
            <ul>
                <li>
                    <label for="title">问题标题</label>
                    <input id="title" placeholder="请输入问题标题" />
                </li>
                <li>
                    <label for="description">问题描述</label>
                    <input id="description" placeholder="请输入问题描述" />
                </li>
            </ul>
        </div>
        <footer class="issue-modal-footer">
          <button class="issue-modal-reset">重置</button>
          <button class="issue-modal-save">保存</button>
        </footer>
      </div>`);
      $modal.draggable();
      $modal.appendTo(document.body);
    }
  }

  // 设置数据
  private setData(element: any, options: IIssueModalOptions) {
    if (!options) return;

    const { operationType, issue, visible } = options;
    if (!TypeUtil.isUndefinedOrNull(operationType)) {
      const title = ['添加', '编辑'][operationType] + '问题';
      $('.issue-modal .issue-modal-title').text(title);
    }

    if (issue) {
      $('.issue-modal #title').val(issue.title || '');
      $('.issue-modal #description').val(issue.description || '');
    }

    if (visible) {
      $('.issue-modal').show();
      const onShow = options.onShow;
      if (onShow) {
        onShow.call(element);
      }
    } else {
      $('.issue-modal').hide();
      const onHide = options.onHide;
      if (onHide) {
        onHide.call(element, $('.issue-modal'));
      }
    }
  }

  // 绑定事件
  private bindEvents(element: any) {
    this.closeModal(element);
    this.resetForm(element);
    this.saveForm(element);
  }

  // 关闭模态框
  private closeModal(element: any) {
    const selector = '.issue-modal .issue-modal-close';
    $(element).on('click' + EVENT_MODAL, selector, { element: element }, function (event: any) {
      event.stopPropagation();

      $('.issue-modal').hide();

      const delement = event.data.element;
      const cache = $.data(delement, CACHE_MODAL);
      if (cache && cache.onHide) {
        cache.onHide.call(delement);
      }
    });
  }

  // 重置表单
  private resetForm(element: any) {
    const selector = '.issue-modal .issue-modal-reset';
    $(element).on('click' + EVENT_MODAL, selector, { element: element }, function (event: any) {
      event.stopPropagation();

      $('.issue-modal #title').val('');
      $('.issue-modal #description').val('');

      const delement = event.data.element;
      const cache = $.data(delement, CACHE_MODAL);
      if (cache && cache.onReset) {
        cache.onReset.call(delement);
      }
    });
  }

  // 保存表单
  private saveForm(element: any) {
    const selector = '.issue-modal .issue-modal-save';
    $(element).on('click' + EVENT_MODAL, selector, { element: element }, function (event: any) {
      event.stopPropagation();

      const result = new IssueModel();
      const delement = event.data.element;
      const cache = $.data(delement, CACHE_MODAL);
      const operationType = cache.operationType;
      if (operationType === OperationTypeEnum.Add) {
        const position = cache.position;
        if (!position) return;

        result.position = IssuePositionModel.createInstance(
          PositionTypeEnum.Rectangle,
          position.startX,
          position.startY,
          position.endX,
          position.endY
        );
      } else if (operationType === OperationTypeEnum.Edit) {
        const issue = cache.issue;
        if (!issue) return;

        result.id = issue.id;
        result.position = issue.position;
      }

      const title: any = $('.issue-modal #title').val() || '';
      const description: any = $('.issue-modal #description').val() || '';
      result.title = title;
      result.description = description;

      if (cache && cache.onSave) {
        cache.onSave.call(delement, { operationType, issue: result });
      }
    });
  }
}
