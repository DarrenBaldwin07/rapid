import React from 'react';
import { RapidStyles } from '../../../utils';

type Size = 'sm' | 'md' | 'lg';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	styles?: string;
	size?: Size;
}

const THEME_CLASSNAME = 'rapid-heading';

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ styles, size = 'lg', ...rest }, ref) => {
		const getFontSize = (size: Size) => {
			switch (size) {
				case 'sm':
					return 'text-sm';
				case 'md':
					return 'text-lg';
				case 'lg':
					return 'text-3xl';
			}
		};
		const defaultStyles = getFontSize(size);
		return (
			<h2
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					defaultStyles,
					THEME_CLASSNAME,
				)}
			/>
		);
	},
);

Heading.displayName = 'Heading';

export default Heading;
