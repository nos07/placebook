import type { NextApiRequest, NextApiResponse } from 'next';
import * as response from '@/helpers/api-response';
import HttpStatusCode from '@/helpers/http-status-code';
import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { id, password } = req.body;
		const hashPassword = await bcrypt.hash(password, SALT_ROUND);

		await prisma.user.update({
			where: { id: id as string },
			data: {
				password: hashPassword,
			},
		});
		await prisma.userVerification.delete({
			where: {
				userId: id,
			},
		});

		return response.success(
			res,
			HttpStatusCode.OK,
			null,
			'Your password has been changed successfully!',
		);
	} catch (error) {
		response.error(
			res,
			HttpStatusCode.INTERNAL_SERVER_ERROR,
			error,
			`Internal server error`,
		);
	}
}
