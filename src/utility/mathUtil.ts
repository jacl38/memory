import Rand from "rand-seed";

export const remap = (input: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return outMin + (input - inMin) * (outMax - outMin) / (inMax - inMin);
}

export const formatMilliseconds = (durationMs: number) => {
	const tenths = Math.floor(durationMs / 100) / 10;

	return tenths.toFixed(1);
}

declare global {
	interface Array<T> {
		shuffle(seed: number): Array<T>;
	}
}

export const shuffleArray = (array: any[], seed: number) => {
	const rand = new Rand(seed.toString());
	for(let i = 0; i < array.length; i++) {
		const j = Math.floor(rand.next() * array.length);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}