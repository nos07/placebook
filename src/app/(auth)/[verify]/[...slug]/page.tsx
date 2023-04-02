'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '@/components/ui/toast';
import { fetcher } from '@/lib/fetcher';
import useSWRMutation from 'swr/mutation';
import { isExpired24Hours } from '@/helpers/date-time';

export default function Page() {
	const pathname = usePathname();
	const router = useRouter();
	const {
		length,
		3: verificationCode,
		2: id,
		[length - 1]: expiresAt,
	} = pathname!.split('/');
	const isExpired = isExpired24Hours(Number(expiresAt));
	const { data, trigger, error } = useSWRMutation(
		`/api/user/verify-email?id=${id}&verificationCode=${verificationCode}`,
		fetcher as any,
	);

	if (data?.ok) {
		toast({
			title: 'Your account has been verified',
			message: 'Thanks for verifying your account',
			type: 'success',
		});
		router.push('/signin');
	}

	if (error) {
		toast({
			title: 'Some thing went wrong',
			message: "Your verification couldn't be completed",
			type: 'error',
		});
	}

	useEffect(() => {
		// keep track of Next 13 router query
		// https://github.com/vercel/next.js/pull/45919
		if (!isExpired) {
			trigger();
		}
	}, []);

	return (
		<>
			{/* TODO: put an illustration here */}
			<p className="text-center text-xl">
				{isExpired ? 'Link has been expired' : 'Verifying email...'}
			</p>
		</>
	);
}
