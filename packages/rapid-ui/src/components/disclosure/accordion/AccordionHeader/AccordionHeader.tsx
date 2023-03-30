import React, {
	forwardRef,
	useRef,
	DetailedHTMLProps,
	HTMLAttributes,
	KeyboardEvent,
} from 'react';
import { RapidStyles } from '../../../../utils';
import {
	useAccordionContext,
	useAccordionItemIndex,
	useAccordionIsOpen,
} from '../useAccordionHooks';

const RAPID_CLASSNAME = 'rapid-accordion-header';

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
	const [isHovering, setIsHovering] = React.useState(false);
	const index = useAccordionItemIndex(divRef);
	const isOpen = useAccordionIsOpen(index, activeItems);

	const accordionHeaderStyles = `cursor-pointer p-2 ${
		isHovering && 'bg-gray-100'
	}`;

	const handleToggle = () => {
		if (index === null) return;

		if (allowToggle) {
			setActiveItems((prev) =>
				isOpen ? prev.filter((i) => i !== index) : [...prev, index],
			);
		} else {
			setActiveItems((prev) => (isOpen ? prev : [index]));
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLHeadingElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleToggle();
		}
	};

	return (
		<h2
			ref={ref}
			className={RapidStyles(
				styles || rest.className,
				accordionHeaderStyles,
				RAPID_CLASSNAME,
			)}
			onClick={handleToggle}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}
		>
			<div ref={divRef} className='flex items-center justify-between '>
				{children}
			</div>
		</h2>
	);
});

export default AccordionHeader;
