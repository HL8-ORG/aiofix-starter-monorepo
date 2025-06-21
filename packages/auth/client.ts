import { createAuthClient } from 'better-auth/react';
import { keys } from './keys';

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: keys().NEXT_PUBLIC_BETTER_AUTH_URL,
});
