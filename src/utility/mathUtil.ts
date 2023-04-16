import Rand, { PRNG } from "rand-seed";

export const remap = (input: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return outMin + (input - inMin) * (outMax - outMin) / (inMax - inMin);
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