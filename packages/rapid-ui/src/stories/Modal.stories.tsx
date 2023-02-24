import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import {
    Modal,
	ModalOverlay,
	ModalContent,
	ModalTitle,
    Text,
    Button
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
                <ModalOverlay />
                <ModalContent>
                    <ModalTitle>Delete Account</ModalTitle>

                    <Text styles='mt-2 text-secondaryGrey'>
                        Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
                    </Text>

                    <Button styles='mt-4 mr-2' onClick={() => setIsOpen(false)}>Delete</Button>
                    <Button styles='mt-4' variant='outline' onClick={() => setIsOpen(false)}>Cancel</Button>
                </ModalContent>
            </Modal>
        </>

    );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
