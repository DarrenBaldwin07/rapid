import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionHeader,
	AccordionIcon,
} from '..';

export default {
	title: 'components/disclosure/accordion',
	component: Accordion,
	argTypes: {
		allowMultiple: {
			description:
				'Whether to allow multiple items to be open at the same time.',
			control: { type: 'boolean' },
		},
		allowToggle: {
			description:
				'Whether to allow items to be closed if they are already open.',
			control: { type: 'boolean' },
		},
		defaultIndexes: {
			description:
				'The indexes of the items that should be open by default.',
			control: { type: 'array' },
		},
		children: {
			description:
				'The items to be rendered inside the Accordion component.',
			control: { type: null },
		},
		styles: {
			description:
				'Custom styles to be applied to the Accordion component.',
			control: { type: 'text' },
		},
	},
} as ComponentMeta<typeof Accordion>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = (args) => (
	<div className='container mx-auto p-4'>
		<Accordion {...args}>
			<AccordionItem>
				<AccordionHeader>
					Item 1<AccordionIcon />
				</AccordionHeader>
				<AccordionContent>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem>
				<AccordionHeader>
					Item 2<AccordionIcon />
				</AccordionHeader>
				<AccordionContent>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem>
				<AccordionHeader>
					Item 3<AccordionIcon />
				</AccordionHeader>
				<AccordionContent>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
);

const DefaultAccordion = Template.bind({});
DefaultAccordion.args = {};

const AllowMultipleAccordion = Template.bind({});
AllowMultipleAccordion.args = { allowMultiple: true };
AllowMultipleAccordion.parameters = {
	controls: { matchers: { color: /(primary|secondary|tertiary)/i } },
};

const AllowToggleAccordion = Template.bind({});
AllowToggleAccordion.args = { allowToggle: true };
AllowToggleAccordion.parameters = {
	controls: { matchers: { color: /(primary|secondary|tertiary)/i } },
};

const DefaultIndexesAccordion = Template.bind({});
DefaultIndexesAccordion.args = { defaultIndexes: [0, 2] };
DefaultIndexesAccordion.parameters = {
	controls: { matchers: { color: /(primary|secondary|tertiary)/i } },
};

const WithCustomStylesAccordion = Template.bind({});
WithCustomStylesAccordion.args = { styles: 'bg-red-200' };
WithCustomStylesAccordion.parameters = {
	controls: { matchers: { color: /(primary|secondary|tertiary)/i } },
};

export const Primary = DefaultAccordion;
export const AllowMultiple = AllowMultipleAccordion;
export const AllowToggle = AllowToggleAccordion;
export const DefaultIndexes = DefaultIndexesAccordion;
export const WithCustomStyles = WithCustomStylesAccordion;
