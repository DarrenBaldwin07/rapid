import React from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { RapidStyles } from '../../../utils';
import { MenuButton, MenuItem, MenuItems } from './';


const THEME_CLASSNAME = 'rapid-menu';

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
};

export const HeadlessMenuTyped = Object.assign(HeadlessMenu, {
  Item: HeadlessMenu.Item,
  Button: HeadlessMenu.Button,
  Items: HeadlessMenu.Items,
});

const RapidHeadlessMenu = Object.assign(HeadlessMenuTyped, {
  Item: MenuItem,
  Button: MenuButton,
  Items: MenuItems,
});


// For now, this is just a complete re-export of the Headless Menu component.
// At some point we may come back and refactor into our own component -- for now it works as a wrapper so that we can apply themeing
const Menu = ({ styles, ...props }: MenuProps) => {
  return (
    <RapidHeadlessMenu
        className={RapidStyles(styles, THEME_CLASSNAME)}
        as='div'
        {...props}
    />
  )
}

export default Menu;
