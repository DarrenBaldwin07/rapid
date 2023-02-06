import { twMerge } from 'tailwind-merge';

const falsyToString = <T extends unknown>(value: T) =>
	typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export function RapidStyles(classes: string, defaults: string) {
	return twMerge(defaults, classes);
}
