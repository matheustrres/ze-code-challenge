const MAX_COUNTER = 9999;

export function genNumericId(): number {
	let counter = 0;

	const timestamp = Date.now();
	counter = (counter + 1) % MAX_COUNTER;

	return Number(`${timestamp}${counter.toString().padStart(4, '0')}`);
}
