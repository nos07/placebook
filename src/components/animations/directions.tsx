'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useRef, useState } from 'react';

interface Props extends HTMLMotionProps<'div'> {
	from:
		| 'left'
		| 'top'
		| 'right'
		| 'bottom'
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right';
	delay?: number;
	duration?: number;
	innerClassName?: string;
	animationKey: string;
}

export const Directions = ({
	children,
	from,
	delay = 0,
	duration = 0.6,
	className = ``,
	innerClassName,
	animationKey,
	...props
}: Props) => {
	const [overflow, setOverflow] = useState<string | null>(`overflow-hidden`);
	const ref = useRef<HTMLDivElement>(null);

	const variants: Variants = {
		show: (i = 1) => ({
			y: 0,
			x: 0,
			transition: {
				duration,
				delay: i * delay,
			},
		}),
		hidden: {
			...(from.includes(`top`) && { y: `-100%` }),
			...(from.includes(`bottom`) && { y: `100%` }),
			...(from.includes(`left`) && { x: `-100%` }),
			...(from.includes(`right`) && { x: `100%` }),
		},
	};

	return (
		<div className={cn(overflow ?? '', className)}>
			<motion.div
				key={animationKey}
				variants={variants}
				initial="hidden"
				animate="show"
				onAnimationComplete={() => {
					setOverflow(null);
					if (ref.current !== null) {
						ref.current.style.transform = ``;
					}
				}}
				className={innerClassName}
				ref={ref}
				{...props}
			>
				{children}
			</motion.div>
		</div>
	);
};
