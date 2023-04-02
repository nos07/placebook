import { z } from 'zod';

const envSchema = z.object({
	// Server-side
	// DB
	DATABASE_URL: z
		.string()
		.default('postgres://postgres:postgrespw@localhost:49153/postgres'),
	// Nodemailer
	GMAIL_ADDRESS: z.string(),
	GMAIL_APP_PASSWORD: z.string(),
	// NextAuth
	NEXTAUTH_URL: z.string().default('http://localhost:3000'),
	SECRET: z.string(),
	// FACEBOOK_ID: z.string(),
	// FACEBOOK_SECRET: z.string(),
	// GOOGLE_ID: z.string(),
	// GOOGLE_SECRET: z.string(),
	// AWS S3
	AWS_ACCESS_KEY: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
	AWS_BUCKET_NAME: z.string().default('ap-southeast-1'),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
	console.error(result.error);
	throw new Error('Invalid configuration');
}

export const env = result.data;
