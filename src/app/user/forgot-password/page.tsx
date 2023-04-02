'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWRMutation from 'swr/mutation';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { poster } from '@/lib/fetcher';

const FormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Page() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
	});

	const { trigger, isMutating } = useSWRMutation(
		'/api/user/forgot-password',
		poster,
	);
	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		trigger(data, {
			onSuccess(data, key, config) {
				toast({
					title: `Check your email address 🎊`,
					message: data.message,
					type: 'success',
				});
			},
			onError(err, key, config) {
				toast({
					title: 'Something went wrong.',
					message: err.message,
					type: 'error',
				});
			},
		});
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col items-center gap-6">
				<div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100">
					<Icons.key size={25} color="#3b82f6" />
				</div>
				<div>
					<h1 className="text-center text-2xl font-semibold">
						Forgot Password?
					</h1>
					<span className="text-sm text-gray-600">
						No worries, we'll send you reset instructions.
					</span>
				</div>
			</div>
			<form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						{...register('email')}
						placeholder="Enter your email"
					/>
					<p className="h-4 text-end text-xs text-red-600">
						{errors.email?.message ?? ''}
					</p>
				</div>
				<Button type="submit" variant={'default'} className="w-full">
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
}
