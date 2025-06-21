#!/usr/bin/env node

import { program } from 'commander';
import { initialize } from './initialize.js';
import { update } from './update.js';

/**
 * 使用 Commander.js 构建命令行工具
 *
 * @remarks
 * Commander.js 是一个完整的 node.js 命令行解决方案。这里我们定义了两个主要命令:
 * 1. init - 用于初始化新项目
 * 2. update - 用于项目版本更新
 */

/**
 * 初始化命令配置
 *
 * @remarks
 * 通过 program.command() 创建 init 子命令
 * 支持以下选项:
 * - --name: 设置项目名称
 * - --package-manager: 选择包管理器
 * - --disable-git: 禁用 git 初始化
 */
program
  .command('init')
  .description('Initialize a new next-forge project')
  .option('--name <name>', 'Name of the project')
  .option(
    '--package-manager <manager>',
    'Package manager to use (npm, yarn, bun, pnpm)'
  )
  .option('--disable-git', 'Disable git initialization')
  .action(initialize);

/**
 * 更新命令配置
 *
 * @remarks
 * 通过 program.command() 创建 update 子命令
 * 支持以下选项:
 * - --from: 指定起始版本
 * - --to: 指定目标版本
 */
program
  .command('update')
  .description('Update the project from one version to another')
  .option('--from <version>', 'Version to update from e.g. 1.0.0')
  .option('--to <version>', 'Version to update to e.g. 2.0.0')
  .action(update);

/**
 * 解析命令行参数
 *
 * @remarks
 * Commander 会自动解析 process.argv 中的参数
 * 根据定义的命令和选项执行相应的 action 处理函数
 */
program.parse(process.argv);
