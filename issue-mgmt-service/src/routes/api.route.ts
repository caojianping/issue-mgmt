/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import Router from 'koa-router';
import { IssueController } from '../controllers';

const issueController = new IssueController();

export default (router: Router) => {
  return router
    .get('/issue/list', issueController.getIssues)
    .get('/issue/page/:page/:limit', issueController.getPageIssues)
    .get('/issue/detail/:id', issueController.getIssue)
    .post('/issue/add', issueController.addIssue)
    .post('/issue/update', issueController.updateIssue)
    .post('/issue/delete', issueController.deleteIssue);
};
