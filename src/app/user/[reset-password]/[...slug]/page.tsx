'use client';

import { usePathname, useRouter } from 'next/navigation';
import { toast } from '@/components/ui/toast';
import { poster } from '@/lib/fetcher';
import useSWRMutation from 'swr/mutation';
import { isExpired24Hours } from '@/helpers/date-time';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import { z } from 'zod';
import { REG_EXP } from '@/helpers/regex';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z
	.object({
		password: z.string().regex(new RegExp(REG_EXP.PASSWORD), {
			message: 'Invalid password!',
		}),
		confirmPassword: z.string(),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				path: ['confirmPassword'],
				code: 'custom',
				message: 'Passwords do not match. Please try again',
			});
		}
	});
type FormSchemaType = z.infer<typeof FormSchema>;

export default function Page() {
	const pathname = usePathname();
	const router = useRouter();
	const { length, 3: id, [length - 1]: expiresAt } = pathname!.split('/');
	const isExpired = isExpired24Hours(Number(expiresAt));

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
	});

	const { trigger, isMutating } = useSWRMutation(
		`/api/user/reset-password`,
		poster,
	);
	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		const { password } = data;
		trigger(
			{ password, id },
			{
				onSuccess(data, key, config) {
					toast({
						title: `Password changed 🎊`,
						message: data.message,
						type: 'success',
					});
					router.push('/signin');
				},
				onError(err, key, config) {
					toast({
						title: 'Oops!',
						message: err.message,
						type: 'error',
					});
				},
			},
		);
	};

	return (
		<>
			{/* TODO: put an illustration here */}
			{(() => {
				if (isExpired) {
					return (
						<p className="text-center text-xl">Link has been expired ⌛</p>
					);
				}

				return (
					<div
						className="flex flex-col gap-10"
						style={{ width: 'min(40ch, 100vw - 2rem)' }}
					>
						<div className="flex flex-col items-center gap-6">
							<div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100">
								<Icons.key size={25} color="#3b82f6" />
							</div>
							<div>
								<h1 className="text-center text-2xl font-semibold">
									Choose new password
								</h1>
								<span className="text-sm text-gray-600">
									Almose done. Enter your new password and you're all set.
								</span>
							</div>
						</div>
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="password">New password</Label>
								<Input
									type="password"
									id="password"
									autoComplete="new-password"
									{...register('password')}
									disabled={isSubmitting}
								/>
								<p className="h-4 text-end text-xs text-red-600">
									{errors.password?.message ?? ''}
								</p>
							</div>
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="confirmPassword">Confirm password</Label>
								<Input
									type="password"
									id="confirmPassword"
									autoComplete="new-password"
									{...register('confirmPassword')}
								/>
								<p className="h-4 text-end text-xs text-red-600">
									{errors.confirmPassword?.message ?? ''}
								</p>
							</div>
							<div className="my-4 grid grid-cols-2 justify-between gap-y-2 text-sm">
								{[
									'one lowercase character',
									'one special character',
									'one uppercase character',
									'8 characters minimum',
									'one number',
								].map((i, index) => (
									<span
										key={index}
										className="flex items-center gap-[1ch] text-green-500"
									>
										<Icons.checkCircle size={17} /> {i}
									</span>
								))}
							</div>
							<Button variant={'default'} className="w-full">
								Reset password
							</Button>
						</form>
						<Link href="/signin">
							<span className="flex items-center justify-center gap-[1ch]">
								<Icons.arrowLeft size={20} /> Back to sign in
							</span>
						</Link>
					</div>
				);
			})()}
		</>
	);
}
