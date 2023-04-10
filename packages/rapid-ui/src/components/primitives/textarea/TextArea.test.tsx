import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import TextArea from './Textarea';

describe('TextArea', () => {
	it('should render default correctly', () => {
		const { container } = render(<TextArea />);
		expect(container).toMatchSnapshot();
	});
});
