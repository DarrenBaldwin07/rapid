import React, { useMemo } from 'react';
import { RapidStyles, sanitizeClassNames } from '../../../utils';

type Speed = 'slow' | 'medium' | 'fast';
type Size = 'sm' | 'md' | 'lg';

interface SpinnerProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	styles?: string;
	label?: string;
	speed?: Speed;
	size?: Size;
}

// ------------------- TAILWINDCSS CLASSES TO FORCE JIT TO COMPILE -------------------
export const spinnerSafeList = [
	'spinner-slow',
	'spinner-medium',
	'spinner-fast',
];
const defaultStyles =
	'h-6 w-6 spinner-fast rounded-full border border-solid border-black border-t-transparent border-r-transparent';

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
	(
		{
			styles,
			speed = 'fast',
			size = 'md',
			label = 'Loading...',
			children,
			...rest
		},
		ref,
	) => {
		const getSpinnerSpeed = useMemo(() => {
			switch (speed) {
				case 'slow':
					return 'spinner-slow';
				case 'medium':
					return 'spinner-medium';
				case 'fast':
					return 'spinner-fast';
			}
		}, [speed]);

		const getSpinnerSize = useMemo(() => {
			switch (size) {
				case 'sm':
					return 'h-4 w-4';
				case 'md':
					return 'h-6 w-6';
				case 'lg':
					return 'h-8 w-8';
			}
		}, [size]);

		return (
			<div
				{...rest}
				ref={ref}
				className={RapidStyles(
					styles || rest.className,
					sanitizeClassNames(
						defaultStyles,
						getSpinnerSpeed,
						getSpinnerSize,
					),
				)}
			>
				<span className='sr-only' role='alert' aria-busy='true'>
					{label}
				</span>
			</div>
		);
	},
);

export default Spinner;
