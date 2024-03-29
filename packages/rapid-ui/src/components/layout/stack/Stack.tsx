import React, { useMemo } from 'react';
import { RapidStyles, getValidReactChildren } from '../../../utils';

type Spacing = 'sm' | 'md' | 'lg';
type Direction = 'row' | 'column';

interface StackProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	spacing?: Spacing;
	direction?: Direction;
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-stack';

// ------------------- TAILWINDCSS CLASSES TO FORCE JIT TO COMPILE -------------------
// space-y-6
// space-y-3
// space-y-1.5
// space-x-6
// space-x-3
// space-x-1.5

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
	(
		{ styles, children, spacing = 'lg', direction = 'column', ...rest },
		ref,
	) => {
		// We only want to re-run this if children change
		const sanitizedChildren = useMemo(
			() => getValidReactChildren(children),
			[children],
		);

		const getSpacing = useMemo(() => {
			switch (spacing) {
				case 'sm':
					return '1.5';
				case 'md':
					return '3';
				case 'lg':
					return '6';
			}
		}, [spacing]);

		const getDirectionStyles = useMemo(() => {
			switch (direction) {
				case 'row':
					return `flex ${`space-x-${getSpacing}`}`;
				case 'column':
					return `flex flex-col ${`space-y-${getSpacing}`}`;
			}
		}, [direction, getSpacing]);

		// This component does not support custom dividers or wrapping (maybe a TODO ?)
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					getDirectionStyles,
					RAPID_CLASSNAME,
				)}
			>
				{sanitizedChildren}
			</div>
		);
	},
);

export default Stack;
