import React, {
	forwardRef,
	useRef,
	useEffect,
	useState,
	useContext,
	DetailedHTMLProps,
	HTMLAttributes,
	KeyboardEvent,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { AccordionIcon, AccordionContext, AccordionContextType } from '../';

const RAPID_CLASSNAME = 'rapid-accordion-header';

// @todo should create generic type for styles, children
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
	const accordionCtx = useContext(AccordionContext) as AccordionContextType;

	if (!accordionCtx) {
		throw new Error(
			'AccordionHeader must be used within an Accordion component',
		);
	}

	const { allowToggle, activeItems, setActiveItems } = accordionCtx;
	const divRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [index, setIndex] = useState<number | null>(null);
	const [isHovering, setIsHovering] = React.useState(false);

	const accordionHeaderStyles = `cursor-pointer p-2 ${
		isHovering && 'bg-gray-100'
	}`;

	useEffect(() => {
		// @todo use querySelector
		if (divRef.current) {
			setIndex(
				Array.from(
					divRef.current.parentElement?.parentElement?.parentElement
						?.children || [],
				).indexOf(
					divRef.current.parentElement?.parentElement as Element,
				),
			);
		}
	}, []);

	useEffect(() => {
		setIsOpen(index !== null && activeItems.includes(index));
	}, [activeItems, index]);

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

	// @todo onToggle should be handled in AccordionItem and allow for custom function
	// should also be able to set openState in AccordionItem
	// and default indexes that are open
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
			<div ref={divRef} className='flex items-center justify-between'>
				{children}
				<AccordionIcon isOpen={isOpen} />
			</div>
		</h2>
	);
});

export default AccordionHeader;

// useEffect(() => {
// 	if (contentRef.current) {
// 	  const accordionItem = contentRef.current.closest('.rapid-accordion-item');
// 	  const siblings = Array.from(
// 		accordionItem?.parentElement?.children || []
// 	  );
// 	  setIndex(siblings.indexOf(accordionItem as Element));
// 	}
//   }, []);
