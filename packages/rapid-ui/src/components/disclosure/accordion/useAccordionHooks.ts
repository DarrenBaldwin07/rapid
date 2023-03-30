import { useContext, useEffect, useState } from 'react';
import {
	AccordionContext,
	AccordionContextType,
	ACCORDION_ITEM_CLASSNAME,
} from './';

export const useAccordionContext = (): AccordionContextType => {
	const accordionCtx = useContext(AccordionContext) as AccordionContextType;

	if (!accordionCtx) {
		throw new Error(
			'This component must be used within an Accordion component',
		);
	}

	return accordionCtx;
};

export const useAccordionItemIndex = (
	divRef: React.RefObject<HTMLDivElement | SVGSVGElement>,
): number | null => {
	const [index, setIndex] = useState<number | null>(null);

	useEffect(() => {
		const accordionItem = divRef.current?.closest(
			`.${ACCORDION_ITEM_CLASSNAME}`,
		);
		const accordion = accordionItem?.parentElement;

		if (accordion && accordionItem) {
			const index = Array.from(accordion.children).indexOf(accordionItem);
			setIndex(index);
		}
	}, [divRef]);

	return index;
};

export const useAccordionIsOpen = (
	index: number | null,
	activeItems: number[],
): boolean => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(index !== null && activeItems.includes(index));
	}, [activeItems, index]);

	return isOpen;
};
