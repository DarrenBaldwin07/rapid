import React from 'react';
import Stack from '../Stack/Stack';

type Spacing = 'sm' | 'md' | 'lg';

interface VStackProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	styles?: string;
	spacing?: Spacing;
}

const HStack = React.forwardRef<HTMLDivElement, VStackProps>(
	({ styles, children, spacing = 'lg', ...rest }, ref) => {
		// This component does not support custom dividers or wrapping (maybe a TODO ?)
		return (
			<Stack
				{...rest}
				ref={ref}
				styles={styles}
				spacing={spacing}
				direction='row'
			>
				{children}
			</Stack>
		);
	},
);

export default HStack;
