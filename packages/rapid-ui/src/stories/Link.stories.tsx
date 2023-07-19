import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from '../';

export default {
  title: 'Components/primitives/Link',
  component: Link,
  argTypes: {
    as: {
      control: 'select',
      options: ['a'],
      description: 'The HTML element used for the Link component.',
    },
    styles: {
      control: 'link',
      description: 'Additional styles for the link component.',
    },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => (
  <Link {...args}>Hello World!</Link>
);

export const Primary = Template.bind({});
