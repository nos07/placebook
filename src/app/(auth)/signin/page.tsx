import { Icons } from '@/components/ui/icons';
import { UserSigninForm } from '@/components/user-signin-form';
import Link from 'next/link';

export const metadata = {
	title: 'Sign in',
};

export default function Page() {
	return (
		<>
			<div className="py-4 text-center">
				<h2 className="text-2xl font-bold">Welcome back</h2>
				<p className="my-1 text-gray-600">
					Welcome back! Please enter your details
				</p>
			</div>
			<UserSigninForm />
			<div className="text-center">
				Don't have an account?{' '}
				<Link className="text-blue-500 hover:underline" href="/signup">
					Sign up for free
				</Link>
			</div>
		</>
	);
}
