import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prismadb';
import * as response from '@/helpers/api-response';
import HttpStatusCode from '@/helpers/http-status-code';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const queries = [prisma.homestay.findMany(), prisma.bar.findMany()];
	const places = await Promise.all(queries);

	response.success(res, HttpStatusCode.OK, places, '');
}
