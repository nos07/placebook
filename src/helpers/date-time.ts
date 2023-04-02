import dayjs from 'dayjs';

export function isExpired24Hours(date: Date | number): boolean {
	const twentyFourHoursAgo = dayjs().subtract(24, 'hour');
	const checkingDate = dayjs(date);

	// Return true if the timestamp is before 24 hours ago, false otherwise
	return checkingDate.isBefore(twentyFourHoursAgo);
}

export function getTimeOfDay() {
	const now = dayjs();
	const hour = now.hour();

	if (hour < 12) {
		return 'morning 🌅';
	} else if (hour < 17) {
		return 'afternoon 🌄';
	} else if (hour < 20) {
		return 'evening 🌙';
	} else {
		return 'night 🌑';
	}
}
