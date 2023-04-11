import React, { forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import { RapidStyles } from '../../../../utils';

interface AccordionItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactNode;
	styles?: string;
}

export const RAPID_CLASSNAME = 'rapid-accordion-item';
const ACC_HEADER_DIV_STYLES = 'border-b';

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, styles, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					ACC_HEADER_DIV_STYLES,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</div>
		);
	},
);

export default AccordionItem;
