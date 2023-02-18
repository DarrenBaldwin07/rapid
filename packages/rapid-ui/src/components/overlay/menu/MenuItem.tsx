import { Menu as HeadlessMenu } from '@headlessui/react';
import { ComponentType } from 'react';
import { HeadlessMenuTyped } from './Menu';
import { RapidStyles } from '../../../utils';

type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;
type MenuItemType = ExtractProps<typeof HeadlessMenuTyped.Item>;

// @ts-ignore
interface MenuItemProps extends MenuItemType {
	styles?: string;
}

const MenuItem = ({
	styles,
	...props
}: ExtractProps<typeof HeadlessMenuTyped.Item>) => {
	const defaultStyles = 'p-1 hover:disabled:cursor-not-allowed hover:';
	return (
		<HeadlessMenu.Item
			className={RapidStyles(styles, defaultStyles)}
			{...props}
		/>
	);
};

export default MenuItem;
