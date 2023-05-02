import Link from 'next/link';
import { UserSignUpForm } from '@/components/user-signup-form';

export const metadata = {
	title: 'Sign up',
};

export default function Page() {
	return (
		<div className="flex flex-col gap-10">
			<div className="text-center">
				<h2 className="my-2 text-2xl font-semibold">Create an account</h2>
				<p className="text-sm">Enter the fields below to get started</p>
			</div>
			<UserSignUpForm />
			<div className="text-center">
				Already have an account?{' '}
				<Link className="text-blue-500 hover:underline" href="/auth/signin">
					Sign in
				</Link>
			</div>
		</div>
	);
}
