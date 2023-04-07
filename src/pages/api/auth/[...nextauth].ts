import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

export default NextAuth(authOptions);
// NOTE: https://github.com/nextauthjs/next-auth/issues/6792