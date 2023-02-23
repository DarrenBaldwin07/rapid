import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';

interface ScaleFadeProps extends MotionProps {
    initialScale?: number;
}


const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(({ ...rest }, ref) => {
    // Framer-motion animation variants
    const variants: Variants = {
        enter: ({ transition, transitionEnd } = {}) => ({
            opacity: 1,
            scale: 1,
            transition: transition?.enter,
            transitionEnd: transitionEnd?.enter,
        }),
        exit: ({ transition, transitionEnd } = {}) => ({
            opacity: 0,
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
            {...rest}
            {...fadeConfig}
            ref={ref}
        />
    )
})

export default ScaleFade
