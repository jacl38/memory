

export const remap = (input: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return outMin + (input - inMin) * (outMax - outMin) / (inMax - inMin);
}