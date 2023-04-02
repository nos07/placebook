'use client';

import { motion, useCycle } from 'framer-motion';
import { AppInfo } from './app-info';
import { cn } from '@/lib/utils';
import { SigninButton } from './signin-button';
import { ExpandSidebar } from './expand-sidebar';
import { AccountInfo } from './account-info';
import React from 'react';
import { SignoutButton } from './signout-button';
import { User } from '@prisma/client';

interface SidebarProps {
	user: User;
}

export const Sidebar = ({ user }: SidebarProps): JSX.Element => {
	const [open, cycleOpen] = useCycle(false, true);

	return (
		<div className="relative z-20 w-[72px] bg-white">
			<motion.div
				className={cn(
					'border-l border-gray-200',
					'h-screen',
					'px-3 py-6',
					'bg-white',
					'flex flex-col items-center justify-between bg-white',
					'absolute right-0',
				)}
				// HACK: this help avoid flickering when expand sidebar
				initial={{ overflow: 'hidden' }}
				animate={{
					width: open ? 240 : 72,
				}}
			>
				<div className="flex w-full flex-1 flex-col gap-3">
					<AccountInfo open={open} user={user} />
					{user ? <SignoutButton open={open} /> : <SigninButton open={open} />}
					<AppInfo open={open} />
				</div>
				<ExpandSidebar open={open} cycleOpen={cycleOpen} />
			</motion.div>
		</div>
	);
};
