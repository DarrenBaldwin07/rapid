import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from '..';
import React from 'react';

describe('Button', () => {
	it('renders correctly without crashing', () => {
		const root = render(<Button>Hello world</Button>);
		expect(root).toBeDefined();
	});
	it('shows a loading spinner when loading', () => {
		const root = render(<Button isLoading>Hello world</Button>);
		expect(root.getByTestId('button-spinner')).toBeDefined();
	});
	it('renders children correctly', () => {
		const root = render(<Button>Hello world</Button>);
		expect(root.getByText('Hello world')).toBeDefined();
	});
	it('does not render children when loading', () => {
		const root = render(<Button isLoading>Hello world</Button>);
		expect(root.queryByText('Hello world')).toBeNull();
	});
	it('renders a custom spinner when provided', () => {
		const root = render(
			<Button isLoading spinner={<div data-testid='custom-spinner' />}>
				Hello world
			</Button>,
		);
		expect(root.getByTestId('custom-spinner')).toBeDefined();
	});
});
