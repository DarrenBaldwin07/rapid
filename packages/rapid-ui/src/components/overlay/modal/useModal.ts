import { createContext, useContext } from 'react';

interface ModalContextProps {
	open: boolean;
	onClose: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalOpen = (): boolean => {
	const context = useContext(ModalContext);
	if (context === null) {
		throw new Error('useModalOpen must be used within a ModalProvider');
	}
	return context.open;
};

export const useModalClose = (): (() => void) => {
	const context = useContext(ModalContext);
	if (context === null) {
		throw new Error('useModalClose must be used within a ModalProvider');
	}
	return context.onClose;
};
