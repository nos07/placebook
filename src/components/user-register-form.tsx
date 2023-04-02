'use client';

// import { useReducer } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { REG_EXP } from '@/helpers/regex';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from './ui/toast';
import useSWRMutation from 'swr/mutation';
import { poster } from '@/lib/fetcher';

const FormSchema = z
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
type FormSchemaType = z.infer<typeof FormSchema>;

export function UserRegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
	});

	const { trigger, isMutating } = useSWRMutation('/api/auth/signup', poster);
	const onSubmit: SubmitHandler<FormSchemaType> = (data) =>
		trigger(data, {
			onSuccess(data, key, config) {
				toast({
					title: `Welcome ${data.data.user.name} 🎊`,
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
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
					isMutating ? 'bg-gray-500' : '',
				)}
				type="submit"
				disabled={isSubmitting}
			>
				<Icons.unlock size={20} /> Sign up
			</Button>
		</form>
	);
}
