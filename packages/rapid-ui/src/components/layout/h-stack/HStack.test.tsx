import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import HStack from './HStack';

describe('HStack', () => {
	it('should render default correctly', () => {
		const { container } = render(<HStack />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(<HStack styles='p-4' spacing='sm' />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with children', () => {
		const { container } = render(
			<HStack styles='bg-red-500' spacing='md'>
				<div>
					<p>Hello world!</p>
				</div>
				<div>
					<p>Hello world!</p>
				</div>
				<div>
					<p>Hello world!</p>
				</div>
				<div>
					<p>Hello world!</p>
				</div>
			</HStack>,
		);
		expect(container).toMatchSnapshot();
	});
});
