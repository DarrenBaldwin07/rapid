import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
	it.todo('should render default correctly', () => {
		const { container } = render(
			<Tooltip>
				<div>A tooltip should appear on hover!</div>
			</Tooltip>,
		);
		expect(container).toMatchSnapshot();
	});

	it.todo('should render correctly with non default props', () => {
		const { container } = render(
			<Tooltip>
				<div>A tooltip should appear on hover!</div>
			</Tooltip>,
		);
		expect(container).toMatchSnapshot();
	});
});
