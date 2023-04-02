'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
	children: ReactNode;
}

const variants = {
	hidden: { opacity: 0, y: -10, scale: 0.95 },
	enter: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 10, scale: 1.05 },
};

export const PageTransition = ({
	children,
}: PageTransitionProps): JSX.Element => {
	const [overflow, setOverflow] = useState<string | null>(`overflow-hidden`);
	const ref = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	return (
		<div className={cn(overflow ?? '')}>
			<motion.div
				key={pathname}
				initial="hidden"
				animate="enter"
				exit="exit"
				variants={variants}
				transition={{ duration: 0.3, type: `easeInOut` }}
				onAnimationComplete={() => {
					setOverflow(null);
					if (ref.current !== null) {
						ref.current.style.transform = ``;
					}
				}}
				ref={ref}
			>
				{children}
			</motion.div>
		</div>
	);
};
