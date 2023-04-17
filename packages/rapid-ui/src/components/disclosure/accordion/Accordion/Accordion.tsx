import React, {
	useState,
	forwardRef,
	DetailedHTMLProps,
	HTMLAttributes,
	useId,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { AccordionContext } from '../useAccordion';

interface AccordionProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	allowMultiple?: boolean;
	allowToggle?: boolean;
	defaultIndexes?: number[];
	children: React.ReactNode;
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-accordion';
const ACC_STYLES = 'flex flex-col overflow-x-auto';

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
					id: useId(),
				}}
			>
				<div
					ref={ref}
					{...rest}
					className={RapidStyles(
						styles || rest.className,
						ACC_STYLES,
						RAPID_CLASSNAME,
					)}
					role='region'
					aria-multiselectable={allowMultiple}
				>
					{children}
				</div>
			</AccordionContext.Provider>
		);
	},
);

export default Accordion;
