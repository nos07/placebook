'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {
	initialScale?: number;
	delay?: number;
	duration?: number;
	innerClassName?: string;
	animationKey: string;
}

export const Scale = ({
	children,
	initialScale = 0.95,
	delay = 0,
	duration = 0.6,
	className = ``,
	innerClassName,
	animationKey,
	...props
}: Props) => {
	const variants: Variants = {
		show: (i = 1) => ({
			scale: 1,
			opacity: 1,
			transition: {
				duration,
				delay: i * delay,
			},
		}),
		hidden: {
			opacity: 0,
			scale: initialScale,
		},
	};

	return (
		<motion.div
			key={animationKey}
			variants={variants}
			initial="hidden"
			animate="show"
			className={innerClassName}
			{...props}
		>
			{children}
		</motion.div>
	);
};
