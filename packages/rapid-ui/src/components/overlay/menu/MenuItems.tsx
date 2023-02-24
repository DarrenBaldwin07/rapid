import { Menu as HeadlessMenu } from '@headlessui/react';
import React from 'react';
import { RapidStyles } from '../../../utils';

import { ScaleFade } from '../../transition';

const RAPID_CLASSNAME = 'rapid-menu-items';

interface MenuItemsProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
	wrapperStyles?: string;
}

const MenuItems = React.forwardRef<
	React.ElementRef<typeof HeadlessMenu.Items>,
	MenuItemsProps
>(({ styles, children, wrapperStyles, ...rest }, ref) => {
	// Simple default styles for the menu items
	const defaultStyles =
		'bg-white transition transform border border-lightGrey mt-2 rounded-lg shadow-lg absolute z-10 flex flex-col space-y-2 py-1 w-56';

	return (
		<HeadlessMenu.Items
			{...rest}
			className={RapidStyles(wrapperStyles, RAPID_CLASSNAME)}
			ref={ref}
		>
			<ScaleFade
				styles={RapidStyles(styles || rest.className, defaultStyles)}
			>
				{children}
			</ScaleFade>
		</HeadlessMenu.Items>
	);
});

MenuItems.displayName = 'MenuItems';

export default MenuItems;
