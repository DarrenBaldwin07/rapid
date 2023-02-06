import React from 'react';
import { RapidStyles } from '../../utils';

interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const defaultClassNames = 'container max-w-container mx-auto px-4'

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	({ className, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(className, defaultClassNames)}
			/>
		);
	},
);

export default Container;
