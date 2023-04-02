import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Bar, Homestay } from '@prisma/client';

export type Places = (Homestay | Bar)[];

export function usePlaces() {
	const { data, error } = useSWR<{ data: Array<Places> }>(
		'/api/places/get-places',
		fetcher,
	);

	return {
		places: (data?.data.flat() ?? []) as Places,
		isLoading: !error && !data,
		isError: error,
	};
}
