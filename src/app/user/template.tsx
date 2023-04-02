'use client';

import Animated from '@/components/animations';
import { AnimatePresence } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
			<Animated.PageTransition>{children}</Animated.PageTransition>
		</AnimatePresence>
	);
}
