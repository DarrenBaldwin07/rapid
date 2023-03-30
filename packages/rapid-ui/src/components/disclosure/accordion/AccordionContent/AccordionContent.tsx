import React, {
	forwardRef,
	useContext,
	useState,
	useEffect,
	useRef,
	DetailedHTMLProps,
	HTMLAttributes,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { AccordionContext } from '../';

const RAPID_CLASSNAME = 'rapid-accordion-content';

interface AccordionContentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string;
	children: React.ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
	({ styles, children, ...rest }, ref) => {
		const accordionCtx = useContext(AccordionContext);

		if (!accordionCtx) {
			throw new Error(
				'AccordionContent must be used within an Accordion component',
			);
		}

		const { activeItems } = accordionCtx;
		const contentRef = useRef<HTMLDivElement>(null);
		const [isOpen, setIsOpen] = useState(false);
		const [index, setIndex] = useState<number | null>(null);

		// @todo this is a bit of a hack, should consider use a query selector
		useEffect(() => {
			if (contentRef.current) {
				setIndex(
					Array.from(
						contentRef.current.parentElement?.parentElement
							?.parentElement?.children || [],
					).indexOf(
						contentRef.current.parentElement
							?.parentElement as Element,
					),
				);
			}
		}, []);

		useEffect(() => {
			setIsOpen(index !== null && activeItems.includes(index));
		}, [activeItems, index]);

		const accordionContentStyles = `transition-max-height overflow-hidden duration-300 ${
			isOpen ? 'max-h-96' : 'max-h-0'
		}`;

		return (
			<div
				ref={ref}
				className={RapidStyles(
					styles || rest.className,
					accordionContentStyles,
					RAPID_CLASSNAME,
				)}
			>
				<div ref={contentRef} className='p-2'>
					{children}
				</div>
			</div>
		);
	},
);

export default AccordionContent;
