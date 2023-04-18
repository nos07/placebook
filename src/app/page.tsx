import React from 'react';

import { Main } from '@/components/main';
import { Sidebar } from '@/components/sidebar';
import { getCurrentUser } from '@/lib/session';

async function getPlaces() {
	// FIXME:
	const res = await fetch('http://localhost:3000/api/places');
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	// Recommendation: handle errors
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function Home() {
	const user = await getCurrentUser();
	const places = await getPlaces();

	return (
		<div className="flex">
			<div className="flex-1">
				<main className="relative">
					<Main places={places.data} />
				</main>
			</div>
			<Sidebar user={user} />
		</div>
	);
}
