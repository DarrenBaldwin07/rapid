import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import { RapidStyles } from '../../../../utils';

export const RAPID_CLASSNAME = 'rapid-accordion-item';

interface AccordionItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactNode;
	styles?: string;
}

const ACDN_ITEM_STYLES = 'border-b';

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, styles, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					ACDN_ITEM_STYLES,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</div>
		);
	},
);

export default AccordionItem;
