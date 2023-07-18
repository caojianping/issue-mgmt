/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-19 20:05:18
 */
import * as $ from 'jquery';
import Util from '../../shared/utils';
import { debounce } from '../../shared/common';
import { CACHE_SELECTABLE, EVENT_SELECTABLE, pluginDefaultOptions } from '../../shared/constants';
import { PositionTypeEnum } from '../../shared/enums';
import { IIssueSelectableOptions } from '../../shared/interfaces';
import { IssuePositionModel } from '../../shared/models';

var mouseHandler: boolean = false;
var attachData: any = {};

// 问题框选器组件
export class IssueSelectableComponent {
  private $elements: any;
  private options: IIssueSelectableOptions;

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
    let cache = $.data(element, CACHE_SELECTABLE);
    if (!cache) {
      cache = $.extend({}, pluginDefaultOptions, self.options || {});
    } else {
      cache = $.extend(cache, self.options || {});
    }

    $(element).off(EVENT_SELECTABLE);
    $(document).off(EVENT_SELECTABLE);
    $.data(element, CACHE_SELECTABLE, cache);
    return cache;
  }

  // 渲染DOM
  private renderDOM() {
    let $overlay = $('.issue-overlay');
    if (Util.isEmptyElement($overlay)) {
      $overlay = $('<div class="issue-overlay"><div class="issue-selectable"></div></div>');
      $overlay.appendTo(document.body);
    }
  }

  // 设置数据
  private setData(element: any, options: IIssueSelectableOptions) {
    if (!options) return;

    const $overlay = $('.issue-overlay');
    const $selectable = $('.issue-overlay .issue-selectable');
    const { position, visible } = options;
    if (position) {
      $selectable.css({
        top: position.startY + 'px',
        left: position.startX + 'px',
        width: position.endX - position.startX + 'px',
        height: position.endY - position.startY + 'px',
      });
    }

    if (visible) {
      $overlay.show();
      if (options && options.onShow) {
        options.onShow.call(element);
      }
    } else {
      $overlay.hide();
      $selectable.removeAttr('style');
      if (options && options.onHide) {
        options.onHide.call(element);
      }
    }
  }

  // 是否可以显示
  private isShowable(position: IssuePositionModel) {
    return position.endX - position.startX >= 15 && position.endY - position.startY >= 15;
  }

  // 绑定事件
  private bindEvents(element: any) {
    const self = this;

    // 鼠标down事件
    $(document).on('mousedown' + EVENT_SELECTABLE, { element: element }, function (event: any) {
      console.log('document mousedown:', event, mouseHandler);
      event.stopPropagation();
      if (mouseHandler) return;

      mouseHandler = true;
      const { pageX, pageY } = event;
      const delement = event.data.element;
      attachData = { element: delement, startX: pageX, startY: pageY };

      const cache = $.data(delement, CACHE_SELECTABLE);
      if (cache && cache.onStart) {
        cache.onStart.call(delement, event);
      }

      // 鼠标move事件
      $(document).on(
        'mousemove' + EVENT_SELECTABLE,
        attachData,
        debounce(function (event: any) {
          event.stopPropagation();
          if (!mouseHandler) return;

          const data: any = event.data || {};
          const delement: any = data.element;
          const position = IssuePositionModel.createInstance(
            PositionTypeEnum.Rectangle,
            data.startX,
            data.startY,
            event.pageX,
            event.pageY
          );
          console.log('document mousemove event,isShowable:', event, self.isShowable(position));
          if (self.isShowable(position)) {
            self.setData(delement, { position, visible: true });
          }
        }, 10)
      );

      // 鼠标up事件
      $(document).on('mouseup' + EVENT_SELECTABLE, attachData, function (event: any) {
        event.stopPropagation();
        mouseHandler = false;

        const data: any = event.data || {};
        const delement: any = data.element;
        const position = IssuePositionModel.createInstance(
          PositionTypeEnum.Rectangle,
          data.startX,
          data.startY,
          event.pageX,
          event.pageY
        );
        if (self.isShowable(position) && !$('.issue-selectable').is(':hidden')) {
          console.log('document mouseup:', event);
          const cache = $.data(delement, CACHE_SELECTABLE);
          if (cache && cache.onStop) {
            cache.onStop.call(delement, position);
          }
        }
      });
    });
  }
}
