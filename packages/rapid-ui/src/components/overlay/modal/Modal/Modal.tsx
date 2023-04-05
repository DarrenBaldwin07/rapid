import React, {
	ElementType,
	useEffect,
	useMemo,
	HTMLAttributes,
	MutableRefObject,
	forwardRef,
	KeyboardEvent,
	useCallback,
} from 'react';
import { RapidStyles } from '../../../../utils';
import { ModalOverlay } from '../';
// import { useCombinedRefs } from '../../../../hooks';
import { Portal } from '../../../utilities/portal';
import { ModalContext } from '../useModal';

const RAPID_CLASSNAME = 'rapid-modal';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	styles?: string;
	open: boolean;
	onClose: () => void;
	initialFocus?: MutableRefObject<HTMLElement>;
	as?: ElementType<any>;
	static?: boolean;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ styles, open, onClose, initialFocus, children, ...rest }, ref) => {
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
			() => ({ open, onClose }),
			[open, onClose],
		);

		return (
			<>
				{open ? (
					<Portal className={'absolute'}>
						<ModalContext.Provider value={contextValue}>
							<div
								ref={ref}
								{...rest}
								role='dialog'
								aria-modal='true'
								tabIndex={-1}
								data-focus-guard
								onKeyDown={handleKeyDown}
								className={RapidStyles(
									styles || rest.className,
									RAPID_CLASSNAME,
								)}
							>
								<ModalOverlay />
								{children}
							</div>
						</ModalContext.Provider>
					</Portal>
				) : null}
			</>
		);
	},
);

export default Modal;
