import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import SkeletonText from './SkeletonText';

describe('SkeletonText', () => {
	it('should render default correctly', () => {
		const { container } = render(<SkeletonText />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with props', () => {
		const { container } = render(
			<SkeletonText
				styles='custom-class'
				containerStyles='custom-container-class'
				lineSpacing='lg'
				isLoading={false}
				speed='skeleton-pulse-fast'
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with a couple props', () => {
		const { container } = render(
			<SkeletonText
				isLoading
				lineSpacing='sm'
				speed='skeleton-pulse-medium'
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
