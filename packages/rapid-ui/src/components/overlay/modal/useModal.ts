import { createContext, useContext } from 'react';

interface ModalContextProps {
	open: boolean;
	onClose: () => void;
	enableAnimation: boolean;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalContext = (): ModalContextProps => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModalContext must be used within a ModalProvider');
	}
	return context;
};

export const useModalOpen = (): boolean => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModalOpen must be used within a ModalProvider');
	}
	return context.open;
};

export const useModalClose = (): (() => void) => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModalClose must be used within a ModalProvider');
	}
	return context.onClose;
};
