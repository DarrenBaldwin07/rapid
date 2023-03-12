import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Flex from './Flex';

describe('Flex', () => {
	it('should render default correctly', () => {
		const { container } = render(<Flex />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with custom styles and children', () => {
		const { container } = render(
			<Flex styles='justify-center items-center space-x-2'>
				<div>Flex 1</div>
				<div>Flex 2</div>
				<div>Flex 3</div>
			</Flex>,
		);
		expect(container).toMatchSnapshot();
	});
});
