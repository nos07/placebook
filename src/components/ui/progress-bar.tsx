import { motion, useSpring, MotionValue } from 'framer-motion';

export const ProgressBar = ({
	value,
}: {
	value: MotionValue<number>;
}): JSX.Element => {
	const width = useSpring(value, { damping: 20 });
	return (
		<motion.div className="flex h-6 w-full flex-row items-start justify-start">
			<motion.div
				className="h-full w-full bg-blue-500"
				style={{ scaleX: width, originX: 0 }}
				transition={{ ease: 'easeIn' }}
			/>
		</motion.div>
	);
};
