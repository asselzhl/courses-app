export function getCourseDuration(durationInMinutes: number): string {
	let hours: string | number = Math.floor(durationInMinutes / 60);
	const minutes: number = durationInMinutes % 60;

	let unit: string;
	if (hours === 1) {
		unit = 'hour';
	} else {
		unit = 'hours';
	}

	if (hours < 10) {
		hours = hours.toString().padStart(2, '0');
	}

	return `${hours}:${minutes} ${unit}`;
}
