export const fetcher = async <T>(
	...args: Parameters<typeof fetch>
): Promise<T> => {
	const res = await fetch(...args);
	if (res.status >= 400 && res.status <= 499) {
		throw new Error('API Client Error', await res.json());
	}
	return res.json();
};

// @ts-ignore
export async function poster(url: string, { arg }) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...arg }),
	}).then(async (res) => {
		if (res.status >= 400 && res.status <= 499) {
			throw new Error('API Client Error', await res.json());
		}
		return res.json();
	});
}
