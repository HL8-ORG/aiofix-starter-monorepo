import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * 创建和验证环境变量配置
 *
 * @returns 经过验证的环境变量对象
 *
 * @description
 * 该函数使用 @t3-oss/env-nextjs 创建类型安全的环境变量配置。
 * 包含服务端和客户端的环境变量定义及验证规则。
 *
 * 服务端环境变量:
 * - ANALYZE: 可选的分析标志
 * - NEXT_RUNTIME: 可选的运行时环境('nodejs'或'edge')
 *
 * 客户端环境变量:
 * - NEXT_PUBLIC_APP_URL: 应用URL
 * - NEXT_PUBLIC_WEB_URL: 网站URL
 * - NEXT_PUBLIC_API_URL: 可选的API URL
 * - NEXT_PUBLIC_DOCS_URL: 可选的文档URL
 */
export const keys = () =>
  createEnv({
    extends: [vercel()],
    server: {
      ANALYZE: z.string().optional(),

      // Added by Vercel
      NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
    },
    client: {
      NEXT_PUBLIC_APP_URL: z.string().url(),
      NEXT_PUBLIC_WEB_URL: z.string().url(),
      NEXT_PUBLIC_API_URL: z.string().url().optional(),
      NEXT_PUBLIC_DOCS_URL: z.string().url().optional(),
    },
    runtimeEnv: {
      ANALYZE: process.env.ANALYZE,
      NEXT_RUNTIME: process.env.NEXT_RUNTIME,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    },
  });
