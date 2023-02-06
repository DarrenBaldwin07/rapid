import { twMerge } from 'tailwind-merge';
import { ClassValue } from './theme/types';

export const falsyToString = <T extends unknown>(value: T) =>
	typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const sanitizeClassNames = () => {

}
export function RapidStyles(classes: string | ClassValue, defaults: string | ClassValue) {
	return twMerge(defaults, classes);
}
