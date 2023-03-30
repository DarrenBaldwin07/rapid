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
	children: React.ReactNode;
	styles?: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	(
		{
			allowMultiple = false,
			allowToggle = false,
			children,
			styles,
			...rest
		},
		ref,
	) => {
		const [activeItems, setActiveItems] = useState<number[]>([]);
		const accordionStyles =
			'flex flex-col mt-5 p-3 border-2 rounded-lg overflow-x-auto';

		console.log(activeItems, 'these are active');

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
				>
					{children}
				</div>
			</AccordionContext.Provider>
		);
	},
);

export default Accordion;
