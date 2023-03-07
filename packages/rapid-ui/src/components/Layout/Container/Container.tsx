import React from 'react';
import { RapidStyles } from '../../../utils';

type MaxWidth = 'sm' | 'md' | 'lg';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
	maxWidth?: MaxWidth;
}

const parseMaxWidth = (maxWidth: MaxWidth) => {
	switch (maxWidth) {
		case 'sm':
			return 'max-w-5xl';
		case 'md':
			return 'max-w-7xl';
		case 'lg':
			return 'max-w-container';
	}
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	({ styles, maxWidth = 'lg', ...rest }, ref) => {
		const defaultStyles = `container ${parseMaxWidth(
			maxWidth,
		)} mx-auto px-4`;
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(styles || rest.className, defaultStyles)}
			/>
		);
	},
);

export default Container;
