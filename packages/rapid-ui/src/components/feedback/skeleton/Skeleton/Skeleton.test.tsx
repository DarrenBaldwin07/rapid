import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
	it('should render correctly', () => {
		const { container } = render(<Skeleton />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with props', () => {
		const { container } = render(
			<Skeleton
				styles='custom-class'
				isLoading
				speed='skeleton-pulse-fast'
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with props', () => {
		const { container } = render(
			<Skeleton isLoading={false} speed='skeleton-pulse-medium' />,
		);
		expect(container).toMatchSnapshot();
	});
});
