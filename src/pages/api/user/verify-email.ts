import HttpStatusCode from '@/helpers/http-status-code';
import { prisma } from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import * as response from '@/helpers/api-response';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		// TODO: checking if account has been verified
		const { id, verificationCode } = req.query;
		const user = await prisma.userVerification.findUnique({
			where: {
				userId: id as string,
			},
		});

		if (user?.verificationCode === verificationCode) {
			const verifiedUser = await prisma.user.update({
				where: {
					id: id as string,
				},
				data: {
					emailVerified: new Date(),
				},
			});

			if (verifiedUser) {
				await prisma.userVerification.deleteMany({
					where: {
						verificationCode,
					},
				});
			}
		}
		return response.success(
			res,
			HttpStatusCode.OK,
			null,
			'You have successfully verified account',
		);
	}
	response.error(
		res,
		HttpStatusCode.METHOD_NOT_ALLOWED,
		null,
		'Sorry, this API endpoint only allows GET requests.',
	);
}
