import { Menu as HeadlessMenu } from '@headlessui/react';
import { HeadlessMenuTyped } from './Menu';
import { RapidStyles } from '../../../utils';
import type { ExtractProps } from '../../../types';

const RAPID_CLASSNAME = 'rapid-menu-item';

type MenuItemType = ExtractProps<typeof HeadlessMenuTyped.Item>;

// TODO: fix this
// @ts-ignore
interface MenuItemProps extends MenuItemType {
	styles?: string;
}

const MenuItem = ({ styles, ...rest }: MenuItemProps) => {
	const defaultStyles =
		'p-1 hover:disabled:cursor-not-allowed hover:cursor-pointer';
	return (
		<HeadlessMenu.Item
			className={RapidStyles(
				styles || rest.className,
				defaultStyles,
				RAPID_CLASSNAME,
			)}
			{...rest}
		/>
	);
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
