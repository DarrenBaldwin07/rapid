import React, {
	createContext,
	useState,
	forwardRef,
	DetailedHTMLProps,
	HTMLAttributes,
} from 'react';
import { RapidStyles } from '../../../../utils';

const RAPID_CLASSNAME = 'rapid-accordion';

export type AccordionContextType = {
	allowMultiple: boolean;
	allowToggle: boolean;
	activeItems: number[];
	setActiveItems: React.Dispatch<React.SetStateAction<number[]>>;
};

export const AccordionContext = createContext<AccordionContextType | undefined>(
	undefined,
);

interface AccordionProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	allowMultiple?: boolean;
	allowToggle?: boolean;
	defaultIndexes?: number[];
	children: React.ReactNode;
	styles?: string;
}

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
		const accordionStyles =
			'flex flex-col mt-5 p-3 border-2 rounded-lg overflow-x-auto';

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
						accordionStyles,
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
