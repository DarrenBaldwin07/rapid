import { HTMLAttributes, forwardRef } from 'react';
import { RapidStyles } from '../../../../utils';

const RAPID_CLASSNAME = 'rapid-modal-description';

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
	styles?: string;
}

const ModalDescription = forwardRef<HTMLDivElement, ModalBodyProps>(
	({ styles, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					RAPID_CLASSNAME,
				)}
			/>
		);
	},
);

export default ModalDescription;
