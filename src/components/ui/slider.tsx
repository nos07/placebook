// @ts-nocheck
'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn, switchcase } from '@/lib/utils';

// interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
//	If don't want to change range color we pass a new prop here
// }

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, ...props }, ref) => {
	const rangeColor = (value: number) => {
		return {
			[value >= 9]: 'bg-green-500',
			[value <= 3]: 'bg-red-500',
			[value > 3 && value < 9]: 'bg-amber-400',
		}[true];
	};

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				'relative flex w-full touch-none select-none items-center',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
				<SliderPrimitive.Range
					className={cn('absolute h-full', rangeColor(value![0]))}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-100 dark:bg-slate-400 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900" />
		</SliderPrimitive.Root>
	);
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
