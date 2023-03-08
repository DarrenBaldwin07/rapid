import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Input from './Input';

describe('Input', () => {
	it('should render default correctly', () => {
		const { container } = render(<Input />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with variant', () => {
		const { container } = render(<Input variant='faded' />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with variant and custom styles', () => {
		const { container } = render(
			<Input styles='bg-green-200' variant='flushed' />,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with variant, custom styles, and placeholder', () => {
		const { container } = render(
			<Input
				styles='bg-red-100'
				variant='invalid'
				placeholder='Placeholder text'
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
