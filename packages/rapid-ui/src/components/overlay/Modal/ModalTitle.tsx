import React from 'react';
import { RapidStyles } from '../../../utils';
import { Dialog as HeadlessModal } from '@headlessui/react';

// This component is not themeable -- we could change this in the future
const RAPID_CLASSNAME = 'rapid-modal-title';

interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	styles?: string;
}

const ModalTitle = React.forwardRef<
	React.ElementRef<typeof HeadlessModal.Title>,
	ModalTitleProps
>(({ styles, ...rest }, ref) => {
	const defaultTitleStyles = 'text-lg font-bold';
	return (
		<HeadlessModal.Title
			className={RapidStyles(
				styles || rest.className,
				defaultTitleStyles,
				RAPID_CLASSNAME,
			)}
			{...rest}
			ref={ref}
		/>
	);
});

ModalTitle.displayName = 'ModalTitle';

export default ModalTitle;
