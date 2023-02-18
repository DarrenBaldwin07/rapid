import React from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { RapidStyles } from '../../../utils';

const THEME_CLASSNAME = 'rapid-menu';

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
};

export const HeadlessMenuTyped = Object.assign(HeadlessMenu, {
  Item: HeadlessMenu.Item,
  Button: HeadlessMenu.Button,
  Items: HeadlessMenu.Items,
});

// For now, this is just a complete re-export of the Headless Menu component.
// At some point we may come back and refactor into our own component -- for now it works as a wrapper so that we can apply themeing
const Menu = ({ styles, ...props }: MenuProps) => {
  return (
    <HeadlessMenu
        className={RapidStyles(styles, THEME_CLASSNAME)}
        as='div'
        {...props}
    />
  )
}

export default Menu;
