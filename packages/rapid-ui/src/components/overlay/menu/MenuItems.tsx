import { Menu as HeadlessMenu } from '@headlessui/react';
import React from 'react';
import { RapidStyles } from '../../../utils';


const THEME_CLASSNAME = 'rapid-menu-items';

interface MenuItemsProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
}


const MenuButton = ({ styles, ...rest }: MenuItemsProps) => {
    return (
        <HeadlessMenu.Items
            {...rest}
            className={RapidStyles(styles, THEME_CLASSNAME)}
        />
    )
};

export default MenuButton;
