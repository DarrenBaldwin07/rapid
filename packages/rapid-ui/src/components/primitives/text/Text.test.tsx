import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Text from './Text';

describe('Text', () => {
	it('should render default correctly', () => {
		const { container } = render(<Text />);
		expect(container).toMatchSnapshot();
	});
});
