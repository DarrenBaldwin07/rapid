import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';
import { RapidStyles } from '../../../utils';

interface ScaleFadeProps extends MotionProps {
	initialscale?: number;
	initialOpacity?: number;
	styles?: string;
	exitAnimation?: 'exit' | 'initial';
	isEnabled?: boolean;
}

const RAPID_CLASSNAME = 'rapid-scale-fade';

const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
	(
		{
			styles,
			initialOpacity,
			exitAnimation = 'initial',
			isEnabled,
			...rest
		},
		ref,
	) => {
		// Framer-motion animation variants
		const variants: Variants = {
			enter: ({ transition, transitionEnd } = {}) => ({
				opacity: 1,
				scale: 1,
				transition: transition?.enter,
				transitionEnd: transitionEnd?.enter,
			}),
			initial: ({ transition, transitionEnd } = {}) => ({
				opacity: initialOpacity || 1,
				scale: rest.initialscale || 0.95,
				transition: transition?.exit,
				transitionEnd: transitionEnd?.exit,
			}),
			exit: ({ transition, transitionEnd } = {}) => ({
				scale: rest.initialscale || 0.95,
				transition: transition?.exit,
				transitionEnd: transitionEnd?.exit,
			}),
		};

		// The animation config that pass as props to a <motion.div />
		const fadeConfig: HTMLMotionProps<'div'> = {
			initial: 'initial',
			animate: 'enter',
			exit: exitAnimation,
			variants: variants as Variants,
		};

		// Return nothing if the consumer did not want to enable the animation
		if (isEnabled === false) return <>{rest.children}</>;

		return (
			<motion.div
				{...rest}
				{...fadeConfig}
				ref={ref}
				className={RapidStyles(styles, RAPID_CLASSNAME)}
			/>
		);
	},
);

ScaleFade.displayName = 'ScaleFade';

export default ScaleFade;
