import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu, MenuButton, MenuItem, MenuItems } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/overlay/Menu',
	component: Menu,
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = (_: any) => (
    <Menu>
        <MenuButton variant='outline'>More</MenuButton>
        <MenuItems>
            <MenuItem>
                {({ active }: any) => (
                    <div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2`}>
                        <a
                            href='/account-settings'
                        >
                            Profile
                        </a>
                    </div>
                )}
            </MenuItem>
            <MenuItem>
                {({ active }: any) => (
                    <div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2` }>
                        <a
                            href='/account-settings'
                        >
                            Settings
                        </a>
                    </div>
                )}
            </MenuItem>
            <MenuItem>
                {({ active }: any) => (
                    <div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2`}>
                        <a
                            href='/account-settings'
                        >
                            Documentation
                        </a>
                    </div>
                )}
            </MenuItem>
            <MenuItem>
                {({ active }: any) => (
                    <div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2`}>
                        <a
                            href='/account-settings'
                        >
                            New Post
                        </a>
                    </div>
                )}
            </MenuItem>
        </MenuItems>
    </Menu>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
