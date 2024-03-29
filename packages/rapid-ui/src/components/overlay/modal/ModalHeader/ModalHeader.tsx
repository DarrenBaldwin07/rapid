import React, { HTMLAttributes, forwardRef } from 'react';
import { RapidStyles } from '../../../../utils';

interface ModalHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-modal-header';
const TITLE_STYLES =
	'text-lg font-semibold p-4 flex justify-between items-center ';

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ styles, children, ...rest }, ref) => {
		return (
			<header
				id={RAPID_CLASSNAME}
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					TITLE_STYLES,
					RAPID_CLASSNAME,
				)}
			>
				{children}
			</header>
		);
	},
);

export default ModalHeader;
