/**
 * 身份认证处理器模块
 * @module auth/handlers
 */

// 确保代码只在服务端运行
import 'server-only';
// 导入 Next.js 认证处理器转换函数
import { toNextJsHandler } from 'better-auth/next-js';

// 导入认证实例
import { auth } from './server';

/**
 * 导出 Next.js API 路由处理器
 * @remarks
 * 将 auth 实例转换为 Next.js API 路由可用的 GET 和 POST 处理器
 * - GET: 用于处理会话状态查询等只读操作
 * - POST: 用于处理登录、注册等需要修改状态的操作
 * @description Better Auth 官方所说的框架不敏感，实际上是做了这一层转换
 * 因此，不同的框架需要适配不同的转换函数
 */
export const { POST, GET } = toNextJsHandler(auth);
