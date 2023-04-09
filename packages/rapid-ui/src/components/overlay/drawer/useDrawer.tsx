import React, { createContext, useContext } from 'react';
import { DrawerDirections, DrawerSizes } from './Drawer';

type DrawerContextType = {
	open: boolean;
	onClose: () => void;
	size: DrawerSizes;
	direction: DrawerDirections;
	enableAnimation: boolean;
	// finalFocus?: MutableRefObject<HTMLElement>;
};

export const DrawerContext = createContext<DrawerContextType | undefined>(
	undefined,
);

export const useDrawerContext = () => {
	const context = useContext(DrawerContext);
	if (context === undefined) {
		throw new Error('useDrawer must be used within a DrawerProvider');
	}
	return context;
};
