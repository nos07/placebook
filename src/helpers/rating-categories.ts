import { Place } from 'aws-sdk/clients/location';
import { z } from 'zod';

export const placeTypes = {
	homestay: 'Homestay',
	coffee_shop: 'Coffee shop',
	pub: 'Pub',
	bar: 'Bar',
};
export type PlaceTypes = keyof typeof placeTypes;
export const placeTypeOptions = Object.entries(placeTypes).map(
	([value, label]) => ({
		value,
		label,
	}),
);

type RatingField = {
	label: string;
	name: string;
	id: string;
	description: string;
};

type RatingFields = {
	[K in PlaceTypes]: RatingField[];
};

export const ratingFields: RatingFields = {
	coffee_shop: [
		{
			label: 'Quality of coffee',
			name: 'qualityOfCoffee',
			id: 'qualityOfCoffee',
			description:
				'The taste, aroma, and overall quality of the coffee served.',
		},
		{
			label: 'Staff',
			name: 'staff',
			id: 'staff',
			description: 'How welcoming and helpful the staff is.',
		},
		{
			label: 'Ambiance',
			name: 'ambiance',
			id: 'ambiance',
			description:
				'The atmosphere of the coffee shop, including decor, lighting, and music, can be important in determining the overall experience.',
		},
		{
			label: 'Comfort',
			name: 'comfort',
			id: 'comfort',
			description:
				'Are the seats comfortable, and is there enough space for customers to sit and work or socialize?',
		},
		{
			label: 'Cleanliness',
			name: 'cleanliness',
			id: 'cleanliness',
			description:
				'How clean is the coffee shop, including the seating area, bathroom, and service counter?',
		},
		{
			label: 'Service',
			name: 'service',
			id: 'service',
			description:
				'How friendly and efficient are the baristas and other staff?',
		},
		{
			label: 'Price',
			name: 'price',
			id: 'price',
			description:
				'Are the prices reasonable for the quality and variety of offerings?',
		},
		{
			label: 'Location',
			name: 'location',
			id: 'location',
			description:
				'Is the coffee shop in a convenient or interesting location?',
		},
		{
			label: 'Wi-Fi',
			name: 'wifi',
			id: 'wifi',
			description:
				"The speed and reliability of the homestay's internet connection.",
		},
	],
	pub: [
		{
			label: 'Location',
			name: 'location',
			id: 'location',
			description:
				"The accessibility, atmosphere, and surroundings of the pub's location.",
		},
		{
			label: 'Ambiance',
			name: 'ambiance',
			id: 'ambiance',
			description:
				'The overall look, feel, and character of the pub, including lighting, décor, and seating.',
		},
		{
			label: 'Music',
			name: 'music',
			id: 'music',
			description:
				'The quality of the music played, the volume, and the type of music genre played.',
		},
		{
			label: 'Food and drinks',
			name: 'foodAndDrinks',
			id: 'foodAndDrinks',
			description:
				'The quality of the food and drinks served, the variety, and the price range.',
		},
		{
			label: 'Service',
			name: 'service',
			id: 'service',
			description: 'The friendliness, efficiency, and knowledge of the staff.',
		},
		{
			label: 'Cleanliness',
			name: 'cleanliness',
			id: 'cleanliness',
			description:
				'The cleanliness and upkeep of the pub and its amenities, including restrooms.',
		},
		{
			label: 'Value for money',
			name: 'valueForMoney',
			id: 'valueForMoney',
			description:
				'The value for money provided by the pub, including prices and specials.',
		},
		{
			label: 'Crowd',
			name: 'crowd',
			id: 'crowd',
			description:
				'The diversity and quality of the crowd, including age range and vibe.',
		},
		{
			label: 'Activities',
			name: 'activities',
			id: 'activities',
			description:
				'The variety and quality of the activities provided, including games, events, and entertainment.',
		},
		{
			label: 'Safety',
			name: 'safety',
			id: 'safety',
			description:
				'How secure the homestay feels and whether there are any safety concerns in the area.',
		},
	],
	homestay: [
		{
			label: 'Comfort',
			name: 'comfort',
			id: 'comfort',
			description:
				"The level of comfort provided by the homestay's amenities, such as the bed, furniture, and heating/cooling systems",
		},
		{
			label: 'Value for money',
			name: 'valueForMoney',
			id: 'value_for_money',
			description:
				'Whether the homestay is worth the cost compared to other similar accommodations in the area.',
		},
		{
			label: 'Location',
			name: 'location',
			id: 'location',
			description:
				'How accessible is the homestay to public transportation or major landmarks?',
		},
		{
			label: 'Hospitality',
			name: 'hospitality',
			id: 'hospitality',
			description:
				'The level of friendliness and helpfulness provided by the host or staff.',
		},
		{
			label: 'Noise level',
			name: 'noisyLevel',
			id: 'noisy_level',
			description: 'How quiet or noisy the homestay and its surroundings are.',
		},
		{
			label: 'Safety',
			name: 'safety',
			id: 'safety',
			description:
				'How secure the homestay feels and whether there are any safety concerns in the area.',
		},
		{
			label: 'Facilities',
			name: 'facilities',
			id: 'facilities',
			description:
				'The quality and availability of additional facilities such as parking, laundry, or gym.',
		},
		{
			label: 'Cleanliness',
			name: 'cleanliness',
			id: 'cleanliness',
			description:
				'How well-maintained and hygienic the homestay or accommodation is.',
		},
		{
			label: 'Wi-Fi',
			name: 'wifi',
			id: 'wifi',
			description:
				"The speed and reliability of the homestay's internet connection.",
		},
	],
	bar: [
		{
			label: 'Location',
			name: 'location',
			id: 'location',
			description:
				"The accessibility, atmosphere, and surroundings of the bar's location.",
		},
		{
			label: 'Ambiance',
			name: 'ambiance',
			id: 'ambiance',
			description:
				'The overall look, feel, and character of the bar, including lighting, décor, and seating.',
		},
		{
			label: 'Music',
			name: 'music',
			id: 'music',
			description:
				'The quality of the music played, the volume, and the type of music genre played.',
		},
		{
			label: 'Food and drinks',
			name: 'foodAndDrinks',
			id: 'foodAndDrinks',
			description:
				'The quality of the food and drinks served, the variety, and the price range.',
		},
		{
			label: 'Service',
			name: 'service',
			id: 'service',
			description: 'The friendliness, efficiency, and knowledge of the staff.',
		},
		{
			label: 'Cleanliness',
			name: 'cleanliness',
			id: 'cleanliness',
			description:
				'The cleanliness and upkeep of the bar and its amenities, including restrooms.',
		},
		{
			label: 'Value for money',
			name: 'valueForMoney',
			id: 'valueForMoney',
			description:
				'The value for money provided by the bar, including prices and specials.',
		},
		{
			label: 'Crowd',
			name: 'crowd',
			id: 'crowd',
			description:
				'The diversity and quality of the crowd, including age range and vibe.',
		},
		{
			label: 'Activities',
			name: 'activities',
			id: 'activities',
			description:
				'The variety and quality of the activities provided, including games, events, and entertainment.',
		},
		{
			label: 'Safety',
			name: 'safety',
			id: 'safety',
			description:
				'How secure the homestay feels and whether there are any safety concerns in the area.',
		},
	],
};

const ratingSchema = z.array(z.number().min(0).max(10));
export const schemaFields = (type: PlaceTypes) =>
	ratingFields[type].reduce((fields, field) => {
		return {
			...fields,
			[field.name]: ratingSchema,
		};
	}, {});

export const resetRatingFields = (type: PlaceTypes | '' | undefined) => {
	if (type === '' || type === undefined) return;
	const fields: string[] = ratingFields[type].map(({ name }) => name);
	return fields.reduce((acc: { [key: string]: number[] }, field: string) => {
		acc[field] = [0];
		return acc;
	}, {});
};

type ShareFormValue = {
	type: 'pub' | 'homestay' | 'coffee_shop' | 'bar';
	[key: string]: unknown; // Index signature for dynamic properties
};

export const ShareFormSchema = z.object({
	type: z.enum(['pub', 'homestay', 'coffee_shop', 'bar', '']),
	comment: z.string().min(1, { message: "Can't be empty" }),
	// Ratings schema will be determined dynamically based on the value of 'type'
	ratings: z
		.custom<ShareFormValue>((value: TypeUtil.FixTypeLater) => {
			switch (value.type) {
				case 'pub':
					return z.object(schemaFields('pub')).safeParse(value);
				case 'homestay':
					return z.object(schemaFields('homestay')).safeParse(value);
				case 'coffee_shop':
					return z.object(schemaFields('coffee_shop')).safeParse(value);
				case 'bar':
					return z.object(schemaFields('bar')).safeParse(value);
				default:
					return { success: false };
			}
		})
		.optional(),
});

export type ShareFormSchemaType = z.infer<typeof ShareFormSchema>;
