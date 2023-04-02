import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import { sendEmailVerification } from '@/helpers/send-email';
import * as response from '@/helpers/api-response';
import { Prisma } from '@prisma/client';
import HttpStatusCode from '@/helpers/http-status-code';

const SALT_ROUND = 10;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { name, email, password } = req.body;
		const hashPassword = await bcrypt.hash(password, SALT_ROUND);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		await sendEmailVerification(user.name, user.id, user.email);
		response.success(
			res,
			HttpStatusCode.CREATED,
			{ user },
			'A verification link has been sent to your email account',
		);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			if (error.code === 'P2002') {
				response.error(
					res,
					HttpStatusCode.CONFLICT,
					error,
					`${req.body[(error.meta?.target as any)[0]]} has already been taken`,
				);
			}
		}
		throw error;
	}
}
