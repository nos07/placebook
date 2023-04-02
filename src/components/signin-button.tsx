import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Icons } from './ui/icons';

interface SigninButtonProps {
	open: boolean;
}
export const SigninButton = ({ open }: SigninButtonProps): JSX.Element => {
	const router = useRouter();

	return (
		<Button
			variant="ghost"
			focusStyle="none"
			className={cn(
				'w-full',
				open ? 'justify-start' : 'justify-center',
				'gap-[1ch]',
			)}
			onClick={() => router.push('/signin')}
		>
			<span>
				<Icons.login size={20} color="#4a5564" />
			</span>
			<AnimatePresence>
				{open && (
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.2 } }}
					>
						Sign in
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);
};
