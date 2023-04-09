import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { RapidStyles } from '../../../../utils';
import { ScaleFade } from '../../../transition';
import { useDidClickOutside, useMergeRefs } from '../../../../hooks';
import { useModalContext } from '../useModal';

const RAPID_CLASSNAME = 'rapid-modal-content';
const CONTAINER_CLASS = 'rapid-modal-panel-container';
const DEFAULT_CONTAINER_STYLES =
	'fixed inset-0 flex items-center justify-center';
const DEFAULT_PANEL_STYLES =
	'w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all';

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
	containerStyles?: string;
	children: ReactNode;
	styles?: string;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
	({ styles, containerStyles, children, ...rest }, ref) => {
		const { onClose, enableAnimation } = useModalContext();

		const clickOutsideRef = useDidClickOutside({
			onMatch: () => onClose(),
			enabled: true,
		});

		return (
			<div
				aria-modal='true'
				aria-labelledby='rapid-modal-header'
				aria-describedby='rapid-modal-body'
				className={RapidStyles(
					containerStyles,
					DEFAULT_CONTAINER_STYLES,
					CONTAINER_CLASS,
				)}
			>
				<ScaleFade isEnabled={enableAnimation}>
					<div
						ref={useMergeRefs(ref, clickOutsideRef)}
						{...rest}
						className={RapidStyles(
							styles || rest.className,
							DEFAULT_PANEL_STYLES,
							RAPID_CLASSNAME,
						)}
					>
						{children}
					</div>
				</ScaleFade>
			</div>
		);
	},
);

export default ModalContent;
