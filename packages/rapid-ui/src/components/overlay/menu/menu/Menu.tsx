import React from 'react';
import {
	Menu as HeadlessMenu,
	MenuProps as HeadlessMenuProps,
} from '@headlessui/react';
import { RapidStyles } from '../../../../utils';

type MenuProps = {
	styles?: string;
} & HeadlessMenuProps<'div'>;

const RAPID_CLASSNAME = 'rapid-menu';

// For now, this is just a complete re-export of the Headless Menu component.
// At some point we may come back and refactor into our own component -- for now it works as a wrapper so that we can apply themeing
const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
	({ styles, ...rest }, ref) => {
		const defaultStyles = 'relative inline-block text-left';
		return (
			<HeadlessMenu
				className={RapidStyles(
					styles || (rest.className as string),
					defaultStyles,
					RAPID_CLASSNAME,
				)}
				as='div'
				{...rest}
				ref={ref}
			/>
		);
	},
);

Menu.displayName = 'Menu';

export default Menu;
