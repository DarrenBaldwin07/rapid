import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '../';

describe('Modal', () => {
	it('should render default correctly', () => {
		const { container } = render(
			<Modal open={true} onClose={() => {}}>
				<ModalContent>
					<ModalHeader>Delete Account</ModalHeader>
					<ModalBody>
						<text>
							Are you sure you want to delete your account? All of
							your data will be permanently removed. This action
							cannot be undone.
						</text>
					</ModalBody>
					<ModalFooter>
						<button>Cancel</button>
						<button>Deactivate</button>
					</ModalFooter>
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
