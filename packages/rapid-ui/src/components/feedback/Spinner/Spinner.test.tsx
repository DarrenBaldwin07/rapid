import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Spinner from './Spinner';

describe('Spinner', () => {
	it('should render default correctly', () => {
		const { container } = render(<Spinner />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(
			<Spinner
				styles='custom-class'
				size='sm'
				speed='slow'
				label='Some label'
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with a couple props', () => {
		const { container } = render(<Spinner size='lg' speed='fast' />);
		expect(container).toMatchSnapshot();
	});
});
