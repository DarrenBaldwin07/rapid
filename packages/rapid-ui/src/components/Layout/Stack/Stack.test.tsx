import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Stack from './Stack';

describe('Stack', () => {
	it('should render default correctly', () => {
		const { container } = render(<Stack />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(
			<Stack styles='bg-blue-500' spacing='md' direction='row' />,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with children', () => {
		const { container } = render(
			<Stack styles='bg-red-500' spacing='md'>
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
			</Stack>,
		);
		expect(container).toMatchSnapshot();
	});
});
