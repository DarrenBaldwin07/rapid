import React, { HTMLAttributes, forwardRef, useEffect } from 'react';
import { RapidStyles } from '../../../../utils';
import { Fade } from '../../../transition';

const RAPID_CLASSNAME = 'rapid-modal-overlay';
const OVERLAY_STYLES =
	'fixed inset-0 bg-black bg-opacity-50 top-0 left-0 w-full h-full flex justify-center items-center';
interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
	styles?: string;
}

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
	({ styles, ...rest }, ref) => {
		// add css to body element to prevent scrolling when modal is open
		useEffect(() => {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = 'auto';
			};
		}, []);

		return (
			<Fade initialOpacity={0.75}>
				<div
					ref={ref}
					{...rest}
					className={RapidStyles(
						styles || rest.className,
						OVERLAY_STYLES,
						RAPID_CLASSNAME,
					)}
					aria-hidden='true'
				/>
			</Fade>
		);
	},
);

export default ModalOverlay;
