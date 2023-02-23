import React from 'react';
import { motion, Variants, HTMLMotionProps, MotionProps } from 'framer-motion';
import { RapidStyles } from '../../utils';

interface ScaleFadeProps extends MotionProps {
    styles?: string;
}

const RAPID_CLASSNAME = 'rapid-fade';

const Fade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(({ styles,...rest }, ref) => {
    // Framer-motion animation variants
    const variants: Variants = {
        enter: ({ transition, transitionEnd } = {}) => ({
            opacity: 1,
            transition: transition?.enter,
            transitionEnd: transitionEnd?.enter,
        }),
        exit: ({ transition, transitionEnd } = {}) => ({
            opacity: 0,
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
    )
})

Fade.displayName = 'Fade';

export default Fade;
