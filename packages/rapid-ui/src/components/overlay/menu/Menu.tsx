import React, { forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { RapidStyles } from '../../../utils';
import { createVariant } from '../../../theme';

const THEME_CLASSNAMES = {
    menuButton: 'rapid-menu-button',
};

export const menuButtonVariant = createVariant(
    {
        baseStyle: 'p-3 transition-all ease-out duration-300 outline-none inline-flex items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
        variants: {
            default: 'bg-main hover:bg-hoverMain text-white',
            outline: 'bg-white hover:bg-hoverWhite border border-lightGrey',
        },
        sizes: {},
        defaultProps: {
            variant: 'default',
        },
    }
);

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styles?: string;
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ styles, ...rest }, ref) => {
    return (
        <HeadlessMenu.Button
            ref={ref}
            {...rest}
            className={RapidStyles(styles, THEME_CLASSNAMES.menuButton)}
        >
            MenuButton
        </HeadlessMenu.Button>
    )
});

export default MenuButton;
