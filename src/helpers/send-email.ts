import dedent from 'ts-dedent';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prismadb';
import { SendEmailError } from '@/lib/exceptions';
import crypto from 'crypto';
import { env } from '@/config/env';

const transport = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	auth: {
		user: env.GMAIL_ADDRESS,
		pass: env.GMAIL_APP_PASSWORD,
	},
});

export async function sendEmailVerification(
	name: string,
	id: string,
	email: string,
) {
	const findVerificationCode = await prisma.userVerification.findMany({
		where: { userId: id },
	});
	if (findVerificationCode) {
		await prisma.userVerification.deleteMany({});
	}
	const verification = await prisma.userVerification.create({
		data: {
			userId: id,
			expiresAt: new Date(Date.now() + 60 * 1000 * 60 * 24),
			verificationCode: crypto.randomUUID(),
		},
	});
	const { expiresAt, verificationCode } = verification;

	const message = {
		from: env.GMAIL_ADDRESS,
		to: email,
		subject: 'Verify your email address',
		html: dedent`
			<div style="background: #dde6ef; padding: 20px; text-align: center">
				<div style="background: #fff; width: 400px; border-radius: 5px; padding: 20px; margin: 0 auto">
					<h1>Placebook</h1>
					<p>You've enterred <b>${email}</b> as the email address for your account</p>
					<p>Please verify your email to finish signing up for Placebook</p>
					<a
						style="text-decoration: none; color: white; border-radius: 5px; width: fit-content; background:#4c7cf8; display:block; padding: 10px; margin: 0 auto"
						href="${env.NEXTAUTH_URL}/verify/${id}/${verificationCode}/${new Date(
			expiresAt,
		).getTime()}">
						Verify your email
					</a>
					<p>This link will <b>expires in 24 hours</b></p>
					<p>Thank you 💖</p>
				</div>
			</div>
		`,
	};

	transport.sendMail(message, (err, data) => {
		if (err) {
			console.log(err);
			throw new SendEmailError();
		} else {
			console.log('Mail sent');
		}
	});
}

export async function sendForgetPasswordEmail(
	id: string,
	email: string,
	name: string,
	verificationCode: string,
	expiresAt: Date,
) {
	const message = {
		from: env.GMAIL_ADDRESS,
		to: email,
		subject: 'Verify your email address',
		html: dedent`
			<div style="background: #dde6ef; padding: 20px; text-align: center">
				<div style="background: #fff; width: 500px; border-radius: 5px; padding: 20px; margin: 0 auto">
					<h1>Placebook</h1>
					<p>Hello ${name},</p>
					<p style="font-weight: bold;">A request has been received to change the password for your account.</p>
					<p style="font-weight: bold;">To reset your password visit following address:</p>
					<a
						style="text-decoration: none; color: white; border-radius: 5px; width: fit-content; background:#4c7cf8; display:block; padding: 10px; margin: 0 auto"
						href="${
							env.NEXTAUTH_URL
						}/user/reset-password/${id}/${verificationCode}/${new Date(
			expiresAt,
		).getTime()}"
					>
						Reset password
					</a>
					<p>This link will <b>expires in 24 hours</b></p>
					<p>Have a good day 💖</p>
				</div>
			</div>
		`,
	};

	transport.sendMail(message, (err, data) => {
		if (err) {
			console.log(err);
			throw new SendEmailError();
		} else {
			console.log('Mail sent');
		}
	});
}
