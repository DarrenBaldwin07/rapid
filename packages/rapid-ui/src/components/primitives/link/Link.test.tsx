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
