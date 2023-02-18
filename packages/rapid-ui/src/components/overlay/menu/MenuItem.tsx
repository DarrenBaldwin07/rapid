import { Menu as HeadlessMenu } from '@headlessui/react';


type MenuItemProps = typeof HeadlessMenu.Item;

const MenuItem = ({ ...props }: MenuItemProps) => {
    return (
        <HeadlessMenu.Item
            {...props}
        />
    )
};

export default MenuItem;
