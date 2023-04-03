import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import {
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionIcon,
	AccordionContent,
} from '../';

const accordionDefault = (
	<div className='container mx-auto p-4'>
		<Accordion>
			<AccordionItem>
				<AccordionHeader>Item 1</AccordionHeader>
				<AccordionContent>Content for item 1</AccordionContent>
			</AccordionItem>
			<AccordionItem>
				<AccordionHeader>Item 2</AccordionHeader>
				<AccordionContent>Content for item 2</AccordionContent>
			</AccordionItem>
			<AccordionItem>
				<AccordionHeader>Item 3</AccordionHeader>
				<AccordionContent>Content for item 3</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
);

const accordionWithProps = (
	<div className='container mx-auto p-4'>
		<Accordion allowMultiple allowToggle defaultIndexes={[0, 2]}>
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

describe('Accordion', () => {
	it('should render default accordion correctly', () => {
		const { container } = render(accordionDefault);
		expect(container).toMatchSnapshot();
	});

	it('should render accordion with props correctly', () => {
		const { container } = render(accordionWithProps);
		expect(container).toMatchSnapshot();
	});

	it('should render AccordionItem components', () => {
		const { container } = render(accordionDefault);
		const accordionItems = container.querySelectorAll(
			'.rapid-accordion-item',
		);
		expect(accordionItems.length).toBe(3);
	});

	it('should render AccordionHeader components', () => {
		const { container } = render(accordionDefault);
		const accordionHeaders = container.querySelectorAll(
			'.rapid-accordion-header',
		);
		expect(accordionHeaders.length).toBe(3);
	});

	it('should render AccordionContent components', () => {
		const { container } = render(accordionDefault);
		const accordionContents = container.querySelectorAll(
			'.rapid-accordion-content',
		);
		expect(accordionContents.length).toBe(3);
	});
});
