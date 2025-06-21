import { createEnv } from '@t3-oss/env-nextjs';
import { keys as auth } from '@repo/auth/keys';

export const env = createEnv({
  extends: [auth()],
  server: {},
  client: {},
  runtimeEnv: {},
});
