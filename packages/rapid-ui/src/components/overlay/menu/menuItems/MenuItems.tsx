import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { RapidStyles } from '../../../../utils';
import { ScaleFade } from '../../../Transition';

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
		'bg-white border border-lightGrey mt-2 rounded-lg shadow-lg absolute z-10 flex flex-col space-y-2 py-1 w-56';

	return (
		<Transition
			as={Fragment}
			leave='transition ease-in duration-100'
			leaveFrom='opacity-100 scale-100'
			leaveTo='opacity-0 scale-95'
		>
			<HeadlessMenu.Items
				{...rest}
				className={RapidStyles(wrapperStyles, '', RAPID_CLASSNAME)}
				ref={ref}
			>
				<ScaleFade
					styles={RapidStyles(
						styles || rest.className,
						defaultStyles,
					)}
					exitAnimation='exit'
				>
					{children}
				</ScaleFade>
			</HeadlessMenu.Items>
		</Transition>
	);
});

MenuItems.displayName = 'MenuItems';

export default MenuItems;
