import React, { forwardRef, HTMLAttributes, useMemo } from 'react';
import { RapidStyles, getVariantClassName } from '../../../utils';
import { createVariant } from '../../../theme';

type Orientation = 'horizontal' | 'vertical';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	styles?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	orientation?: Orientation;
	variant?: 'dashed' | 'solid';
}

export const dividerTheme = createVariant({
	variants: {
		dashed: 'border-dashed',
		solid: 'border-solid',
	},
	sizes: {
		sm: 'border',
		md: 'border-2',
		lg: 'border-4',
		xl: 'border-8',
	},
	defaultProps: {
		variant: 'solid',
		size: 'sm',
	},
});

const THEME_CLASSNAME = 'rapid-divider';
const DIVIDER_STYLES = 'text-lightGrey border-current border-opacity-60';

const Divider = forwardRef<HTMLHRElement, DividerProps>(
	(
		{ styles, size = 'sm', orientation = 'horizontal', variant, ...rest },
		ref,
	) => {
		const getDividerStyles = useMemo(() => {
			return orientation === 'vertical'
				? `${DIVIDER_STYLES} h-full border-t-0 border-l` // vertical
				: `${DIVIDER_STYLES} w-full border-b`; // horizontel
		}, [orientation]);

		return (
			<hr
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					getDividerStyles,
					getVariantClassName(variant, 'divider', size) ||
						THEME_CLASSNAME,
				)}
			/>
		);
	},
);

Divider.displayName = 'Divider';

export default Divider;
