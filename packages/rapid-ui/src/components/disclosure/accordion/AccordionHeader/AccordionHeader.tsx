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
import { ACC_CONTENT_CLASSNAME } from '../';

interface AccordionHeaderProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	> {
	onToggle?: () => void;
	styles?: string;
	children: React.ReactNode;
}

export const RAPID_CLASSNAME = 'rapid-accordion-header';
const ACC_HEADER_STYLES = `cursor-pointer p-2 hover:bg-hoverWhite`; // @todo dark mode should cause this to switch
const ACC_HEADER_DIV_STYLES = `flex justify-between items-center`;

export const AccordionHeader = forwardRef<
	HTMLHeadingElement,
	AccordionHeaderProps
>(({ children, styles, ...rest }, ref) => {
	const { allowToggle, activeItems, setActiveItems, id } =
		useAccordionContext();
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
			id={`${RAPID_CLASSNAME}-${id}-${index}`}
			className={RapidStyles(
				styles || rest.className,
				ACC_HEADER_STYLES,
				RAPID_CLASSNAME,
			)}
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}
			aria-expanded={isOpen}
			aria-controls={`${ACC_CONTENT_CLASSNAME}-${id}-${index}`}
		>
			<div ref={divRef} className={ACC_HEADER_DIV_STYLES}>
				{children}
			</div>
		</h2>
	);
});

export default AccordionHeader;
