import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';
import { RapidStyles } from '../../../utils';

interface ScaleFadeProps extends MotionProps {
	styles?: string;
	initialOpacity?: number;
	isEnabled?: boolean;
}

const RAPID_CLASSNAME = 'rapid-fade';

const Fade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
	({ styles, initialOpacity, isEnabled, ...rest }, ref) => {
		// Framer-motion animation variants
		const variants: Variants = {
			enter: ({ transition, transitionEnd } = {}) => ({
				opacity: 1,
				transition: transition?.enter,
				transitionEnd: transitionEnd?.enter,
			}),
			exit: ({ transition, transitionEnd } = {}) => ({
				opacity: initialOpacity || 1,
				transitionEnd: transitionEnd?.exit,
				transition: {
					duration: 0.025,
					...transition?.exit,
				},
			}),
		};

		// The animation config that pass as props to a <motion.div />
		const fadeConfig: HTMLMotionProps<'div'> = {
			initial: 'exit',
			animate: 'enter',
			exit: 'exit',
			variants: variants as Variants,
		};

		// Return nothing if the consumer did not want to enable the animation
		if (isEnabled === false) return null;

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

Fade.displayName = 'Fade';

export default Fade;
