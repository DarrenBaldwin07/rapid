import React from 'react';
import { RapidStyles } from '../../utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	styles?: string;
};

const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
	({ styles, ...rest }, ref) => {
        const defaultStyles = '';
		return (
			<h1
				ref={ref}
				{...rest}
				className={RapidStyles(styles, defaultStyles)}
			/>
		);
	},
);

export default Heading;
