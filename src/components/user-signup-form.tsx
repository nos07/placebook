'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { REG_EXP } from '@/helpers/regex';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from './ui/toast';
import { handleApiResponse } from '@/helpers/api-response';

const SignUpSchema = z
	.object({
		name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().regex(new RegExp(REG_EXP.PASSWORD), {
			message:
				'Password must be a minimum of 8 characters and contains at least one uppercase, lowercase, number, and one special character',
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
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export function UserSignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpSchemaType>({
		resolver: zodResolver(SignUpSchema),
	});

	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	async function handleRegister(data: SignUpSchemaType) {
		try {
			setIsFetching(true);
			// Mutate external data source
			const response = await fetch(`/api/signup`, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			const responseData = await handleApiResponse(response);
			toast({
				title: `Welcome ${responseData.data.name} 🎊`,
				message: responseData.message,
				type: 'success',
			});
			setIsFetching(false);
	
			startTransition(() => {
				// Refresh the current route and fetch new data from the server without
				// losing client-side browser or React state.
				router.refresh();
			});
		} catch(error) {
			console.error('An error occurred during API call', error);
		}
	}

	const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => handleRegister(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid items-center gap-1.5">
				<Label htmlFor="username" className="text-sm">
					User name
				</Label>
				<Input
					id="username"
					autoComplete="username"
					{...register('name')}
					disabled={isPending}
				/>
				<p className="h-4 text-end text-xs text-red-600">
					{errors.name?.message ?? ''}
				</p>
			</div>
			<div className="grid items-center gap-1.5">
				<Label htmlFor="email" className="text-sm">
					Email
				</Label>
				<Input
					id="email"
					autoComplete="email"
					{...register('email')}
					disabled={isPending}
				/>
				<p className="h-4 text-end text-xs text-red-600">
					{errors.email?.message ?? ''}
				</p>
			</div>
			<div className="grid items-center gap-1.5">
				<Label htmlFor="password" className="text-sm">
					Password
				</Label>
				<Input
					id="password"
					type="password"
					autoComplete="new-password"
					{...register('password')}
					disabled={isPending}
				/>
				<span className="h-4" />
			</div>
			<div className="grid items-center gap-1.5">
				<Label htmlFor="confirm_password" className="text-sm">
					Confirm Password
				</Label>
				<Input
					id="confirm_password"
					type="password"
					autoComplete="new-password"
					{...register('confirmPassword')}
					disabled={isPending}
				/>
				<p className="h-8 text-end text-xs text-red-600">
					{((errors) => {
						const { confirmPassword, password } = errors;
						if (confirmPassword?.type === 'custom') {
							return confirmPassword.message;
						}
						return password?.message || confirmPassword?.message;
					})(errors)}
				</p>
			</div>
			<Button
				className={cn(
					'mt-4 flex w-full gap-[1ch]',
					isFetching ? 'bg-gray-500' : '',
				)}
				type="submit"
				disabled={isPending}
			>
				<Icons.unlock size={20} /> Sign up
			</Button>
		</form>
	);
}
