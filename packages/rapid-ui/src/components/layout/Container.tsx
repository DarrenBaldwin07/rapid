import React from 'react';
import { RapidStyles } from '../../utils';

type MaxWidth = 'sm' | 'md' | 'lg';

interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	maxWidth: MaxWidth
}

const parseMaxWidth = (maxWidth: MaxWidth) => {
	switch(maxWidth) {
		case 'sm':
			return 'max-w-5xl'
		case 'md':
			return 'max-w-7xl'
		case 'lg':
			return 'max-w-container'
	}
}


const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	({ className, maxWidth = 'lg', ...rest }, ref) => {
		const styles = `container ${parseMaxWidth(maxWidth)} mx-auto px-4`;
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(className, styles)}
			/>
		);
	},
);

export default Container;
