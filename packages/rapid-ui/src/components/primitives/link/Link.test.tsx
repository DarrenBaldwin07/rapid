import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Link from './Link';

describe('Link', () => {
	it('should render correctly', () => {
		const { container } = render(<Link />);
		expect(container).toMatchSnapshot();
	});
});
describe('Link', () => {
	it('should render  with href correctly', () => {
		const { container } = render(
			<Link href='www.example.com'>click here</Link>,
		);
		expect(container).toMatchSnapshot();
	});
});
