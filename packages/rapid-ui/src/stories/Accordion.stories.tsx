import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionHeader,
	AccordionIcon,
} from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'components/disclosure/accordion',
	component: Accordion,
} as ComponentMeta<typeof Accordion>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = (_: any) => (
	<div className='container mx-auto p-4'>
		<Accordion>
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

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
