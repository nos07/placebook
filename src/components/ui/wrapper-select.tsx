import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Select, SelectProps } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectLabel } from './select';

type RadixSelectOption = {
	label: string;
	value: string;
};

type RadixSelectProps = SelectProps & {
	options: RadixSelectOption[];
};

type WrapperSelectProps = RadixSelectProps & {
	control: any;
	name: string;
	selectTrigger: React.ReactNode;
};

export const WrapperSelect = ({
	control,
	name,
	options,
	selectTrigger,
}: WrapperSelectProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => (
				<Select
					value={
						options.find((option) => option.value === value)?.value ?? undefined
					}
					onValueChange={(value: string) => {
						onChange(value);
					}}
				>
					{selectTrigger}
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	);
};
