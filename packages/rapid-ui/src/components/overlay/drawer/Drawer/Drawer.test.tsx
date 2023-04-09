import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	DrawerCloseButton,
} from '../';

describe('Modal', () => {
	it('should render default correctly', () => {
		const { container } = render(
			<Drawer
				open
				direction='right'
				onClose={() => {
					console.log('closing drawer');
				}}
				size='md'
			>
				<DrawerContent>
					<DrawerHeader>
						<text>Drawer Title</text>
						<DrawerCloseButton />
					</DrawerHeader>
					<DrawerBody>
						<text>
							This is the drawer content. You can add any elements
							here to display inside the drawer.
						</text>
					</DrawerBody>
					<DrawerFooter>
						<button>Close Drawer</button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(
			<Drawer styles='bg-green' open onClose={() => {}} />,
		);
		expect(container).toMatchSnapshot();
	});
});
