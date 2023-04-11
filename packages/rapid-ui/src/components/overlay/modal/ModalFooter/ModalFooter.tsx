import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { RapidStyles } from '../../../../utils';

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-modal-footer';
const FOOTER_STYLES = 'flex items-center justify-end p-4';

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
	({ styles, children, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				className={RapidStyles(
					styles || rest.className,
					FOOTER_STYLES,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</div>
		);
	},
);

export default ModalFooter;
