import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';
import { RapidStyles } from '../../../utils';

interface SlideFadeProps extends MotionProps {
	open: boolean;
	initialOpacity?: number;
	exitAnimation?: 'exit' | 'initial';
	isEnabled?: boolean;
	direction?: 'left' | 'right' | 'top' | 'bottom';
	transition?: {
		enter?: {};
		exit?: {};
	};
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-slide-fade';

const defaultTransition = {
	exit: {
		duration: 0.25,
		ease: 'easeInOut',
	},
	enter: {
		duration: 0.25,
		type: 'spring',
		damping: 25,
		stiffness: 180,
	},
};

const SlideFade = React.forwardRef<HTMLDivElement, SlideFadeProps>(
	(
		{
			open,
			styles,
			initialOpacity,
			exitAnimation = 'exit',
			isEnabled,
			direction = 'right',
			transition,
			...rest
		},
		ref,
	) => {
		// Framer-motion animation variants
		const variants: Variants = {
			enter: ({ transition, transitionEnd } = {}) => ({
				opacity: 1,
				x:
					direction === 'right'
						? 0
						: direction === 'left'
						? 0
						: undefined,
				y:
					direction === 'bottom'
						? 0
						: direction === 'top'
						? 0
						: undefined,
				transition: transition?.enter || defaultTransition.enter,
				transitionEnd: transitionEnd?.enter || defaultTransition.enter,
			}),
			initial: ({ transition, transitionEnd } = {}) => ({
				opacity: initialOpacity || 1,
				x:
					direction === 'right'
						? '100%'
						: direction === 'left'
						? '-100%'
						: 0,
				y:
					direction === 'bottom'
						? '100%'
						: direction === 'top'
						? '-100%'
						: 0,
				transition: transition?.exit,
				transitionEnd: transitionEnd?.exit,
			}),
			exit: ({ transition, transitionEnd } = {}) => ({
				opacity: 1,
				x:
					direction === 'right'
						? '100%'
						: direction === 'left'
						? '-100%'
						: 0,
				y:
					direction === 'bottom'
						? '100%'
						: direction === 'top'
						? '-100%'
						: 0,
				transition: transition?.exit || defaultTransition.exit,
				transitionEnd: transitionEnd?.exit || defaultTransition.exit,
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

SlideFade.displayName = 'SlideFade';

export default SlideFade;
