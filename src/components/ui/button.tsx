import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	[
		'inline-flex items-center justify-center',
		'rounded-md',
		'text-sm',
		'font-medium',
		'transition-colors',
		'dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:focus:ring-offset-slate-900',
		'data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
		'disabled:opacity-50 disabled:pointer-events-none',
	].join(' '),
	{
		variants: {
			variant: {
				default:
					'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900',
				destructive:
					'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
				outline:
					'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
				subtle:
					'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
				ghost:
					'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
				link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
			},
			size: {
				default: 'h-10 py-2 px-3',
				sm: 'h-9 px-2 rounded-md',
				lg: 'h-11 px-8 rounded-md',
			},
			focusStyle: {
				default:
					'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
				none: 'focus:ring-0 border-none',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			focusStyle: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, focusStyle, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, focusStyle, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
