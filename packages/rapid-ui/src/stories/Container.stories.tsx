import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '../';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/Layout/Container',
	component: Container,
} as ComponentMeta<typeof Container>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Container> = (_: any) => (
	<Container>
        <div style={{backgroundColor: 'red', height: '50px'}} />
    </Container>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
