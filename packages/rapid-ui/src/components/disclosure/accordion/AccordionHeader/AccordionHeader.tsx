import React, {
	forwardRef,
	useRef,
	DetailedHTMLProps,
	HTMLAttributes,
	KeyboardEvent,
	useCallback,
} from 'react';
import { RapidStyles } from '../../../../utils';
import {
	useAccordionContext,
	useAccordionItemIndex,
	useAccordionIsOpen,
} from '../useAccordion';

const RAPID_CLASSNAME = 'rapid-accordion-header';

const ACDN_HEADER_STYLES = `cursor-pointer p-2 hover:bg-lightGrey`;

const ACDN_HEADER_DIV_STYLES = `flex justify-between items-center`;

interface AccordionHeaderProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	> {
	onToggle?: () => void;
	styles?: string;
	children: React.ReactNode;
}

export const AccordionHeader = forwardRef<
	HTMLHeadingElement,
	AccordionHeaderProps
>(({ children, styles, ...rest }, ref) => {
	const { allowToggle, activeItems, setActiveItems } = useAccordionContext();
	const divRef = useRef<HTMLDivElement>(null);
	const index = useAccordionItemIndex(divRef);
	const isOpen = useAccordionIsOpen(index, activeItems);

	const handleToggle = useCallback(() => {
		if (index === null) return;

		if (allowToggle) {
			setActiveItems((prev: number[] | []) =>
				isOpen ? prev.filter((i) => i !== index) : [...prev, index],
			);
		} else {
			setActiveItems((prev: number[] | []) => (isOpen ? prev : [index]));
		}
	}, [index, isOpen, allowToggle, setActiveItems]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLHeadingElement>) => {
			if (e.key === 'Enter' || e.key === ' ') {
				handleToggle();
			}
		},
		[handleToggle],
	);

	return (
		<h2
			ref={ref}
			{...rest}
			className={RapidStyles(
				styles || rest.className,
				ACDN_HEADER_STYLES,
				RAPID_CLASSNAME,
			)}
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}
		>
			<div ref={divRef} className={ACDN_HEADER_DIV_STYLES}>
				{children}
			</div>
		</h2>
	);
});

export default AccordionHeader;
