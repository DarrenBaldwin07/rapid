import {
	Menu as HeadlessMenu,
	MenuItemProps as HeadlessMenuItemProps,
} from "@headlessui/react";
import { RapidStyles } from "../../../../utils";

const RAPID_CLASSNAME = "rapid-menu-item";

// TODO: fix this
// @ts-ignore
interface MenuItemProps extends HeadlessMenuItemProps<"div"> {
	styles?: string;
}

const MenuItem = ({ styles, ...rest }: MenuItemProps) => {
	const defaultStyles =
		"p-1 hover:disabled:cursor-not-allowed hover:cursor-pointer";
	return (
		<HeadlessMenu.Item
			className={RapidStyles(
				styles || rest.className,
				defaultStyles,
				RAPID_CLASSNAME
			)}
			{...rest}
		/>
	);
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
