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
		// TODO:
		'/api/user/verify-account',
		poster,
	);
	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		trigger(data, {
			onSuccess(data, key, config) {
				console.log(data);
				// toast({
				//   title: `Welcome ${data.data.user.name} 🎊`,
				//   message: data.message,
				//   type: 'success',
				// });
			},
			onError(err, key, config) {
				console.log(err);
				// toast({
				//   title: 'Something went wrong.',
				//   message: err.message,
				//   type: 'error',
				// });
			},
		});
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col items-center gap-6">
				<div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100">
					<Icons.user size={30} color="#3b82f6" />
				</div>
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Verify your account</h1>
					<span className="text-sm text-gray-600">
						No worries, we'll send you verification link to your email address.
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
					Verify by email
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
