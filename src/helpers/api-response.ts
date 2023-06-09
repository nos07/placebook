import { NextApiResponse } from 'next';

type ApiResponse<T> =
	| { ok: true; data: T; error: null; status: number; message: string }
	| { ok: false; data: null; error: unknown; status: number; message: string };

export const success = <T>(
	res: NextApiResponse<ApiResponse<T>>,
	statusCode: number,
	data: T,
	message?: string,
) => {
	res.status(statusCode).json({
		ok: true,
		status: statusCode,
		message: message ?? '',
		data,
		error: null,
	});
};

export const error = <T>(
	res: NextApiResponse<ApiResponse<T>>,
	statusCode: number,
	error: unknown,
	message?: string,
) => {
	res.status(statusCode).json({
		ok: false,
		status: statusCode,
		message: message ?? '',
		data: null,
		error,
	});
};

export const handleApiResponse = (response: Response): Promise<any> => {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response.json());
	} else {
		return Promise.reject(new Error(`API call failed with status ${response.status}`));
	}
}