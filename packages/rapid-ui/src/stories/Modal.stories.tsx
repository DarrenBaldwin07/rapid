import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState, createRef } from 'react';
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Text,
	Button,
	ModalContent,
} from '..';

export default {
	title: 'Components/overlay/Modal',
	component: Modal,
	argTypes: {
		open: {
			control: { type: 'boolean' },
			description: 'Whether the modal is open.',
		},
		onClose: {
			action: 'onClose',
			description: 'Function to close the modal.',
		},
		initialFocus: {
			description: 'Ref of the initial element to be focused.',
		},
		enableAnimation: {
			control: { type: 'boolean' },
			description:
				'Whether to enable the default animation for the modal.',
		},
		styles: {
			control: {
				type: 'string',
			},
			description: 'Custom styles for the Skeleton component.',
		},
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = ({ open }) => {
	const [isOpen, setIsOpen] = useState(open);
	const modalCloseBttn = createRef<HTMLButtonElement>();

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Delete Account</Button>

			<Modal open={isOpen} onClose={handleClose}>
				<ModalContent>
					<ModalHeader>Delete Account</ModalHeader>
					<ModalBody>
						<Text styles='text-secondaryGrey'>
							Are you sure you want to delete your account? All of
							your data will be permanently removed. This action
							cannot be undone.
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							ref={modalCloseBttn}
							variant='outline'
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button onClick={handleClose}>Deactivate</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	open: false,
};
