import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { RapidStyles } from '../../../../utils';

const RAPID_CLASSNAME = 'rapid-modal-body';
const BODY_STYLES = 'p-4 flex-1'; // px-6 py-2

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	styles?: string;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
	({ styles, children, ...rest }, ref) => {
		return (
			<div
				id={RAPID_CLASSNAME}
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
