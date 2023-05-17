import { describe, expect, test, vi, it } from 'vitest';
import createBoltClient from '../bolt';

// For some reason we have to mock axios before actually importing it...?
vi.mock('axios', () => ({
	default: {
		get: vi.fn(),
	},
}));

import axios from 'axios';

// Testcase handlers + routes
interface Handlers {
	queries: {
		route: {
			output: any;
			type: 'get';
			isDynamic: false;
		};
	};
	mutations: {};
}

const routes = {
	route: {
		url: '/route',
		type: 'get',
	},
} as const;

describe('bolt', () => {
	test('createBoltClient', async () => {
		it('handles a standard request with output data', async () => {
			// prepare our mock
			const mockedAxios = axios as jest.Mocked<typeof axios>;
			const outputData = { id: 1, name: 'bilbo', age: 22 };
			mockedAxios.get.mockResolvedValue({ data: outputData });

			const bolt = createBoltClient<Handlers, typeof routes>(routes, {
				transport: '',
			});

			const req = await bolt('route').get(routes.route);

			expect(req.data).toEqual(outputData);
		});
	});
});
