import { ClassValue } from "../types";

export type ClassProp =
	| {
			class: ClassValue;
			className?: never;
	  }
	| { class?: never; className: ClassValue }
	| { class?: never; className?: never };

type ThemeVariants<T extends ThemeSchema> = keyof T;
type ThemeSizes<T extends ThemeSchema> = keyof T;

export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;
export type ThemeSchema = Record<
	string,
	Record<string, ClassValue> | ClassValue
>;

export type DefaultProps<T extends ThemeSchema, E extends ThemeSchema> = {
	size?: ThemeSizes<E>;
	variant: ThemeVariants<T>;
};

// TODO: this type is yoinky (typescript does support double conditionals in types for some odd reason)
export type RapidUiThemeConfig<T, E> = T extends ThemeSchema
	? E extends ThemeSchema
		? {
				baseStyle: ClassValue;
				sizes?: E;
				variants: T;
				defaultProps: DefaultProps<T, E>;
		  }
		: never
	: never;

export type CreateVariant<T, E> = (variant?: keyof T | undefined, size?: keyof E | undefined) => string;

export interface RapidTheme<T, E> {
	button?: CreateVariant<T, E>
};
