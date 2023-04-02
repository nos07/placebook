import { sendEmailVerification } from '@/helpers/send-email';
import { prisma } from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import * as response from '@/helpers/api-response';
import HttpStatusCode from '@/helpers/http-status-code';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		const { id } = req.query;

		const user = await prisma.user.findUnique({
			where: {
				id: id as string,
			},
		});

		if (user) {
			sendEmailVerification(user.name, user.id, user.email);
			return response.success(
				res,
				HttpStatusCode.OK,
				null,
				'Verification email has been send.',
			);
		}
		return response.error(
			res,
			HttpStatusCode.NOT_FOUND,
			null,
			'Failed to send verification mail.',
		);
	}
	response.error(
		res,
		HttpStatusCode.METHOD_NOT_ALLOWED,
		null,
		'Sorry, this API endpoint only allows GET requests.',
	);
}
