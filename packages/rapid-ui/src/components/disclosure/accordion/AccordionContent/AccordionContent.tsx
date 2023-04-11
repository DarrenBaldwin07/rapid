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
} from '../useAccordion';
import { useCombinedRefs } from '../../../../hooks';
import { ACC_HEADER_CLASSNAME } from '../';

interface AccordionContentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactNode;
	styles?: string;
}

export const RAPID_CLASSNAME = 'rapid-accordion-content';
const ACC_CONTENT_STYLES = 'p-2 text-gray-500';

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
	({ children, styles, ...rest }, ref) => {
		const contentRef = useRef<HTMLDivElement>(null);
		const combinedRef = useCombinedRefs(ref, contentRef);
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
				initial='closed'
				animate={isOpen ? 'open' : 'closed'}
				variants={variants}
				transition={transition}
				style={{ overflow: 'hidden' }}
			>
				<div
					id={`${RAPID_CLASSNAME}-${index}`}
					ref={combinedRef}
					{...rest}
					className={RapidStyles(
						styles || rest.className,
						ACC_CONTENT_STYLES,
						RAPID_CLASSNAME,
					)}
					aria-labelledby={`${ACC_HEADER_CLASSNAME}-${index}`}
					role='region'
				>
					{children}
				</div>
			</motion.div>
		);
	},
);

export default AccordionContent;
