import React, { useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDrawer, DrawerProvider } from './drawerContext';
import { Transition } from '@headlessui/react';

interface DrawerProps {
	children: ReactNode;
	placement: 'left' | 'top' | 'right' | 'bottom';
	isOpen: boolean;
	onClose: () => void;
}

interface DrawerWrapperProps {
	children: ReactNode;
}

interface DrawerSubcomponentProps {
	children: ReactNode;
}

const drawerOverlayStyle = 'fixed inset-0 bg-black bg-opacity-60';

const dialogContainerStyle =
	'fixed inset-0 flex justify-center items-center z-40';

const drawerDialogStyle = (placement: 'left' | 'top' | 'right' | 'bottom') => `
  z-50 relative ${
		placement === 'left' || placement === 'right' ? 'h-full' : 'max-h-full'
  } overflow-hidden bg-white dark:bg-gray-700 shadow-lg dark:shadow-dark-lg
`;

const drawerHeaderStyle =
	'border-b border-gray-200 px-6 py-4 font-semibold text-xl';

const drawerCloseButtonStyle = 'absolute top-2 right-3';

const drawerBodyStyle = 'px-6 py-2 flex-1 overflow-auto';

const drawerFooterStyle = 'border-t border-gray-200 px-6 py-4';

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({ children }) => {
	return <DrawerProvider>{children}</DrawerProvider>;
};

const DrawerContents: React.FC<DrawerProps> = ({
	children,
	placement,
	isOpen,
	onClose,
}) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	return (
		<Transition show={isOpen}>
			<div className={dialogContainerStyle}>
				<div
					ref={wrapperRef}
					className={drawerDialogStyle(placement)}
					onClick={(e) => {
						if (wrapperRef.current === e.target) {
							onClose();
						}
					}}
				>
					{children}
				</div>
			</div>
		</Transition>
	);
};

export const Drawer = ({
	children,
	placement,
	isOpen,
	onClose,
}: DrawerProps) => {
	return (
		<DrawerWrapper>
			{createPortal(
				<DrawerContents
					placement={placement}
					isOpen={isOpen}
					onClose={onClose}
				>
					{children}
				</DrawerContents>,
				document.body,
			)}
		</DrawerWrapper>
	);
};

export const DrawerHeader = ({ children }: DrawerSubcomponentProps) => {
	return <div className={drawerHeaderStyle}>{children}</div>;
};

export const DrawerCloseButton = () => {
	const { onClose } = useDrawer();
	return (
		<button
			className={`${drawerCloseButtonStyle} focus:outline-none focus:ring-2 focus:ring-blue-500`}
			onClick={onClose}
		>
			<span className='sr-only'>Close drawer</span>
			&times;
		</button>
	);
};

export const DrawerBody = ({ children }: DrawerSubcomponentProps) => {
	return <div className={drawerBodyStyle}>{children}</div>;
};

export const DrawerFooter = ({ children }: DrawerSubcomponentProps) => {
	return <div className={drawerFooterStyle}>{children}</div>;
};

export const DrawerOverlay = () => {
	return <div className={drawerOverlayStyle} />;
};

const drawerContentStyle =
	'relative flex flex-grow flex-col bg-white dark:bg-gray-700';

export const DrawerContent = ({ children }: DrawerSubcomponentProps) => {
	return <div className={drawerContentStyle}>{children}</div>;
};
