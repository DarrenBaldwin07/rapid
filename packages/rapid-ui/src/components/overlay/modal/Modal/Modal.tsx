import React, {
	useEffect,
	useMemo,
	HTMLAttributes,
	RefObject,
	forwardRef,
	KeyboardEvent,
	useCallback,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { ModalOverlay } from '../';
import { Portal } from '../../../utilities/portal';
import { ModalContext } from '../useModal';
import { AnimatePresence } from 'framer-motion';

const RAPID_CLASSNAME = 'rapid-modal';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	open: boolean;
	onClose: () => void;
	initialFocus?: RefObject<HTMLElement>;
	enableAnimation?: boolean;
	zIndex?: number;
	fadeAnimation?: {
		transition?: {
			exit?: {};
			enter?: {};
		};
	};
	enableOverlay?: boolean;
	styles?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
			open = false,
			onClose,
			initialFocus,
			enableAnimation = true,
			zIndex = 40,
			fadeAnimation,
			enableOverlay = true,
			styles,
			children,
			...rest
		},
		ref,
	) => {
		useEffect(() => {
			if (open) {
				if (initialFocus && initialFocus.current) {
					initialFocus.current.focus();
				} else {
					const firstFocusableElement = document.querySelector(
						`.${RAPID_CLASSNAME}`,
					) as HTMLElement;
					if (firstFocusableElement) {
						firstFocusableElement.focus({
							preventScroll: true,
						});
					}
				}
			}
		}, [open, initialFocus]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent<HTMLDivElement>) => {
				if (e.key === 'Escape') {
					onClose();
				}
			},
			[onClose],
		);

		const contextValue = useMemo(
			() => ({ open, onClose, enableAnimation, zIndex }),
			[open, onClose, enableAnimation, zIndex],
		);

		return (
			<AnimatePresence>
				{open ? (
					<Portal>
						<ModalContext.Provider value={contextValue}>
							<div
								ref={ref}
								{...rest}
								role='dialog'
								tabIndex={-1}
								data-focus-guard
								onKeyDown={handleKeyDown}
								style={{ position: 'relative', zIndex }}
								className={RapidStyles(
									styles || rest.className,
									RAPID_CLASSNAME,
								)}
							>
								{enableOverlay ? (
									<ModalOverlay
										transition={fadeAnimation?.transition}
									/>
								) : null}
								{children}
							</div>
						</ModalContext.Provider>
					</Portal>
				) : null}
			</AnimatePresence>
		);
	},
);

export default Modal;
