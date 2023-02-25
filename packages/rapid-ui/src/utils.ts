import { twMerge } from 'tailwind-merge';
import { ClassValue } from './types';
import { Children, isValidElement } from 'react';

export const falsyToString = <T extends unknown>(value: T) =>
	typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const sanitizeClassNames = (...classes: ClassValue[]) => {
	// @ts-ignore
	return classes.flat(Infinity).filter(Boolean).join(' '); // Infinity for some reason has issues with typescript 4.9.2
};
export function RapidStyles(
	classes: string | ClassValue,
	defaults: string | ClassValue,
	themeClassName?: string,
) {
	return twMerge(twMerge(defaults, classes), themeClassName);
}

export const isValidClassName = (className: string) => {
	return /^[a-z0-9-]+$/.test(className);
};

export function getValidReactChildren(children: React.ReactNode) {
	return Children.toArray(children).filter((child) =>
		isValidElement(child),
	) as React.ReactElement[];
}

export const getVariantClassName = (
	variant: string | undefined,
	component: string,
	size?: string,
) => {
	const classNames = [];
	if (size) classNames.push(`rapid-${component}-${size}`);
	if (variant) classNames.push(`rapid-${component}-${variant}`);

	if (classNames.length > 0) {
		return classNames.join(' ');
	} else {
		return undefined;
	}
};
