import Link from 'next/link';
import { Icons } from './ui/icons';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { ChangeEvent } from 'react';
import { cities, City } from './main';
import { cn } from '@/lib/utils';

export const Nav = ({
	onChangeCity,
	city
}: {
	onChangeCity: (city: City) => void;
	city: City
}) => {
	const handleChangeSearchKey = (event: ChangeEvent<HTMLInputElement>) => {
		// setSearchKey(event.target.value);
	};

	const handleChangeCity = (value: string) => {
		onChangeCity(value);
	};

	return (
		<nav
			className={cn(
				'absolute left-0 top-0',
				'flex gap-6',
				'h-16 w-full',
				'px-4',
				'z-10',
				'bg-white',
				'border-b border-slate-200',
			)}
		>
			<Link href="/">
				<h1 className="align-middle text-xl font-semibold leading-[64px] tracking-wide text-blue-500">
					Placebook
				</h1>
			</Link>
			<div className="flex flex-1 items-center">
				<Button
					variant="ghost"
					focusStyle={'none'}
					className="h-full rounded-none"
				>
					<Icons.search size={20} color="#cbd5e1" />
				</Button>
				<Input
					placeholder="Looking for a coffee shop, homestay, pub, bar..."
					className="h-16 border-none"
					value={''}
					onChange={handleChangeSearchKey}
				/>
			</div>
			<div>
				<Select value={city} onValueChange={handleChangeCity}>
					<SelectTrigger className="h-16 w-[180px] border-none focus:ring-0">
						<SelectValue placeholder="Select city" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(cities).map(([key, value]) => (
							<SelectItem key={key} value={key}>
								{value.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</nav>
	);
};
