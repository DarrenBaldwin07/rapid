import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { useModalClose } from '../useModal';
import { RapidStyles } from '../../../../utils';
import { Button } from '../../../primitives';

interface ModalCloseButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-modal-close-button';
const BUTTON_STYLES = 'top-4 right-4 p-2';

const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
	({ styles, ...rest }, ref) => {
		const onClose = useModalClose();

		const handleClick = () => onClose();

		return (
			<Button
				ref={ref}
				{...rest}
				onClick={handleClick}
				className={RapidStyles(
					styles || rest.className,
					BUTTON_STYLES,
					RAPID_CLASSNAME,
				)}
				variant='ghost'
				aria-label='Close Modal'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 384 512'
					height='16px'
					width='16px'
				>
					<path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
				</svg>
			</Button>
		);
	},
);

ModalCloseButton.displayName = 'ModalCloseButton';

export default ModalCloseButton;
