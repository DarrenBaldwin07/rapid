import { Menu as HeadlessMenu } from '@headlessui/react';
import React from 'react';
import { RapidStyles } from '../../../utils';


const THEME_CLASSNAME = 'rapid-menu-items';

interface MenuItemsProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
}

const MenuItems = ({ styles, ...rest }: MenuItemsProps) => {
    const defaultStyles = 'bg-white border border-lightGrey absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none';
    return (
        <HeadlessMenu.Items
            {...rest}
            className={RapidStyles(styles, defaultStyles, THEME_CLASSNAME)}
        />
    )
};

export default MenuItems;
