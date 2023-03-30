import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import { RapidStyles } from '../../../../utils';

const RAPID_CLASSNAME = 'rapid-accordion-item';

interface AccordionItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactNode;
	styles?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, styles, ...rest }, ref) => {
		const accordionItemStyles = 'border-b';

		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					accordionItemStyles,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</div>
		);
	},
);

export default AccordionItem;
