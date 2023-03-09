import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Option from './Option';

describe('Option', () => {
	it('should render correctly', () => {
		const { container } = render(<Option />);
		expect(container).toMatchSnapshot();
	});
});
