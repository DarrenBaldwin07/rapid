import React, { ElementType } from 'react';
import { RapidStyles } from '../../../utils';
import { Dialog } from '@headlessui/react';

// TODO: HeadlessUI still does not export component prop types -- later on we want to clean this up once they do!
// See this issue: https://github.com/tailwindlabs/headlessui/issues/1394

const RAPID_CLASSNAME = 'rapid-modal';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
	open: boolean;
	onClose: () => void;
	initialFocus?: React.MutableRefObject<HTMLElement>;
	as?: ElementType<any>;
	static?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
	({ styles, ...rest }, ref) => {
		return (
			<Dialog
				className={RapidStyles(
					styles || rest.className,
					RAPID_CLASSNAME,
				)}
				{...rest}
				ref={ref}
			/>
		);
	},
);

Modal.displayName = 'Modal';

export default Modal;
