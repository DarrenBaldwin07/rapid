import React from 'react';
import Stack from './Stack';

type Spacing = 'sm' | 'md' | 'lg';

interface VStackProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	spacing?: Spacing;
	styles?: string;
}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
	({ styles, children, spacing = 'lg', ...rest }, ref) => {
		// This component does not support custom dividers or wrapping (maybe a TODO ?)
		return (
			<Stack
				{...rest}
				ref={ref}
				spacing={spacing}
				direction='column'
				styles={styles}
			>
				{children}
			</Stack>
		);
	},
);

export default VStack;
