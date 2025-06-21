import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['scripts/index.ts'],
  outDir: 'dist',
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
});

/**
 * tsup 是一个基于 esbuild 的 TypeScript 打包工具，它能够快速地将 TypeScript 代码打包成各种模块格式。

让我们详细分析一下这个配置文件的各个选项：

1. `entry: ['scripts/index.ts']` 
   - 指定了打包的入口文件，这里是从 `scripts/index.ts` 开始打包

2. `outDir: 'dist'`
   - 指定打包后的文件输出目录为 `dist`

3. `sourcemap: false`
   - 不生成 sourcemap 文件，这可以减小最终打包文件的体积

4. `minify: true`
   - 启用代码压缩，减小最终文件的体积

5. `dts: true`
   - 生成 TypeScript 的类型声明文件（.d.ts 文件），这对于库的发布很重要

6. `format: ['cjs', 'esm']`
   - 同时输出两种模块格式：
     - `cjs`: CommonJS 格式，适用于 Node.js 环境
     - `esm`: ES Modules 格式，适用于现代浏览器和打包工具

这个配置文件主要用于构建一个 TypeScript 库或工具，它能够：
- 将 TypeScript 代码编译成 JavaScript
- 生成类型声明文件
- 支持多种模块格式
- 优化输出文件的大小

让我看看这个项目中的其他相关文件，以便更好地理解这个配置的具体用途。


Ran tool
让我看看入口文件的内容：

Read file: scripts/index.ts
现在我可以更详细地解释这个配置文件的具体用途了：

这个 `tsup.config.ts` 是用来构建一个命令行工具（CLI）的配置文件。从 `scripts/index.ts` 的内容可以看出，这是一个用于初始化和更新项目的工具，主要功能包括：

1. 提供 `init` 命令：
   - 用于初始化新的 next-forge 项目
   - 支持设置项目名称
   - 支持选择包管理器（npm、yarn、bun、pnpm）
   - 可以选择是否初始化 git

2. 提供 `update` 命令：
   - 用于更新项目版本
   - 支持指定从哪个版本更新到哪个版本

这个配置文件的作用是：
1. 将 TypeScript 编写的 CLI 工具打包成可执行文件
2. 生成类型声明文件，方便其他开发者使用
3. 同时支持 CommonJS 和 ESM 两种模块格式，确保工具在不同环境下都能正常运行
4. 通过压缩和禁用 sourcemap 来优化最终打包文件的大小

这是一个典型的 Node.js CLI 工具的构建配置，使用了现代化的工具链（TypeScript + tsup）来确保代码质量和构建效率。
 */
