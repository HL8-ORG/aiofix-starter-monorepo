const path = require('node:path');
const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vitest/config');

/**
 * Vite/Vitest 配置对象
 * @type {import('vitest/config').UserConfig}
 *
 * @property {Array} plugins - Vite插件数组，包含用于支持JSX的React插件
 * @property {Object} test - Vitest测试配置
 * @property {string} test.environment - 测试环境设置为'jsdom'以模拟浏览器环境
 * @property {Object} resolve - 模块解析配置
 * @property {Object} resolve.alias - 导入路径别名配置
 * @property {string} resolve.alias.@ - 当前目录的别名
 * @property {string} resolve.alias.@repo - packages目录的别名
 */
const config = defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@repo': path.resolve(__dirname, '../../packages'),
    },
  },
});

module.exports = config;
