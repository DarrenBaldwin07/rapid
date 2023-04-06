import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
	RapidWebHandlerType,
	BoltRoutes,
	BoltOutput,
} from './types';

interface Handlers {
	queries: {};
	mutations: {
		index: {
			input: User;
			output: any;
			type: 'post';
		};

		test: {
			input: string;
			output: any;
			type: 'post';
		};
	};
}

export interface User {
	id: number;
}

const routes = {
	index: {
		url: '/',
		type: 'post',
	},
	test: {
		url: '/test',
		type: 'post',
	},
} as const;

type FetchKey<T extends RapidWebHandlerType> =
	| keyof T['queries']
	| keyof T['mutations'];

/**
 * Creates a new typesafe Bolt client for the given routes
 *
 * @returns A new bolt client
 *
 * TODO: support typesafe output types in v2 (currently, every request returns AxiosResponse<any, any> but will be fully typesafe after V2)
 *
 * @beta
 */
function createBoltClient<T extends RapidWebHandlerType, R extends BoltRoutes>(
	routes: BoltRoutes,
) {
	return <Key extends FetchKey<T> & string>(key: Key) => {
		// Get a reference to the route that we are trying to fetch
		const route = routes[key];
		// Grab the route type
		const routeType = route.type;

		// Get the type that the input body should be (for post, delete, put, and patch requests)
		type InputBody = T['mutations'][typeof key]['input'];
		// Get the type that the output body should be for post, delete, put, and patch requests (mutations)
		type OutputMutationBody = T['mutations'][typeof key]['output'];
		// Get the output type for all queries
		type OutputQueryBody = T['queries'][typeof key]['output'];
		// Declare our route types so that users can never pass in a path that is invalid (does not point to an actual route declared on the Rust backend)
		// This will almost guarantee that users never request a route that throws a 404 :)
		type RequestUrl = R[typeof key]['url'];

		switch (routeType) {
			case 'post':
				return {
					post: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: RequestUrl,
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => axios.post(url, data, config),
				} as BoltOutput<
					T['mutations'][Key]['type'],
					RequestUrl,
					R,
					InputBody
				>;
			case 'get':
				return {
					get: <
						T = any,
						R = AxiosResponse<T, OutputQueryBody>,
						D = any,
					>(
						url: RequestUrl,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => axios.get(url, config),
				} as BoltOutput<
					T['queries'][Key]['type'],
					RequestUrl,
					R,
					never
				>;
			case 'delete':
				return {
					delete: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: RequestUrl,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => axios.delete(url, config),
				} as BoltOutput<
					T['mutations'][Key]['type'],
					RequestUrl,
					R,
					InputBody
				>;
			case 'put':
				return {
					put: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: RequestUrl,
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => axios.put(url, data, config),
				} as BoltOutput<
					T['mutations'][Key]['type'],
					RequestUrl,
					R,
					InputBody
				>;
			case 'patch':
				return {
					patch: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: RequestUrl,
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => axios.patch(url, data, config),
				} as BoltOutput<
					T['mutations'][Key]['type'],
					RequestUrl,
					R,
					InputBody
				>;
		}
	};
}

export default createBoltClient;

const bolt = createBoltClient<Handlers, typeof routes>(routes);

const req = bolt('index').post('/');
