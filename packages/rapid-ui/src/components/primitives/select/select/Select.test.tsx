import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Select, Option, SelectIcon } from '..';

describe('Select', () => {
	it('should render default correctly', () => {
		const { container } = render(
			<Select styles='w-56'>
				<Option value='Test'>Test</Option>
				<Option value='Test'>Test</Option>
				<SelectIcon />
			</Select>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with variant', () => {
		const { container } = render(<Select variant='flushed' />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with variant and children', () => {
		const { container } = render(
			<Select variant='flushed' icon={<SelectIcon />}>
				<Option>Some text</Option>
			</Select>,
		);
		expect(container).toMatchSnapshot();
	});
});
