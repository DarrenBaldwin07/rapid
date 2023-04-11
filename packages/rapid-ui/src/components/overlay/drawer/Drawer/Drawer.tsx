import React, { useMemo, HTMLAttributes, RefObject, forwardRef } from 'react';
import { RapidStyles } from '../../../../utils';
import { Modal } from '../../modal';
import { DrawerContext } from '../useDrawer';

const RAPID_CLASSNAME = 'rapid-drawer';

export type DrawerDirections = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSizes = 'sm' | 'md' | 'lg' | 'xl' | 'full';
interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
	open: boolean;
	onClose: () => void;
	direction?: DrawerDirections;
	size?: DrawerSizes;
	enableAnimation?: boolean;
	initialFocus?: RefObject<HTMLElement>;
	zIndex?: number;
	styles?: string;
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
	const {
		open,
		onClose,
		direction = 'right',
		size = 'md',
		enableAnimation = true,
		initialFocus,
		zIndex,
		styles,
		children,
		...rest
	} = props;

	const contextValue = useMemo(
		() => ({ open, direction, onClose, size, enableAnimation, zIndex }),
		[open, direction, onClose, size, enableAnimation, zIndex],
	);

	return (
		<DrawerContext.Provider value={contextValue}>
			<Modal
				ref={ref}
				{...rest}
				open={open}
				onClose={onClose}
				enableAnimation={false}
				className={RapidStyles(
					styles || rest.className,
					RAPID_CLASSNAME,
				)}
				zIndex={zIndex}
			>
				{children}
			</Modal>
		</DrawerContext.Provider>
	);
});

export default Drawer;

export {
	ModalBody as DrawerBody,
	ModalCloseButton as DrawerCloseButton,
	ModalFooter as DrawerFooter,
	ModalHeader as DrawerHeader,
	ModalOverlay as DrawerOverlay,
} from '../../modal';
