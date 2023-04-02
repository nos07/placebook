import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Icons } from './ui/icons';
import { toast } from './ui/toast';

interface SigninButtonProps {
	open: boolean;
}

export const SignoutButton = ({ open }: SigninButtonProps): JSX.Element => {
	const onSignOut = () => {
		signOut();
		toast({
			title: 'Sign out',
			message: 'You have been signed out!',
			type: 'success',
		});
	};

	return (
		<Button
			variant="ghost"
			focusStyle="none"
			className={cn(
				'w-full',
				open ? 'justify-start' : 'justify-center',
				'gap-[1ch]',
			)}
			onClick={onSignOut}
		>
			<span>
				<Icons.logout size={20} color="#4a5564" />
			</span>
			<AnimatePresence>
				{open && (
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.2 } }}
					>
						Sign out
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);
};
