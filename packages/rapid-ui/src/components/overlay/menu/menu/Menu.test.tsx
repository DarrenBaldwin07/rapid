import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Menu, MenuItem, MenuItems, MenuButton } from '..';

describe('Menu', () => {
	it('should render default correctly', () => {
		const { container } = render(
			<Menu>
				<MenuItems>
					<MenuItem />
				</MenuItems>
				<MenuButton />
			</Menu>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(
			<Menu styles='bg-blue-500'>
				<MenuItems styles='bg-blue-500'>
					<MenuItem styles='bg-blue-500'>Menu Item</MenuItem>
					<MenuItem styles='bg-blue-500'>Menu Item</MenuItem>
				</MenuItems>
				<MenuButton styles='bg-blue-500' />
			</Menu>,
		);
		expect(container).toMatchSnapshot();
	});
});
