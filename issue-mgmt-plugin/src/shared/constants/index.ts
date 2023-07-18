/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-19 10:31:21
 */
import { IBaseOptions } from '../interfaces';

export const CACHE_ISSUES = 'CACHE_ISSUES'; // 缓存：问题列表
export const CACHE_VIEWER = 'CACHE_VIEWER'; // 缓存：问题查看器
export const CACHE_SELECTABLE = 'CACHE_SELECTABLE'; // 缓存：问题框选器
export const CACHE_MODAL = 'CACHE_MODAL'; // 缓存：问题模态框
export const CACHE_PART = 'CACHE_PART'; // 缓存：问题片段

export const EVENT_VIEWER = '.EVENT_VIEWER'; // 事件命名空间：问题查看器
export const EVENT_SELECTABLE = '.EVENT_SELECTABLE'; // 事件命名空间：问题框选器
export const EVENT_MODAL = '.EVENT_MODAL'; // 事件命名空间：问题模态框
export const EVENT_PART = '.EVENT_PART'; // 事件命名空间：问题片段

export const pluginDefaultOptions: IBaseOptions = { disabled: false }; // 插件默认选项
