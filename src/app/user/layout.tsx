import { Icons } from '@/components/ui/icons';
import Link from 'next/link';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="bg-pattern flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className="absolute left-4 top-4 rounded-lg border border-transparent bg-transparent px-3 py-2 text-center text-sm font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:left-8 md:top-8"
			>
				<span className="flex items-center gap-[1ch]">
					<Icons.home size={20} />
					Home
				</span>
			</Link>
			<div style={{ width: 'min(40ch, 100vw - 2rem)' }}>{children}</div>
		</div>
	);
}
