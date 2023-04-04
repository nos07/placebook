import React from 'react';

import { Main } from '@/components/main';
import { Sidebar } from '@/components/sidebar';
import { getCurrentUser } from '@/lib/session';

export default async function Home() {
	const user = await getCurrentUser();

	return (
		<div className="flex">
			<div className="flex-1">
				<main className="relative">
					<Main />
				</main>
			</div>
			<Sidebar user={user} />
		</div>
	);
}
