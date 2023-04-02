import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Cycle } from 'framer-motion';
import { Button } from './ui/button';
import { Icons } from './ui/icons';

interface ExpandSidebarProps {
	open: boolean;
	cycleOpen: Cycle;
}
export const ExpandSidebar = ({
	cycleOpen,
	open,
}: ExpandSidebarProps): JSX.Element => (
	<Button
		className={cn('w-full', open ? 'justify-start' : 'justify-center')}
		variant="ghost"
		focusStyle="none"
		onClick={() => cycleOpen()}
	>
		<span className="flex items-center gap-[1ch]">
			<AnimatePresence>
				{open ? (
					<motion.span className="flex items-center gap-[1ch]" key="close">
						<Icons.sidebarOpen size={20} color="#4a5564" /> Collapse
					</motion.span>
				) : (
					<motion.span key="open">
						<Icons.sidebarClose size={20} color="#4a5564" />
					</motion.span>
				)}
			</AnimatePresence>
		</span>
	</Button>
);
