'use client';

import { cn } from '@/lib/utils';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {
	text: string;
	delay?: number;
	duration?: number;
	classNames?: string[];
}

export const Letter = ({
	text,
	delay = 0,
	duration = 0.05,
	classNames = [],
	...props
}: Props): JSX.Element => {
	const letters = Array.from(text);

	const container: Variants = {
		hidden: {
			opacity: 0,
		},
		show: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: duration, delayChildren: i * delay },
		}),
	};

	const child: Variants = {
		show: {
			y: 0,
			opacity: 1,
			transition: {
				type: `spring`,
				damping: 15,
			},
		},
		hidden: {
			y: `100%`,
			opacity: 0,
		},
	};

	return (
		<motion.div
			className={cn('inline-flex flex-wrap overflow-clip', ...classNames)}
			variants={container}
			initial="hidden"
			animate="show"
			{...props}
		>
			{letters.map((letter, index) => (
				<motion.span key={index} variants={child}>
					{letter === ` ` ? `\u00A0` : letter}
				</motion.span>
			))}
		</motion.div>
	);
};
