export function formatMS(ms: number) {
	const times = {
		week: Math.floor(ms / (1000 * 60 * 60 * 24 * 7)),
		day: Math.floor(ms / (1000 * 60 * 60 * 24)),
		hour: Math.floor((ms / (1000 * 60 * 60)) % 24),
		minute: Math.floor((ms / (1000 * 60)) % 60),
		second: Math.floor((ms / 1000) % 60),
	};

	let string = '';

	for (const [key, value] of Object.entries(times)) {
		if (value > 0) string += ` ${value} ${key}${value > 1 ? 's, ' : ','}`;
	}
	return string
		.trim()
		.substring(0, string.trim().length - 1)
		.replace(/ {2}/gi, ' ');
}
