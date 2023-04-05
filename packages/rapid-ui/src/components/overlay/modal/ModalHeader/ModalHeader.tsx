import React, { HTMLAttributes, forwardRef } from 'react';
import { RapidStyles } from '../../../../utils';
import { ModalCloseButton } from '../ModalCloseButton';

const RAPID_CLASSNAME = 'rapid-modal-title';
const TITLE_STYLES = 'text-lg font-semibold p-4';

interface ModalHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
	styles?: string;
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ styles, children, ...rest }, ref) => {
		return (
			<h2
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					TITLE_STYLES,
					RAPID_CLASSNAME,
				)}
			>
				{children}
				<ModalCloseButton />
			</h2>
		);
	},
);

export default ModalHeader;
