import { ThemeSchema, RapidUiThemeConfig } from './types';
import { VariantOutput } from './createTheme';
export * from './types';
export * from './createTheme';
export { default as createVariant } from './createTheme';
export { default as rapidTailwindTheme } from './tailwindTheme';

export type ThemeVariant = <T extends ThemeSchema, E extends ThemeSchema>(
	config: RapidUiThemeConfig<T, E>,
) => VariantOutput;
