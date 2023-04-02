import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Slider } from './slider';

type WrapperSliderProps<T> = {
	control: any; // replace "any" with "Control<T>" if you're using a generic type in your form
	name: string;
	min: number;
	max: number;
};

export const WrapperSlider = <T extends FieldValues>({
	control,
	name,
	min,
	max,
}: WrapperSliderProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			defaultValue={[0]}
			render={({ field: { onChange, value, ref, ...props } }) => (
				<Slider
					onValueChange={onChange}
					value={value}
					min={min}
					max={max}
					{...props}
					step={0.1}
				/>
			)}
		/>
	);
};
