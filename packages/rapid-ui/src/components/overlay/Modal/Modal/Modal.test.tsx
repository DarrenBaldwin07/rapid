import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalDescription,
	ModalTitle,
} from '../';

describe('Modal', () => {
	it('should render default correctly', () => {
		const { container } = render(
			<Modal open={true} onClose={() => {}}>
				<ModalOverlay />
				<ModalContent styles='flex flex-col'>
					<ModalTitle>Delete Account</ModalTitle>

					<p>
						Are you sure you want to delete your account? All of
						your data will be permanently removed. This action
						cannot be undone.
					</p>
					<div className='self-end'></div>
				</ModalContent>
			</Modal>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(
			<Modal styles='bg-green' open={true} onClose={() => {}} />,
		);
		expect(container).toMatchSnapshot();
	});
});
