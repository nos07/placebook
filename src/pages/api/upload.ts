import { env } from '@/config/env';
import HttpStatusCode from '@/helpers/http-status-code';
import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '4mb',
		},
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const s3 = new S3({
		signatureVersion: 'v4',
		region: env.AWS_REGION,
		accessKeyId: env.AWS_ACCESS_KEY,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	});

	const preSignedUrl = await s3.getSignedUrlPromise('putObject', {
		Bucket: env.AWS_BUCKET_NAME,
		Key: req.query.file,
		ContentType: req.query.fileType,
		Expires: 604800, // 7 days in seconds
	});

	res.status(HttpStatusCode.OK).json({ url: preSignedUrl });
}
