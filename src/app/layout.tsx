import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import { cn, absoluteUrl } from '@/lib/utils';
import { Toaster } from '@/components/ui/toast';
import AnalyticsWrapper from '@/components/analytics';
import { siteConfig } from '@/config/site';
import { AlertDialogProvider } from '@/components/ui/alert-dialog-provider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata = {
	title: {
		default: 'Placebook',
		template: '%s | Placebook',
	},
	description: siteConfig.description,
	// Next.js is now putting this viewport meta tag in automatically
	// viewport: "width=device-width, initial-scale=1",
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: absoluteUrl('/og.jpg'),
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en">
			<head />
			<body
				className={cn(
					'min-h-screen bg-white font-sans text-slate-900 antialiased',
					inter.variable,
				)}
			>
				<AlertDialogProvider>
					{children}
				</AlertDialogProvider>
				<Toaster position="bottom-right" />
				{/* <AnalyticsWrapper /> */}
			</body>
		</html>
	);
}
