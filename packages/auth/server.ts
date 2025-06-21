import { database } from '@repo/database';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

// 一个模拟的当前用户，用于测试
export const currentUser = () => {
  return {
    id: 'user_2xIDMqz9DNe3EDtP',
    fullName: '张三',
    emailAddresses: [
      {
        emailAddress: 'zhangsan@example.com',
      },
    ],
    imageUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
