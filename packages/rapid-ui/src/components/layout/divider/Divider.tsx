import { forwardRef, HTMLAttributes } from 'react';
import { RapidStyles, getVariantClassName } from '../../../utils';
import { createVariant } from '../../../theme';

const THEME_CLASSNAME = 'rapid-divider';

export const dividerTheme = createVariant({
	variants: {
		dashed: 'border-dashed',
		solid: 'border-solid',
	},
	defaultProps: {
		variant: 'solid',
	},
});

type orientation = 'horizontal' | 'vertical';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	styles?: string;
	size?: 'sm' | 'md' | 'lg';
	orientation?: orientation;
	variant?: 'dashed' | 'solid';
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
	(
		{ styles, size = 'sm', orientation = 'horizontal', variant, ...rest },
		ref,
	) => {
		const getDividerStyles = () => {
			const sizeToPx = {
				sm: '',
				md: '-2',
				lg: '-3',
				xl: '-4',
			};

			const commonStyles = 'border-current border-opacity-60';
			if (orientation === 'vertical') {
				return `${commonStyles}  h-full border-t-0 border-l${
					size && sizeToPx[size]
				}`;
			} else {
				// horizantel
				return `${commonStyles} w-full border-b${
					size && sizeToPx[size]
				}`;
			}
		};

		return (
			<hr
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					getDividerStyles(),
					getVariantClassName(variant, 'divider') || THEME_CLASSNAME,
				)}
			/>
		);
	},
);

Divider.displayName = 'Divider';

export default Divider;
