import { twMerge } from 'tailwind-merge';
import { ClassValue } from './types';
import { Children, isValidElement } from "react";

export const falsyToString = <T extends unknown>(value: T) =>
	typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const sanitizeClassNames = (...classes: ClassValue[]) => {
	// @ts-ignore
	return classes.flat(Infinity).filter(Boolean).join(" ");
}
export function RapidStyles(classes: string | ClassValue, defaults: string | ClassValue) {
	return twMerge(defaults, classes);
}


export function getValidReactChildren(children: React.ReactNode) {
	return Children.toArray(children).filter((child) =>
	  isValidElement(child),
	) as React.ReactElement[]
  }
