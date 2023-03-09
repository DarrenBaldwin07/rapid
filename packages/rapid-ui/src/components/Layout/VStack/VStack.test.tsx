import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import VStack from './VStack';

describe('VStack', () => {
	it('should render default correctly', () => {
		const { container } = render(<VStack />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(<VStack styles='p-4' spacing='sm' />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with children', () => {
		const { container } = render(
			<VStack styles='bg-red-500' spacing='md'>
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
			</VStack>,
		);
		expect(container).toMatchSnapshot();
	});
});
