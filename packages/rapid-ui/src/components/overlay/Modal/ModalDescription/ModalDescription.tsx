import React from 'react';
import { RapidStyles } from '../../../../utils';
import { Dialog as HeadlessModal } from '@headlessui/react';

const RAPID_CLASSNAME = 'rapid-modal-description';

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
}

const ModalDescription = React.forwardRef<
	React.ElementRef<typeof HeadlessModal.Description>,
	ModalBodyProps
>(({ styles, ...rest }, ref) => {
	return (
		<HeadlessModal.Description
			className={RapidStyles(styles || rest.className, RAPID_CLASSNAME)}
			{...rest}
			ref={ref}
		/>
	);
});

ModalDescription.displayName = 'ModalDescription';

export default ModalDescription;
