import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { useModalClose } from '../useModal';
import { RapidStyles } from '../../../../utils';

const RAPID_CLASSNAME = 'rapid-modal-close-button';
const BUTTON_STYLES =
	'absolute top-4 right-4 cursor-pointer border-none bg-transparent text-lg text-black transition-colors duration-200 hover:text-gray-600 focus:outline-none';
const SVG_STYLES =
	'inline-block h-4 w-4 fill-current align-middle text-current';

interface ModalCloseButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	styles?: string;
}

const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
	({ styles, ...rest }, ref) => {
		const onClose = useModalClose();

		const handleClick = () => onClose();

		return (
			<button
				ref={ref}
				{...rest}
				onClick={handleClick}
				className={RapidStyles(
					styles || rest.className,
					BUTTON_STYLES,
					RAPID_CLASSNAME,
				)}
				aria-label='Close Modal'
			>
				<svg
					viewBox='0 0 24 24'
					focusable='false'
					aria-hidden='true'
					className={SVG_STYLES}
				>
					<path d='M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561,.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z'></path>
				</svg>
			</button>
		);
	},
);

ModalCloseButton.displayName = 'ModalCloseButton';

export default ModalCloseButton;
