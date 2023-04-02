import { useLayoutEffect } from 'react';

export function LogEvents() {
	useLayoutEffect(() => {
		console.log('Commit');
	});
	console.log('Render');
	return null;
}
