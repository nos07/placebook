import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const homestays = [
	{
		type: 'homestay',
		name: 'Nhà của Nhi',
		address: 'Toà D, Westbay Ecopark, Văn Giang, Hưng Yên, Vietnam',
		city: 'hung_yen',
		latitude: 20.94802766824949,
		longitude: 105.93435931123908,
		coverImage:
			'https://placebookk.s3.ap-southeast-1.amazonaws.com/nha-cua-nhi-wb-ecopark-c0218701.jpg',
		facebookLink: 'https://www.facebook.com/profile.php?id=100067885488390',
		instagramLink: '',
		contact: '091 484 29 77',
		description: 'Homestay Ecopark Nhà của Nhi',
		propertyType: 'APARTMENT',
		verified: true,
		pricing: {
			create: {
				weekday: 120,
				weekend: 150,
				month: 3000,
			},
		},
		facilities: {
			create: {
				numOfBedroom: 2,
				numOfBathroom: 1,
				kitchen: {
					create: {
						inductionCooker: true,
						gasStove: false,
						refrigerator: true,
						microwave: true,
					},
				},
			},
		},
		utilities: {
			create: {
				wifi: true,
				airCondition: true,
				tivi: true,
				elevator: true,
				toothpaste: true,
				bathSoap: true,
				tissue: true,
				bathTowel: true,
				shampoo: true,
				mineralWater: true,
				washingMachine: true,
			},
		},
		homeRules: {
			create: {
				checkInTime: '3:00 PM',
				checkOutTime: '11:00 AM',
				smoking: false,
				pets: false,
				party: false,
				payments: 'Credit Card',
			},
		},
	},
	{
		type: 'homestay',
		name: 'The Bloom Hà Nội',
		address: '36 Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
		city: 'ha_noi',
		latitude: 21.033036908467047,
		longitude: 105.78721704030565,
		coverImage:
			'https://placebookk.s3.ap-southeast-1.amazonaws.com/the-bloom-hanoi.jpg',
		facebookLink: '',
		instagramLink: '',
		contact: '0774 599 988',
		description:
			'Tọa lạc tại thành phố Hà Nội, The Bloom Hanoi cung cấp chỗ nghỉ với WiFi miễn phí và chỗ đỗ xe riêng miễn phí cũng như phòng tập thể dục.',
		propertyType: 'APARTMENT',
		verified: true,
		pricing: {
			create: {
				weekday: 120,
				weekend: 150,
				month: 3000,
			},
		},
		facilities: {
			create: {
				numOfBedroom: 2,
				numOfBathroom: 1,
				kitchen: {
					create: {
						inductionCooker: true,
						gasStove: false,
						refrigerator: true,
						microwave: true,
					},
				},
			},
		},
		utilities: {
			create: {
				wifi: true,
				airCondition: true,
				tivi: true,
				elevator: true,
				toothpaste: true,
				bathSoap: true,
				tissue: true,
				bathTowel: true,
				shampoo: true,
				mineralWater: true,
				washingMachine: true,
			},
		},
		homeRules: {
			create: {
				checkInTime: '3:00 PM',
				checkOutTime: '11:00 AM',
				smoking: false,
				pets: false,
				party: false,
				payments: 'Credit Card',
			},
		},
	},
	{
		type: 'homestay',
		name: 'Little Tree House',
		address: '94e P. Bùi Thị Xuân, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội',
		city: 'ha_noi',
		latitude: 21.015561469510384,
		longitude: 105.8497918846544,
		coverImage:
			'https://placebookk.s3.ap-southeast-1.amazonaws.com/little-tree-house.jpg',
		facebookLink: '',
		instagramLink: '',
		contact: '0868 393 786',
		description:
			'LITTLE TREE HOUSE nằm nép mình yên tĩnh trong một con ngõ rộng của khu phố Bùi Thị Xuân (Hà Nội), là homestay rất mới được chăm chút và sáng tạo bởi ca sĩ Thái Thùy Linh.',
		propertyType: 'APARTMENT',
		verified: true,
		pricing: {
			create: {
				weekday: 120,
				weekend: 150,
				month: 3000,
			},
		},
		facilities: {
			create: {
				numOfBedroom: 2,
				numOfBathroom: 1,
				kitchen: {
					create: {
						inductionCooker: true,
						gasStove: false,
						refrigerator: true,
						microwave: true,
					},
				},
			},
		},
		utilities: {
			create: {
				wifi: true,
				airCondition: true,
				tivi: true,
				elevator: true,
				toothpaste: true,
				bathSoap: true,
				tissue: true,
				bathTowel: true,
				shampoo: true,
				mineralWater: true,
				washingMachine: true,
			},
		},
		homeRules: {
			create: {
				checkInTime: '3:00 PM',
				checkOutTime: '11:00 AM',
				smoking: false,
				pets: false,
				party: false,
				payments: 'Credit Card',
			},
		},
	},
	// Add more places here...
] satisfies Prisma.HomestayCreateInput[];

const bars = [
	{
		type: 'bar',
		name: '1900 Le Théâtre',
		address: '8B P. Tạ Hiện, Hàng Buồm, Hoàn Kiếm, Hà Nội',
		city: 'ha_noi',
		latitude: 21.035823024912442,
		longitude: 105.8519772,
		coverImage:
			'https://placebookk.s3.ap-southeast-1.amazonaws.com/bar-1900.jpg',
		facebookLink: 'https://www.facebook.com/1900.hn/',
		instagramLink: '',
		contact: '091 111 19 00',
		description:
			'Bar 1900 Le Theatre nằm ở trung tâm náo nhiệt nhất phố cổ Hà Nội',
		pricing: '100000 - 200000',
		openHour: '8:00 PM',
		closeHour: '1:00 AM',
		happyHourStart: '',
		happyHourEnd: '',
		verified: true,
	},
] satisfies Prisma.BarCreateInput[];

async function seedDatabase() {
	console.log(`Start seeding ...`);
	for (const h of homestays) {
		const homestay = await prisma.homestay.create({
			data: h,
		});
		console.log(`Created homestay with id: ${homestay.id}`);
	}

	for (const b of bars) {
		const bar = await prisma.bar.create({
			data: b,
		});
		console.log(`Created bar with id: ${bar.id}`);
	}
	console.log(`Seeding finished.`);
}

seedDatabase()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
