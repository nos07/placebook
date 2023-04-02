'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Icons } from './ui/icons';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { z } from 'zod';
import { REG_EXP } from '@/helpers/regex';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { toast } from './ui/toast';
import { getTimeOfDay } from '@/helpers/date-time';

const FormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().regex(new RegExp(REG_EXP.PASSWORD), {
		message:
			'Password must be a minimum of 8 characters and contains at least one uppercase, lowercase, number, and one special character',
	}),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function UserSigninForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setFocus,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		const { email, password } = data;
		const response = await signIn('credentials', {
			redirect: false,
			email,
			password,
			callbackUrl: '/',
		});
		if (response?.status === 401) {
			toast({
				title: 'Login failed',
				message: 'Sorry, an unexpected error occurred. Please try again',
				type: 'error',
			});
		}
		if (response?.ok) {
			router.push(response?.url as string);
			toast({
				title: `Good ${getTimeOfDay()}`,
				message: 'Hope you have a nice day',
				type: 'success',
			});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div className="grid items-center gap-1.5">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						autoComplete="email"
						placeholder="johndoe@gmail.com"
						{...register('email')}
						disabled={isSubmitting}
					/>
					<p className="h-4 text-end text-xs text-red-600">
						{errors.email?.message ?? ''}
					</p>
				</div>
				<div className="grid items-center gap-1.5">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						autoComplete="current-password"
						placeholder="Khua_a0_xanh"
						{...register('password')}
						disabled={isSubmitting}
					/>
					<p className="h-8 text-end text-xs text-red-600">
						{errors.password?.message ?? ''}
					</p>
				</div>
				<div className="mb-4 text-end text-sm">
					<Link
						href="/user/forgot-password"
						className="cursor-pointer text-blue-500 hover:underline"
					>
						Forgot password
					</Link>
				</div>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="flex gap-[1ch]"
				>
					<Icons.login size={20} /> Sign in
				</Button>
			</form>
			<div className="my-4 flex flex-col gap-y-4">
				<p className="flex h-8 items-center justify-center text-center before:max-w-xs before:flex-1 before:border-b before:border-gray-300 before:content-['']">
					<span className="absolute bg-white px-2">Or</span>
				</p>
				<Button variant={'outline'} className="flex gap-[1ch]">
					<Icons.googleLogo className="h-6 w-6" /> Sign in with Google
				</Button>
				<Button variant={'outline'} className="flex gap-[1ch]">
					<Icons.facebookLogo className="h-6 w-6" /> Sign in with Facebook
				</Button>
			</div>
		</div>
	);
}
