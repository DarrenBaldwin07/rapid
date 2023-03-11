import { forwardRef, HTMLAttributes } from 'react';
import { RapidStyles, getVariantClassName } from '../../../utils';
import { createVariant } from '../../../theme';

const RAPID_CLASSNAME = 'rapid-divider';

export const dividerTheme = createVariant({
	variants: {
		dashed: 'border-dashed',
		solid: 'border-solid',
	},
	sizes: {
		sm: 'border-t-1',
		md: 'border-t-2',
		lg: 'border-t-3',
	},
	defaultProps: {
		variant: 'solid',
		size: 'md',
	},
});

type orientation = 'horizontal' | 'vertical';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	styles?: string;
	size?: 'sm' | 'md' | 'lg';
	orientation?: orientation;
	variant?: string;
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
	({ styles, size, orientation = 'horizontal', variant, ...rest }, ref) => {
		const getDividerStyles = () => {
			const commonStyles = 'border-current border-opacity-60';
			if (orientation === 'vertical') {
				return `${commonStyles}  h-full border-l`;
			} else {
				return `${commonStyles} w-full border-b`; // horizantel
			}
		};

		return (
			<hr
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					getDividerStyles(),
					getVariantClassName(variant, 'divider', size) ||
						RAPID_CLASSNAME,
				)}
			/>
		);
	},
);

export default Divider;
