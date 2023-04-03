// src/DrawerContext.tsx
import React, { createContext, useContext, useRef, useState } from 'react';

type DrawerContextType = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	btnRef: React.RefObject<HTMLButtonElement>;
};

interface DrawerProviderProps {
	children: React.ReactNode;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(
	undefined,
);

export const useDrawer = () => {
	const context = useContext(DrawerContext);
	if (context === undefined) {
		throw new Error('useDrawer must be used within a DrawerProvider');
	}
	return context;
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const btnRef = useRef<HTMLButtonElement>(null);

	const onOpen = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);

	return (
		<DrawerContext.Provider value={{ isOpen, onOpen, onClose, btnRef }}>
			{children}
		</DrawerContext.Provider>
	);
};
