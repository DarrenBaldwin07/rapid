import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Container from './Container';

describe('Container', () => {
	it('should render default correctly', () => {
		const { container } = render(<Container />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(<Container styles='p-4' maxWidth='sm' />);
		expect(container).toMatchSnapshot();
	});

	it('should render correctly with non default props', () => {
		const { container } = render(<Container styles='p-4' maxWidth='md' />);
		expect(container).toMatchSnapshot();
	});
});
