import type { GetServerSidePropsContext } from 'next';
import {
	getServerSession,
	type NextAuthOptions,
	type DefaultSession,
	type DefaultUser,
	Account,
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			// ...other properties
			// role: UserRole;
		} & DefaultSession['user'];
	}

	interface User {
		toke: string;
		// ...other properties
		// role: UserRole;
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		user: any;
		/** OpenID ID Token */
		// idToken?: string;
	}
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
	theme: {
		colorScheme: 'light',
	},
	secret: process.env.SECRET,
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `strategy` should be set to 'jwt' if no database is used.
		strategy: 'jwt',
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days
		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},
	/**
	 * Specify URLs to be used if you want to create custom sign in, sign out and error pages.
	 * Pages specified will override the corresponding built-in page.
	 */
	pages: {
		signIn: '/signin', // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: '/auth/new-user' // If set, new users will be directed here on first sign in
	},
	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},
	// Enable debug messages in the console if you are having problems
	debug: false,
	// Callbacks are asynchronous functions you can use to control what happens when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		async signIn(req) {
			return true;
		},
		// async redirect({ url, baseUrl }) { return baseUrl },
		// async session({ session, token, user }) { return session },
		// async jwt({ token, user, account, profile, isNewUser }) { return token }
		session({ session, token }) {
			if (session.user) {
				session.user = token.user;
				// session.user.role = user.role; <-- put other properties on the session here
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		/**
		 * ...add more providers here
		 *
		 * Most other providers require a bit more work than the Discord provider.
		 * For example, the GitHub provider requires you to add the
		 * `refresh_token_expires_in` field to the Account model. Refer to the
		 * NextAuth.js docs for the provider you want to use. Example:
		 * @see https://next-auth.js.org/providers/github
		 **/
		CredentialsProvider({
			id: 'credentials',
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				name: { type: 'text', label: 'Name' },
				email: { type: 'text', label: 'Email' },
				password: { type: 'password', label: 'Password' },
			},
			// @ts-ignore
			async authorize(credentials, _req) {
				try {
					const { name = '', email = '', password } = credentials!;
					const user = await prisma.user.findUnique({
						where: { email },
					});
					if (user) {
						const match = await bcrypt.compare(password, user?.password);
						if (match) return user;
						return null;
					}
					return null;
				} catch (error) {
					return null;
				}
			},
		}),
		// FacebookProvider({
		//   clientId: process.env.FACEBOOK_ID,
		//   clientSecret: process.env.FACEBOOK_SECRET,
		// }),
		// GoogleProvider({
		//   clientId: process.env.GOOGLE_ID,
		//   clientSecret: process.env.GOOGLE_SECRET,
		// }),
	],
};

/**
 * Wrapper for getServerSession so that you don't need
 * to import the authOptions in every file.
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
