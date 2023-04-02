'use client';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from './ui/icons';
import { SelectTrigger, SelectValue } from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Emoji } from './ui/emoji';
import { useForm, SubmitHandler, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
	placeTypeOptions,
	placeTypes,
	PlaceTypes,
	ratingFields,
	resetRatingFields,
	ShareFormSchema,
	ShareFormSchemaType,
} from '@/helpers/rating-categories';
import Animated from './animations';
import { toast } from './ui/toast';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { WrapperSlider } from './ui/wrapper-slider';
import { Textarea } from './ui/textarea';
import { WrapperSelect } from './ui/wrapper-select';
import { get } from '@/lib/utils';

export function Reviewing() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-full gap-[1ch] rounded-none text-slate-600"
					focusStyle={'none'}
				>
					<Icons.send size={20} /> Share my favorites
				</Button>
			</SheetTrigger>
			<SheetContent position="right" size="default" className="overflow-scroll">
				<SheetHeader>
					<SheetTitle>Share my favorites</SheetTitle>
					<SheetDescription>
						Share your experience with other users by adding your review. Tell
						us what you liked and disliked, and help others make an informed
						decision when choosing a place to stay, grab a coffee, or enjoy a
						night out <Emoji symbol="🏡" />
					</SheetDescription>
				</SheetHeader>
				<ReviewRatings />
			</SheetContent>
		</Sheet>
	);
}

const ReviewRatings = () => {
	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ShareFormSchemaType>({
		resolver: zodResolver(ShareFormSchema),
	});
	const fieldValues = watch();
	const placeType = watch('type');

	useEffect(() => {
		// Reset ratings whenever the type field is changed
		reset({
			type: placeType,
			comment: '',
			ratings: resetRatingFields(placeType),
		});
	}, [placeType, reset]);

	const onSubmit: SubmitHandler<ShareFormSchemaType> = (data) => {
		console.log(data);
	};

	return (
		<form className="my-4 grid gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex gap-4">
				<WrapperSelect
					control={control}
					name="type"
					selectTrigger={
						<SelectTrigger className="w-[200px] focus:ring-0">
							<SelectValue placeholder="Choose a place type" />
						</SelectTrigger>
					}
					options={placeTypeOptions}
				/>
				<div>select place</div>
			</div>
			<div className="flex flex-col gap-y-2">
				<p className="text-lg font-semibold">📷 Add photos</p>
				<UploadPhoto />
			</div>
			<div className="flex flex-col gap-y-2">
				<span className="text-lg font-semibold">📝 Reviews</span>
				<Textarea
					{...register('comment')}
					placeholder={`What did you think of your experience at this place? Share your thoughts here.`}
				/>
			</div>
			<div className="flex flex-col gap-y-2">
				<div className="flex items-center gap-[1ch]">
					<span className="text-lg font-semibold">✨ Rating</span>
					{placeType && <RatingInfo type={placeType} />}
				</div>
				{placeType ? (
					<Animated.Scale
						key={placeType}
						initialScale={1.05}
						duration={0.3}
						animationKey={placeType}
					>
						<div className="grid grid-cols-1 gap-x-3 gap-y-5 xl:grid-cols-2 2xl:grid-cols-3">
							{ratingFields[placeType].map(({ label, name, id }) => (
								<RatingSlider
									key={id}
									label={label}
									name={`ratings.${name}`}
									control={control}
									fieldValues={fieldValues}
								/>
							))}
						</div>
					</Animated.Scale>
				) : (
					<p className="my-12 text-center text-slate-600">
						Please select the place type
					</p>
				)}
			</div>
			<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
				<Button type="submit" className="flex gap-[1ch]">
					<Icons.send size={20} /> Share
				</Button>
			</div>
		</form>
	);
};

interface RatingSliderProps {
	label: string;
	// name: keyof (typeof ShareFormSchema)['shape'];
	name: any;
	control: Control<ShareFormSchemaType>;
	fieldValues: any;
}

function RatingSlider({
	label,
	control,
	name,
	fieldValues,
}: RatingSliderProps): JSX.Element {
	return (
		<div className="flex flex-col gap-y-3">
			<div className="flex items-center justify-between gap-[1ch]">
				<Label className="text-sm">{label}</Label>
				<span className="text-sm font-bold">{get(fieldValues, name)}</span>
			</div>
			<WrapperSlider
				aria-label="Select a value between 0 and 10"
				control={control}
				name={name}
				min={0}
				max={10}
			/>
		</div>
	);
}

export const UploadPhoto = () => {
	const [photos, setPhotos] = useState<Array<string>>([]);

	const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList: FileList | null = e.target.files;
		if (fileList) {
			const files = Array.from(fileList);
			let s3FileUrl = '';
			for (const file of files) {
				try {
					const filename = encodeURIComponent(file.name);
					const fileType = encodeURIComponent(file.type);
					const res = await fetch(
						`/api/upload?file=${filename}&fileType=${fileType}`,
					);
					const { url } = await res.json();
					const upload = await fetch(url, {
						method: 'PUT',
						body: file,
						headers: { 'Content-Type': fileType },
					});
					if (upload.ok) {
						toast({
							title: 'Uploaded successfully!',
							message: 'Photo was uploaded',
							type: 'success',
						});
						s3FileUrl = `https://placebookk.s3.ap-southeast-1.amazonaws.com/${filename}`;
						setPhotos((prev) => [...prev, s3FileUrl]);
					} else {
						toast({
							title: 'Upload failed.',
							message: 'Could you please try again?',
							type: 'error',
						});
					}
				} catch (error) {
					console.error(`Failed to upload file`);
				}
			}
		}
	};

	return (
		<div className="flex flex-wrap gap-2">
			{photos.map((photo, index) => (
				<div key={index} className="h-24 w-24">
					<AspectRatio ratio={1 / 1}>
						<Image
							src={photo}
							alt="Uploaded photo"
							fill
							className="rounded object-cover"
						/>
					</AspectRatio>
				</div>
			))}
			<label
				id="files"
				className="grid h-24 w-24 cursor-pointer place-items-center rounded border border-dashed border-slate-500 bg-slate-100 hover:border-blue-500"
			>
				<Icons.imagePlus size={20} color="#4a5564" />
				<Input
					onChange={uploadPhoto}
					name="files"
					type="file"
					multiple
					accept="image/png, image/jpeg"
					className="hidden"
				/>
			</label>
		</div>
	);
};

function RatingInfo({ type }: { type: PlaceTypes }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Icons.info size={15} color="#4a5564" className="cursor-help" />
			</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>Rating categories for {placeTypes[type]}</DialogTitle>
					<DialogDescription>
						Using these criteria, you can score your homestay experience and
						provide the feedback.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-2">
					{ratingFields[type].map(({ id, label, description }, index) => (
						<p className="text-sm" key={id}>
							{index + 1}. <b>{label}</b>: {description}{' '}
						</p>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
