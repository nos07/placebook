import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, size, ...props }, ref) => {
		return (
			<input
				className={cn(
					'flex',
					'h-10',
					'w-full',
					'rounded-md',
					'border border-slate-300',
					'bg-transparent',
					'px-3 py-2',
					'text-sm',
					'placeholder:text-slate-400',
					// 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
					'focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-0',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
