import { Menu as HeadlessMenu } from '@headlessui/react';
import React from 'react';
import { RapidStyles } from '../../../utils';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';

const THEME_CLASSNAME = 'rapid-menu-items';

interface MenuItemsProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
}

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
		scale: 0.95,
		transition: transition?.exit,
		transitionEnd: transitionEnd?.exit,
	}),
};

// The animation config that pass as props to a <motion.div />
export const fadeConfig: HTMLMotionProps<'div'> = {
	initial: 'exit',
	animate: 'enter',
	exit: 'exit',
	variants: variants as Variants,
};

const MenuItems = ({ styles, children, ...rest }: MenuItemsProps) => {
	// Simple default styles for the menu items
	const defaultStyles =
		'bg-white transition transform origin-top-left border border-lightGrey mt-2 rounded-md shadow-lg absolute z-10 flex flex-col space-y-2 py-1';

	return (
		<HeadlessMenu.Items {...rest} className={THEME_CLASSNAME}>
			<motion.div
				initial='closed'
				animate='open'
				className={RapidStyles(styles, defaultStyles)}
				{...fadeConfig}
			>
				{children}
			</motion.div>
		</HeadlessMenu.Items>
	);
};

export default MenuItems;
