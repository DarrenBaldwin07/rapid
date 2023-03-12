import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import { RapidStyles } from '../../../utils';

const RAPID_CLASSNAME = 'rapid-flex';

interface FlexProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
	({ styles, children, ...rest }, ref) => {
		const flexStyles = 'flex';

		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					flexStyles,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</div>
		);
	},
);

export default Flex;
