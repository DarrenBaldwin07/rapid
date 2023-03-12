import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Divider from './Divider';

describe('Divider', () => {
	it('should render default correctly', () => {
		const divider = render(
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider orientation='vertical' />
			</div>,
		);
		expect(divider).toMatchSnapshot();
	});

	it('should render vertical orientation correctly', () => {
		const divider = render(
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider size='lg' orientation='vertical' />
			</div>,
		);
		expect(divider).toMatchSnapshot();
	});

	it('should render xl size and dashed variant correctly', () => {
		const divider = render(
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider size='xl' orientation='vertical' variant='dashed' />
			</div>,
		);
		expect(divider).toMatchSnapshot();
	});

	it('should render dashed  horizontal correctly', () => {
		const divider = render(<Divider variant='dashed' />);
		expect(divider).toMatchSnapshot();
	});

	it('should render lg correcly', () => {
		const divider = render(<Divider size='lg' />);
		expect(divider).toMatchSnapshot();
	});
});
