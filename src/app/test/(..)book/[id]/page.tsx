import React from 'react';
import { Modal } from '@/components/ui/modal';

export default function BookModal({ params }: any) {
	return (
		<Modal>
			<>Book modal {JSON.stringify(params, null, 2)}</>
		</Modal>
	);
}