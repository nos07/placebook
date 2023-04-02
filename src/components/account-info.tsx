import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from '@prisma/client';
import { Icons } from './ui/icons';

interface AccountInfoProps {
	open: boolean;
	user: User;
}

export const AccountInfo = ({ open, user }: AccountInfoProps): JSX.Element => {
	return (
		<Button
			className={cn(
				'w-full',
				open ? 'justify-start gap-[1ch]' : 'justify-center p-0',
			)}
			variant="ghost"
			focusStyle="none"
		>
			{user?.image ? (
				<Avatar className="h-8 w-8">
					<AvatarImage src={user.image} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			) : (
				<div className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-slate-400 text-white">
					{user ? (
						<span>{user.name.slice(0, 2).toUpperCase()}</span>
					) : (
						<Icons.user size={20} />
					)}
				</div>
			)}
			<AnimatePresence>
				{open && (
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.2 } }}
					>
						{user ? user.name : 'Guest account'}
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);
};
