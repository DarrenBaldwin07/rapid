import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import { Heading } from '../../../src/components/primitives';
import React from 'react';

describe('Heading', () => {
	it('renders without crashing', () => {
		const root = render(<Heading />);
		expect(root).toBeDefined();
	});
	it('renders with children', () => {
		const root = render(<Heading>Hello world</Heading>);
		expect(root.getByText('Hello world')).toBeDefined();
	});
});

describe('Heading snapshots', () => {
	it('renders in small', () => {
		const heading = render(<Heading size='sm'>Hello world</Heading>);
		expect(heading).toMatchInlineSnapshot(`
			{
			  "asFragment": [Function],
			  "baseElement": <body>
			    <div>
			      <h2
			        class="text-sm rapid-heading"
			      >
			        Hello world
			      </h2>
			    </div>
			  </body>,
			  "container": <div>
			    <h2
			      class="text-sm rapid-heading"
			    >
			      Hello world
			    </h2>
			  </div>,
			  "debug": [Function],
			  "findAllByAltText": [Function],
			  "findAllByDisplayValue": [Function],
			  "findAllByLabelText": [Function],
			  "findAllByPlaceholderText": [Function],
			  "findAllByRole": [Function],
			  "findAllByTestId": [Function],
			  "findAllByText": [Function],
			  "findAllByTitle": [Function],
			  "findByAltText": [Function],
			  "findByDisplayValue": [Function],
			  "findByLabelText": [Function],
			  "findByPlaceholderText": [Function],
			  "findByRole": [Function],
			  "findByTestId": [Function],
			  "findByText": [Function],
			  "findByTitle": [Function],
			  "getAllByAltText": [Function],
			  "getAllByDisplayValue": [Function],
			  "getAllByLabelText": [Function],
			  "getAllByPlaceholderText": [Function],
			  "getAllByRole": [Function],
			  "getAllByTestId": [Function],
			  "getAllByText": [Function],
			  "getAllByTitle": [Function],
			  "getByAltText": [Function],
			  "getByDisplayValue": [Function],
			  "getByLabelText": [Function],
			  "getByPlaceholderText": [Function],
			  "getByRole": [Function],
			  "getByTestId": [Function],
			  "getByText": [Function],
			  "getByTitle": [Function],
			  "queryAllByAltText": [Function],
			  "queryAllByDisplayValue": [Function],
			  "queryAllByLabelText": [Function],
			  "queryAllByPlaceholderText": [Function],
			  "queryAllByRole": [Function],
			  "queryAllByTestId": [Function],
			  "queryAllByText": [Function],
			  "queryAllByTitle": [Function],
			  "queryByAltText": [Function],
			  "queryByDisplayValue": [Function],
			  "queryByLabelText": [Function],
			  "queryByPlaceholderText": [Function],
			  "queryByRole": [Function],
			  "queryByTestId": [Function],
			  "queryByText": [Function],
			  "queryByTitle": [Function],
			  "rerender": [Function],
			  "unmount": [Function],
			}
		`);
	});
	it('renders in medium', () => {
		const heading = render(<Heading size='md'>Hello world</Heading>);
		expect(heading).toMatchInlineSnapshot(`
			{
			  "asFragment": [Function],
			  "baseElement": <body>
			    <div>
			      <h2
			        class="text-lg rapid-heading"
			      >
			        Hello world
			      </h2>
			    </div>
			  </body>,
			  "container": <div>
			    <h2
			      class="text-lg rapid-heading"
			    >
			      Hello world
			    </h2>
			  </div>,
			  "debug": [Function],
			  "findAllByAltText": [Function],
			  "findAllByDisplayValue": [Function],
			  "findAllByLabelText": [Function],
			  "findAllByPlaceholderText": [Function],
			  "findAllByRole": [Function],
			  "findAllByTestId": [Function],
			  "findAllByText": [Function],
			  "findAllByTitle": [Function],
			  "findByAltText": [Function],
			  "findByDisplayValue": [Function],
			  "findByLabelText": [Function],
			  "findByPlaceholderText": [Function],
			  "findByRole": [Function],
			  "findByTestId": [Function],
			  "findByText": [Function],
			  "findByTitle": [Function],
			  "getAllByAltText": [Function],
			  "getAllByDisplayValue": [Function],
			  "getAllByLabelText": [Function],
			  "getAllByPlaceholderText": [Function],
			  "getAllByRole": [Function],
			  "getAllByTestId": [Function],
			  "getAllByText": [Function],
			  "getAllByTitle": [Function],
			  "getByAltText": [Function],
			  "getByDisplayValue": [Function],
			  "getByLabelText": [Function],
			  "getByPlaceholderText": [Function],
			  "getByRole": [Function],
			  "getByTestId": [Function],
			  "getByText": [Function],
			  "getByTitle": [Function],
			  "queryAllByAltText": [Function],
			  "queryAllByDisplayValue": [Function],
			  "queryAllByLabelText": [Function],
			  "queryAllByPlaceholderText": [Function],
			  "queryAllByRole": [Function],
			  "queryAllByTestId": [Function],
			  "queryAllByText": [Function],
			  "queryAllByTitle": [Function],
			  "queryByAltText": [Function],
			  "queryByDisplayValue": [Function],
			  "queryByLabelText": [Function],
			  "queryByPlaceholderText": [Function],
			  "queryByRole": [Function],
			  "queryByTestId": [Function],
			  "queryByText": [Function],
			  "queryByTitle": [Function],
			  "rerender": [Function],
			  "unmount": [Function],
			}
		`);
	});
	it('renders in large', () => {
		const heading = render(<Heading size='lg'>Hello world</Heading>);
		expect(heading).toMatchInlineSnapshot(`
			{
			  "asFragment": [Function],
			  "baseElement": <body>
			    <div>
			      <h2
			        class="text-3xl rapid-heading"
			      >
			        Hello world
			      </h2>
			    </div>
			  </body>,
			  "container": <div>
			    <h2
			      class="text-3xl rapid-heading"
			    >
			      Hello world
			    </h2>
			  </div>,
			  "debug": [Function],
			  "findAllByAltText": [Function],
			  "findAllByDisplayValue": [Function],
			  "findAllByLabelText": [Function],
			  "findAllByPlaceholderText": [Function],
			  "findAllByRole": [Function],
			  "findAllByTestId": [Function],
			  "findAllByText": [Function],
			  "findAllByTitle": [Function],
			  "findByAltText": [Function],
			  "findByDisplayValue": [Function],
			  "findByLabelText": [Function],
			  "findByPlaceholderText": [Function],
			  "findByRole": [Function],
			  "findByTestId": [Function],
			  "findByText": [Function],
			  "findByTitle": [Function],
			  "getAllByAltText": [Function],
			  "getAllByDisplayValue": [Function],
			  "getAllByLabelText": [Function],
			  "getAllByPlaceholderText": [Function],
			  "getAllByRole": [Function],
			  "getAllByTestId": [Function],
			  "getAllByText": [Function],
			  "getAllByTitle": [Function],
			  "getByAltText": [Function],
			  "getByDisplayValue": [Function],
			  "getByLabelText": [Function],
			  "getByPlaceholderText": [Function],
			  "getByRole": [Function],
			  "getByTestId": [Function],
			  "getByText": [Function],
			  "getByTitle": [Function],
			  "queryAllByAltText": [Function],
			  "queryAllByDisplayValue": [Function],
			  "queryAllByLabelText": [Function],
			  "queryAllByPlaceholderText": [Function],
			  "queryAllByRole": [Function],
			  "queryAllByTestId": [Function],
			  "queryAllByText": [Function],
			  "queryAllByTitle": [Function],
			  "queryByAltText": [Function],
			  "queryByDisplayValue": [Function],
			  "queryByLabelText": [Function],
			  "queryByPlaceholderText": [Function],
			  "queryByRole": [Function],
			  "queryByTestId": [Function],
			  "queryByText": [Function],
			  "queryByTitle": [Function],
			  "rerender": [Function],
			  "unmount": [Function],
			}
		`);
	});
	it('renders with custom styles', () => {
		const heading = render(
			<Heading styles='custom-class'>Hello world</Heading>,
		);
		expect(heading).toMatchInlineSnapshot(`
			{
			  "asFragment": [Function],
			  "baseElement": <body>
			    <div>
			      <h2
			        class="text-3xl custom-class rapid-heading"
			      >
			        Hello world
			      </h2>
			    </div>
			  </body>,
			  "container": <div>
			    <h2
			      class="text-3xl custom-class rapid-heading"
			    >
			      Hello world
			    </h2>
			  </div>,
			  "debug": [Function],
			  "findAllByAltText": [Function],
			  "findAllByDisplayValue": [Function],
			  "findAllByLabelText": [Function],
			  "findAllByPlaceholderText": [Function],
			  "findAllByRole": [Function],
			  "findAllByTestId": [Function],
			  "findAllByText": [Function],
			  "findAllByTitle": [Function],
			  "findByAltText": [Function],
			  "findByDisplayValue": [Function],
			  "findByLabelText": [Function],
			  "findByPlaceholderText": [Function],
			  "findByRole": [Function],
			  "findByTestId": [Function],
			  "findByText": [Function],
			  "findByTitle": [Function],
			  "getAllByAltText": [Function],
			  "getAllByDisplayValue": [Function],
			  "getAllByLabelText": [Function],
			  "getAllByPlaceholderText": [Function],
			  "getAllByRole": [Function],
			  "getAllByTestId": [Function],
			  "getAllByText": [Function],
			  "getAllByTitle": [Function],
			  "getByAltText": [Function],
			  "getByDisplayValue": [Function],
			  "getByLabelText": [Function],
			  "getByPlaceholderText": [Function],
			  "getByRole": [Function],
			  "getByTestId": [Function],
			  "getByText": [Function],
			  "getByTitle": [Function],
			  "queryAllByAltText": [Function],
			  "queryAllByDisplayValue": [Function],
			  "queryAllByLabelText": [Function],
			  "queryAllByPlaceholderText": [Function],
			  "queryAllByRole": [Function],
			  "queryAllByTestId": [Function],
			  "queryAllByText": [Function],
			  "queryAllByTitle": [Function],
			  "queryByAltText": [Function],
			  "queryByDisplayValue": [Function],
			  "queryByLabelText": [Function],
			  "queryByPlaceholderText": [Function],
			  "queryByRole": [Function],
			  "queryByTestId": [Function],
			  "queryByText": [Function],
			  "queryByTitle": [Function],
			  "rerender": [Function],
			  "unmount": [Function],
			}
		`);
	});
});
