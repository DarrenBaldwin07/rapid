import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';
import { RapidStyles } from '../../utils';

interface ScaleFadeProps extends MotionProps {
	initialScale?: number;
	initialOpacity?: number;
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-scale-fade';

const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
	({ styles, initialOpacity, ...rest }, ref) => {
		// Framer-motion animation variants
		const variants: Variants = {
			enter: ({ transition, transitionEnd } = {}) => ({
				opacity: 1,
				scale: 1,
				transition: transition?.enter,
				transitionEnd: transitionEnd?.enter,
			}),
			exit: ({ transition, transitionEnd } = {}) => ({
				opacity: initialOpacity || 0,
				scale: rest.initialScale || 0.95,
				transition: transition?.exit,
				transitionEnd: transitionEnd?.exit,
			}),
		};

		// The animation config that pass as props to a <motion.div />
		const fadeConfig: HTMLMotionProps<'div'> = {
			initial: 'exit',
			animate: 'enter',
			exit: 'exit',
			variants: variants as Variants,
		};

		return (
			<motion.div
				initial='closed'
				animate='open'
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
