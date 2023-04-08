import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type {
	RapidWebHandlerType,
	BoltRoutes,
	Bolt
} from './types';
import { isDynamicRoute, generatePathUrl, toArray } from './util';

type FetchKey<T extends RapidWebHandlerType> =
	| keyof T['queries']
	| keyof T['mutations'];

/**
 * Creates a new typesafe Bolt client for the given routes
 * Note: All routes are generated and exported from the Rapid-web rust crate
 *
 * @returns A new Bolt client
 *
 * TODO: support typesafe output types in v2 (currently, every request returns AxiosResponse<any, any> but will be fully typesafe after V2 is released)
 *
 * # Example
 * ```ts
 * // Create a new bolt client
 * const bolt = createBoltClient(routes);
 * // Fetch data from your rust backend with full typesafety!
 * const route = bolt('getUsers').post('/users', { id: 1 });
 *```
 *
 * @beta
 */
function createBoltClient<T extends RapidWebHandlerType, R extends BoltRoutes>(
	routes: BoltRoutes,
) {
	return <Key extends FetchKey<T> & string, >(key: Key) => {
		// Get a reference to the route that we are trying to fetch
		const route = routes[key];
		// Grab the route type
		const routeType = route.type;
		// Grab the route path (this is what we will use to check if the route is a dynamic route)
		const routePath = route.url;
		// Check if the route path is a dynamic route
		const isDynamic = isDynamicRoute(routePath) ? 'dynamic' : 'default';

		// Get the type that the input body should be (for post, delete, put, and patch requests)
		type InputBody = T['mutations'][typeof key]['input'];
		// Get the type that the output body should be for post, delete, put, and patch requests (mutations)
		type OutputMutationBody = T['mutations'][typeof key]['output'];
		// Get the output type for all queries
		type OutputQueryBody = T['queries'][typeof key]['output'];
		// Declare our route types so that users can never pass in a path that is invalid (does not point to an actual route declared on the Rust backend)
		// This will almost guarantee that users never request a route that throws a 404 :)
		type RequestUrl = R[typeof key]['url'];
		// Get the type of our url path for both a mutation and a query (this is the type that we will use to check if the route is a dynamic route)
		type QueryPathType =  T['queries'][typeof key]['path'];
		type MutationPathType =  T['mutations'][typeof key]['path'];

		// Grab our type for the dynamic mutation params
		type isDynamicMutationType = T['mutations'][typeof key]['isDynamic'] extends true ? 'dynamic' : 'default';
		// Grab our type for the dynamic query params
		type isDynamicQueryType = T['queries'][typeof key]['isDynamic'] extends true ? 'dynamic' : 'default';

		// Generate a type for our bolt route object
		type Route = {
			url: RequestUrl;
			type: typeof routeType;
		}

		switch (routeType) {
			case 'post':
				if (isDynamic) {
					return {
						post: <
							T = any,
							R = AxiosResponse<T, OutputMutationBody>,
							D = InputBody,
						>(
							url: Route | RequestUrl,
							params: MutationPathType,
							data?: InputBody,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							// Users have the option to pass in a string or an object with a url property
							let parsedUrl;

							// Use a type guard to make sure we extract the URL we need
							if (typeof url === 'string') {
								parsedUrl = url;
							} else {
								parsedUrl = url.url;
							}

							return axios.post(generatePathUrl(parsedUrl, toArray(params)), data, config)
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType
					>[isDynamicMutationType];
				}
				return {
					post: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: Route | RequestUrl,
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						// Users have the option to pass in a string or an object with a url property
						let parsedUrl;

						// Use a type guard to make sure we extract the URL we need
						if (typeof url === 'string') {
							parsedUrl = url;
						} else {
							parsedUrl = url.url;
						}
						return axios.post(parsedUrl, data, config);
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType
				>[isDynamicMutationType];
			case 'get':
				if (isDynamic) {
					return {
						get: <
							T = any,
							R = AxiosResponse<T, OutputQueryBody>,
							D = any,
						>(
							url: Route | RequestUrl,
							params: QueryPathType,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							// Users have the option to pass in a string or an object with a url property
							let parsedUrl;

							// Use a type guard to make sure we extract the URL we need
							if (typeof url === 'string') {
								parsedUrl = url;
							} else {
								parsedUrl = url.url;
							}

							return axios.get(generatePathUrl(parsedUrl, toArray(params)), config);
						},
					} as Bolt<
						T['queries'][Key]['type'],
						Route | RequestUrl,
						R,
						never,
						QueryPathType
					>[isDynamicQueryType];
				}
				return {
					get: <
						T = any,
						R = AxiosResponse<T, OutputQueryBody>,
						D = any,
					>(
						url: Route | RequestUrl,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						// Users have the option to pass in a string or an object with a url property
						let parsedUrl;

						// Use a type guard to make sure we extract the URL we need
						if (typeof url === 'string') {
							parsedUrl = url;
						} else {
							parsedUrl = url.url;
						}
						return axios.get(parsedUrl, config)
					},
				} as Bolt<
					T['queries'][Key]['type'],
					Route | RequestUrl,
					R,
					never,
					QueryPathType
				>[isDynamicQueryType];
			case 'delete':
				if (isDynamic) {
					return {
						delete: <
							T = any,
							R = AxiosResponse<T, OutputQueryBody>,
							D = any,
						>(
							url: Route | RequestUrl,
							params: QueryPathType,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							// Users have the option to pass in a string or an object with a url property
							let parsedUrl;

							// Use a type guard to make sure we extract the URL we need
							if (typeof url === 'string') {
								parsedUrl = url;
							} else {
								parsedUrl = url.url;
							}
							return axios.delete(generatePathUrl(parsedUrl, toArray(params)), config);
						}
					} as Bolt<
						T['queries'][Key]['type'],
						Route | RequestUrl,
						R,
						never,
						QueryPathType
					>[isDynamicQueryType];
				}
				return {
					delete: <
						T = any,
						R = AxiosResponse<T, OutputQueryBody>,
						D = any,
					>(
						url: Route | RequestUrl,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						// Users have the option to pass in a string or an object with a url property
						let parsedUrl;

						// Use a type guard to make sure we extract the URL we need
						if (typeof url === 'string') {
							parsedUrl = url;
						} else {
							parsedUrl = url.url;
						}
						return axios.delete(parsedUrl, config)
					},
				} as Bolt<
					T['queries'][Key]['type'],
					Route | RequestUrl,
					R,
					never,
					QueryPathType
				>[isDynamicQueryType];
			case 'put':
				if (isDynamic) {
					return {
						put: <
							T = any,
							R = AxiosResponse<T, OutputMutationBody>,
							D = InputBody,
						>(
							url: Route | RequestUrl,
							params: MutationPathType,
							data?: InputBody,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							// Users have the option to pass in a string or an object with a url property
							let parsedUrl;

							// Use a type guard to make sure we extract the URL we need
							if (typeof url === 'string') {
								parsedUrl = url;
							} else {
								parsedUrl = url.url;
							}

							return axios.put(generatePathUrl(parsedUrl, toArray(params)), data, config)
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType
					>[isDynamicMutationType];
				}
				return {
					put: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: Route | RequestUrl,
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						// Users have the option to pass in a string or an object with a url property
						let parsedUrl;

						// Use a type guard to make sure we extract the URL we need
						if (typeof url === 'string') {
							parsedUrl = url;
						} else {
							parsedUrl = url.url;
						}

						return axios.put(parsedUrl, data, config)
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType
				>[isDynamicMutationType];
			case 'patch':
				if (isDynamic) {
					return {
						patch: <
							T = any,
							R = AxiosResponse<T, OutputMutationBody>,
							D = InputBody,
						>(
							url: Route | RequestUrl,
							params: MutationPathType,
							data?: InputBody,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							// Users have the option to pass in a string or an object with a url property
							let parsedUrl;

							// Use a type guard to make sure we extract the URL we need
							if (typeof url === 'string') {
								parsedUrl = url;
							} else {
								parsedUrl = url.url;
							}

							return axios.patch(generatePathUrl(parsedUrl, toArray(params)), data, config);
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType
					>[isDynamicMutationType];
				}
				return {
					patch: <
						T = any,
						R = AxiosResponse<T, OutputMutationBody>,
						D = InputBody,
					>(
						url: Route | RequestUrl,
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						// Users have the option to pass in a string or an object with a url property
						let parsedUrl;

						// Use a type guard to make sure we extract the URL we need
						if (typeof url === 'string') {
							parsedUrl = url;
						} else {
							parsedUrl = url.url;
						}
						return axios.patch(parsedUrl, data, config)
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType
				>[isDynamicMutationType];
		}
	};
}

export default createBoltClient;


