import React, {
	forwardRef,
	useRef,
	DetailedHTMLProps,
	HTMLAttributes,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { motion } from 'framer-motion';
import {
	useAccordionContext,
	useAccordionItemIndex,
	useAccordionIsOpen,
} from '../useAccordionHooks';

const RAPID_CLASSNAME = 'rapid-accordion-content';
interface AccordionContentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactNode;
	styles?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
	({ children, styles, ...rest }, ref) => {
		const contentRef = useRef<HTMLDivElement>(null);
		const { activeItems } = useAccordionContext();
		const index = useAccordionItemIndex(contentRef);
		const isOpen = useAccordionIsOpen(index, activeItems);

		const variants = {
			open: { opacity: 1, height: 'auto' },
			closed: { opacity: 0, height: 0 },
		};

		const transition = {
			opacity: { duration: 0.3, ease: 'easeInOut' },
			height: { duration: isOpen ? 0.3 : 0.2, ease: 'easeInOut' },
		};

		return (
			<motion.div
				ref={ref}
				initial='closed'
				animate={isOpen ? 'open' : 'closed'}
				variants={variants}
				transition={transition}
				style={{ overflow: 'hidden' }}
				className={RapidStyles(
					styles || rest.className,
					RAPID_CLASSNAME,
				)}
			>
				<div ref={contentRef} className='p-2 text-gray-500'>
					{children}
				</div>
			</motion.div>
		);
	},
);

export default AccordionContent;
