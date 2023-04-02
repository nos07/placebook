import { Icons } from '@/components/ui/icons';
import Link from 'next/link';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="bg-pattern flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className="absolute top-4 left-4 rounded-lg border border-transparent bg-transparent py-2 px-3 text-center text-sm font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8"
			>
				<span className="flex items-center gap-[1ch]">
					<Icons.home size={20} />
					Home
				</span>
			</Link>
			<div
				className="flex flex-col gap-8"
				style={{ width: 'min(40ch, 100vw - 2rem)' }}
			>
				{children}
			</div>
		</div>
	);
}
