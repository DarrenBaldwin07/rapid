import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Switch from './Switch';

describe('Switch', () => {
	it('should render default correctly', () => {
		const { container } = render(<Switch enabled={true} />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(
			<Switch
				styles='p-4'
				ariaLabel='Some label'
				enabled={false}
				size='sm'
				variant='this is an undeclared variant name'
				enabledStyles='bg-red-500'
				disabledStyles='bg-blue-500'
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
