import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import { Icons } from './ui/icons';

interface AppInfoProps {
	open: boolean;
}

export const AppInfo = ({ open }: AppInfoProps): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					focusStyle="none"
					className={cn(
						'w-full',
						open ? 'justify-start' : 'justify-center',
						'gap-[1ch]',
					)}
				>
					<span>
						<Icons.info size={20} color="#4a5564" />
					</span>
					<AnimatePresence>
						{open && (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { delay: 0.2 } }}
							>
								What's Placebook?
							</motion.span>
						)}
					</AnimatePresence>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Placebook</DialogTitle>
					<DialogDescription>
						Discover new destinations and create lasting memories with Placebook
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4 text-sm">
					Open source:{' '}
					<a
						className="border-b border-dashed border-gray-500 font-bold"
						target="_blank"
						href="https://github.com/nos-nart/placebook"
					>
						nosnart/placebook{' '}
						<Icons.arrowUpRight className="inline-block" size={25} />
					</a>
				</div>
			</DialogContent>
		</Dialog>
	);
};
