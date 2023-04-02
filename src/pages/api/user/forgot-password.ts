import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prismadb';
import * as response from '@/helpers/api-response';
import HttpStatusCode from '@/helpers/http-status-code';
import { sendForgetPasswordEmail } from '@/helpers/send-email';
import crypto from 'crypto';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { email } = req.body;
	const user = await prisma.user.findUnique({ where: { email } });
	if (user) {
		const findVerificationByEmail = await prisma.userVerification.findFirst({
			where: {
				user: {
					email,
				},
			},
		});
		if (findVerificationByEmail) {
			await prisma.userVerification.deleteMany({
				where: {
					user: {
						email,
					},
				},
			});
		}
		const verificationCode = crypto.randomUUID();
		const expiresAt = new Date(Date.now() + 60 * 1000 * 60 * 24);
		const newVerification = await prisma.userVerification.create({
			data: {
				// user: { connect: { id: user?.id } },
				userId: user?.id,
				expiresAt,
				verificationCode,
			},
		});
		if (newVerification) {
			await sendForgetPasswordEmail(
				user.id,
				user.email,
				user.name,
				verificationCode,
				expiresAt,
			);
			return response.success(
				res,
				HttpStatusCode.OK,
				null,
				"We've sent you reset password link to your email address.",
			);
		}
	}
	response.error(res, HttpStatusCode.NOT_FOUND, null, 'User is not existed!');
}
