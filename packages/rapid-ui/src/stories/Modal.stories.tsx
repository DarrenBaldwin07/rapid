import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import {
	Modal,
	// ModalOverlay,
	ModalBody,
	ModalFooter,
	ModalContent,
	ModalHeader,
	Text,
	Button,
} from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/overlay/Modal',
	component: Modal,
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (_: any) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Open</Button>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				{/* <ModalOverlay /> */}
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
							variant='outline'
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={() => setIsOpen(false)}>
							Deactivate
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
