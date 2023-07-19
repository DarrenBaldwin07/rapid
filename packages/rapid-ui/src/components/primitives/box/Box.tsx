import React from 'react';
import { RapidStyles } from '../../../utils';

type BoxType = 'div';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
	as?: BoxType;
}

const THEME_CLASSNAME = 'rapid-box';

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
	({ styles, as = 'div', ...rest }, ref) => {
		const Component = (type: BoxType) => {
			switch (type) {
				case 'div':
					return (
						<div
							ref={ref}
							className={RapidStyles(
								styles || rest.className,
								'', //defaultStyles
								THEME_CLASSNAME,
							)}
						/>
					);
			}
		};
		return Component(as);
	},
);

Box.displayName = 'Box';

export default Box;
