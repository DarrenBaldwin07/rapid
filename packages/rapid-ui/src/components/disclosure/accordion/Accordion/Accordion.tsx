import React, {
	useState,
	forwardRef,
	DetailedHTMLProps,
	HTMLAttributes,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { AccordionContext } from '../useAccordion';

const RAPID_CLASSNAME = 'rapid-accordion';

interface AccordionProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	allowMultiple?: boolean;
	allowToggle?: boolean;
	defaultIndexes?: number[];
	children: React.ReactNode;
	styles?: string;
}

const ACDN_STYLES =
	'flex flex-col mt-5 p-3 border-2 rounded-lg overflow-x-auto';

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	(
		{
			allowMultiple = false,
			allowToggle = false,
			defaultIndexes = [],
			children,
			styles,
			...rest
		},
		ref,
	) => {
		const [activeItems, setActiveItems] =
			useState<number[]>(defaultIndexes);

		return (
			<AccordionContext.Provider
				value={{
					allowMultiple,
					allowToggle,
					activeItems,
					setActiveItems,
				}}
			>
				<div
					ref={ref}
					{...rest}
					className={RapidStyles(
						styles || rest.className,
						ACDN_STYLES,
						RAPID_CLASSNAME,
					)}
					role='accordion'
				>
					{children}
				</div>
			</AccordionContext.Provider>
		);
	},
);

export default Accordion;
