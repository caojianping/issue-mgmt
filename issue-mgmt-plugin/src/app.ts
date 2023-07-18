/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-18 00:06:33
 */
import * as $ from 'jquery';
import { OperationTypeEnum } from './shared/enums';
import { IssueModel, IssuePositionModel } from './shared/models';
import { IssueService } from './shared/services';

import { IssueViewerPlugin } from './components/issue-viewer';
import { IssueSelectablePlugin } from './components/issue-selectable';
import { IssueModalPlugin } from './components/issue-modal';
import { IssuePartPlugin } from './components/issue-part';

export default class App {
  private $container: any;
  private issueService: IssueService;

  constructor(selector: any) {
    this.$container = $(selector);
    this.issueService = new IssueService();
    this.injectPlugins();
  }

  // 注入插件
  private injectPlugins() {
    IssueViewerPlugin.injectPlugin($, window, document);
    IssueSelectablePlugin.injectPlugin($, window, document);
    IssueModalPlugin.injectPlugin($, window, document);
    IssuePartPlugin.injectPlugin($, window, document);
  }

  // 初始化插件
  public initPlugins() {
    const { $container, issueService } = this;

    // 问题框选器插件
    $container.issueSelectable({
      visible: false,
      onStop(position: IssuePositionModel) {
        // 触发框选器停止事件后，调用问题模态框的打开方法
        const params: any = { operationType: OperationTypeEnum.Add, position };
        $container.issueModal('open', params);
      },
    });

    // 问题模态框插件
    $container.issueModal({
      visible: false,
      onShow($modal: any) {
        $container.issueSelectable('disable');
      },
      onHide() {
        $container.issueSelectable('enable');
      },
      onSave(data: { operationType: OperationTypeEnum; issue: IssueModel }) {
        console.log('Modal onSave:', data);
        const { operationType, issue } = data;
        let apiFunc: any = operationType === OperationTypeEnum.Add ? issueService.addIssue : issueService.updateIssue;
        if (apiFunc) {
          apiFunc(issue)
            .then((issues: Array<IssueModel>) => {
              alert('操作成功');
              $container.issueModal('close');
              $container.issueSelectable('close');
              $container.issueViewer('refresh', issues);
            })
            .catch((err: any) => {
              alert(err.message || err);
              $container.issueModal('close');
              $container.issueSelectable('close');
            });
        }
      },
    });

    // 问题片段插件
    $container.issuePart();

    // 问题查看器插件
    $container.issueViewer({
      onStart(issues: Array<IssueModel>) {
        // 触发查看器开始事件后，调用问题片段的初始化片段列表方法
        $container.issuePart('refresh', issues);
      },
      onDelete(data: any) {
        // 触发查看器的删除事件后，调用问题服务删除接口并删除DOM
        const { issue, $tr } = data;
        if (!issue) return;

        const id = issue.id;
        issueService
          .deleteIssue(id)
          .then(() => {
            $tr.remove();
            $container.issuePart('delete', id);
          })
          .catch((err) => alert(err.message || err));
      },
      onView(id: string) {
        // 触发查看器查看事件后，调用问题片段的切换片段显示隐藏功能
        $container.issuePart('toggle', id);
      },
    });
  }

  // 初始化数据
  public initData() {
    const { $container, issueService } = this;
    issueService
      .getIssues()
      .then((issues: Array<IssueModel>) => {
        $container.issueViewer('refresh', issues);
      })
      .catch((err) => alert(err.message || err));
  }
}
