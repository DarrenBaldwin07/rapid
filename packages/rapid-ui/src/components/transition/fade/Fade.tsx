import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';
import { RapidStyles } from '../../../utils';

type Transition = {
	enter?: {};
	exit?: {};
};
interface ScaleFadeProps extends MotionProps {
	styles?: string;
	initialOpacity?: number;
	isEnabled?: boolean;
	transition?: Transition;
	transitionEnd?: Transition;
}

const RAPID_CLASSNAME = 'rapid-fade';

const Fade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
	(
		{
			styles,
			initialOpacity,
			isEnabled,
			transition,
			transitionEnd,
			...rest
		},
		ref,
	) => {
		// Framer-motion animation variants
		const variants: Variants = {
			enter: {
				opacity: 1,
				transition: transition?.enter,
				transitionEnd: transitionEnd?.enter,
			},
			exit: {
				opacity: initialOpacity || 0,
				transition: transition?.exit,
				transitionEnd: transitionEnd?.exit,
			},
		};

		// The animation config that pass as props to a <motion.div />
		const fadeConfig: HTMLMotionProps<'div'> = {
			initial: 'exit',
			animate: 'enter',
			exit: 'exit',
			variants: variants as Variants,
		};

		// Return nothing if the consumer did not want to enable the animation
		if (isEnabled === false) return <>{rest.children}</>;

		return (
			<motion.div
				{...rest}
				{...fadeConfig}
				// transition={{ duration: 0.025 }}
				ref={ref}
				className={RapidStyles(styles, RAPID_CLASSNAME)}
			/>
		);
	},
);

Fade.displayName = 'Fade';

export default Fade;
