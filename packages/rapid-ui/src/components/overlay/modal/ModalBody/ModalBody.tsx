import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { RapidStyles } from '../../../../utils';

const RAPID_CLASSNAME = 'rapid-modal-footer';
const BODY_STYLES = 'px-6 py-2 flex-1';

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	styles?: string;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
	({ styles, children, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				className={RapidStyles(
					styles || rest.className,
					BODY_STYLES,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</div>
		);
	},
);

export default ModalBody;
