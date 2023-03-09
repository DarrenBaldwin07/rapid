import React from 'react';
import { RapidStyles } from '../../../../utils';
import { Dialog as HeadlessModal } from '@headlessui/react';
import { ScaleFade } from '../../../Transition';

const RAPID_CLASSNAME = 'rapid-modal-content';

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
	containerStyles?: string;
}

const ModalContent = React.forwardRef<
	React.ElementRef<typeof HeadlessModal>,
	ModalContentProps
>(({ styles, containerStyles, ...rest }, ref) => {
	const defaultPanelStyles =
		'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all';
	const defaultContainerStyles =
		'fixed inset-0 flex items-center justify-center p-4';
	return (
		<div
			className={RapidStyles(
				containerStyles || defaultContainerStyles,
				'rapid-modal-panel-container',
			)}
		>
			<ScaleFade>
				<HeadlessModal.Panel
					className={RapidStyles(
						styles || rest.className,
						defaultPanelStyles,
						RAPID_CLASSNAME,
					)}
					{...rest}
					ref={ref}
					as='div'
				/>
			</ScaleFade>
		</div>
	);
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
