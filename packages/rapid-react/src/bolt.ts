import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { RapidWebHandlerType, BoltRoutes, Bolt } from './types';
import { isDynamicRoute, generatePathUrl, toArray } from './util';

// TODO: support typesafe output types in v2 (currently, every request returns AxiosResponse<any, any> but will be fully typesafe after V2 is released)
// TODO: Improve some of the generics here (they are a bit messy)
// TODO: Some of the hover context overlays are bloated with the route generics (not sure how we fix this but would be good to revisit)

type FetchKey<T extends RapidWebHandlerType> =
	| keyof T['queries']
	| keyof T['mutations'];

/// The bolt config object (this will expand to have more options in the future)
interface BoltConfig {
	transport: string;
}

/**
 * Creates a new typesafe Bolt client for the given routes
 * Note: All routes are generated and exported from the Rapid-web rust crate
 *
 * @param routes - The routes that you want to fetch from your rust backend
 * @param config - The bolt config object
 * @returns A new Bolt client
 *
 * TODO: support typesafe output types in v2 (currently, every request returns AxiosResponse<any, any> but will be fully typesafe after V2 is released)
 *
 * # Example
 * ```ts
 * // Create a new bolt client
 * const bolt = createBoltClient<Handlers, typeof routes>(routes, config);
 * // Fetch data from your rust backend with full typesafety!
 * const route = bolt('getUsers').post('/users', { id: 1 });
 *```
 *
 * @beta
 */
function createBoltClient<T extends RapidWebHandlerType>(
	routes: BoltRoutes,
	config: BoltConfig,
) {
	// Get our transport string from the bolt config object (eventually this will be expanded to have more options)
	const transport = config.transport;

	type R = typeof routes;

	return <Key extends FetchKey<T> & string>(key: Key) => {
		// Get a reference to the route that we are trying to fetch
		const route = routes[key];
		// Grab the route type
		const routeType = route.type;
		// Grab the route path (this is what we will use to check if the route is a dynamic route)
		const routePath = route.url;
		// Check if the route path is a dynamic route
		const isDynamic = isDynamicRoute(routePath);

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
		type QueryPathType = T['queries'][typeof key]['path'];
		type MutationPathType = T['mutations'][typeof key]['path'];

		// Grab our type for the dynamic mutation params
		type isDynamicMutationType =
			T['mutations'][typeof key]['isDynamic'] extends true
				? 'dynamic'
				: 'default';
		// Grab our type for the dynamic query params
		type isDynamicQueryType =
			T['queries'][typeof key]['isDynamic'] extends true
				? 'dynamic'
				: 'default';

		// Generate a type for our bolt route object
		type Route = {
			url: RequestUrl;
			type: typeof routeType;
		};

		switch (routeType) {
			case 'post':
				if (isDynamic) {
					return {
						post: <
							T = OutputMutationBody, // The type of the output body
							R = AxiosResponse<T, OutputMutationBody>, // The type of the response
							D = InputBody, // The type of the input body
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

							return axios.post(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								data,
								config,
							);
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType,
						OutputMutationBody
					>[isDynamicMutationType];
				}
				return {
					post: <
						T = OutputMutationBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}
						return axios.post(parsedUrl, data, config);
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType,
					OutputMutationBody
				>[isDynamicMutationType];
			case 'get':
				if (isDynamic) {
					return {
						get: <
							T = OutputQueryBody,
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

							return axios.get(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								config,
							);
						},
					} as Bolt<
						T['queries'][Key]['type'],
						Route | RequestUrl,
						R,
						never,
						QueryPathType,
						OutputQueryBody
					>[isDynamicQueryType];
				}
				return {
					get: <
						T = OutputQueryBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}
						return axios.get(parsedUrl, config);
					},
				} as Bolt<
					T['queries'][Key]['type'],
					Route | RequestUrl,
					R,
					never,
					QueryPathType,
					OutputQueryBody
				>[isDynamicQueryType];
			case 'delete':
				if (isDynamic) {
					return {
						delete: <
							T = OutputQueryBody,
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
							return axios.delete(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								config,
							);
						},
					} as Bolt<
						T['queries'][Key]['type'],
						Route | RequestUrl,
						R,
						never,
						QueryPathType,
						OutputQueryBody
					>[isDynamicQueryType];
				}
				return {
					delete: <
						T = OutputQueryBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}

						return axios.delete(parsedUrl, config);
					},
				} as Bolt<
					T['queries'][Key]['type'],
					Route | RequestUrl,
					R,
					never,
					QueryPathType,
					OutputQueryBody
				>[isDynamicQueryType];
			case 'put':
				if (isDynamic) {
					return {
						put: <
							T = OutputMutationBody,
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

							return axios.put(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								data,
								config,
							);
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType,
						OutputMutationBody
					>[isDynamicMutationType];
				}
				return {
					put: <
						T = OutputMutationBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}

						return axios.put(parsedUrl, data, config);
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType,
					OutputMutationBody
				>[isDynamicMutationType];
			case 'patch':
				if (isDynamic) {
					return {
						patch: <
							T = OutputMutationBody,
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

							return axios.patch(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								data,
								config,
							);
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType,
						OutputMutationBody
					>[isDynamicMutationType];
				}
				return {
					patch: <
						T = OutputMutationBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}
						return axios.patch(parsedUrl, data, config);
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType,
					OutputMutationBody
				>[isDynamicMutationType];
			case 'query':
				if (isDynamic) {
					return {
						get: <
							T = OutputQueryBody,
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

							return axios.get(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								config,
							);
						},
					} as Bolt<
						T['queries'][Key]['type'],
						Route | RequestUrl,
						R,
						never,
						QueryPathType,
						OutputQueryBody
					>[isDynamicQueryType];
				}
				return {
					get: <
						T = OutputQueryBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}
						return axios.get(parsedUrl, config);
					},
				} as Bolt<
					T['queries'][Key]['type'],
					Route | RequestUrl,
					R,
					never,
					QueryPathType,
					OutputQueryBody
				>[isDynamicQueryType];
			case 'mutation':
				if (isDynamic) {
					return {
						post: <
							T = OutputMutationBody, // The type of the output body
							R = AxiosResponse<T, OutputMutationBody>, // The type of the response
							D = InputBody, // The type of the input body
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

							return axios.post(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								data,
								config,
							);
						},
						put: <
							T = OutputMutationBody,
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

							return axios.put(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								data,
								config,
							);
						},
						patch: <
							T = OutputMutationBody,
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

							return axios.patch(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								data,
								config,
							);
						},
						delete: <
							T = OutputQueryBody,
							R = AxiosResponse<T, OutputMutationBody>,
							D = any,
						>(
							url: Route | RequestUrl,
							params: MutationPathType,
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
							return axios.delete(
								generatePathUrl(
									parsedUrl,
									toArray(params),
									transport,
								),
								config,
							);
						},
					} as Bolt<
						T['mutations'][Key]['type'],
						Route | RequestUrl,
						R,
						InputBody,
						MutationPathType,
						OutputMutationBody
					>[isDynamicMutationType];
				}
				return {
					post: <
						T = OutputMutationBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}
						return axios.post(parsedUrl, data, config);
					},
					put: <
						T = OutputMutationBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}

						return axios.put(parsedUrl, data, config);
					},
					patch: <
						T = OutputMutationBody,
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
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}
						return axios.patch(parsedUrl, data, config);
					},
					delete: <
						T = OutputQueryBody,
						R = AxiosResponse<T, OutputMutationBody>,
						D = any,
					>(
						url: Route | RequestUrl,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						// Users have the option to pass in a string or an object with a url property
						let parsedUrl;

						// Use a type guard to make sure we extract the URL we need
						if (typeof url === 'string') {
							parsedUrl = `${transport}${url}`;
						} else {
							parsedUrl = `${transport}${url.url}`;
						}

						return axios.delete(parsedUrl, config);
					},
				} as Bolt<
					T['mutations'][Key]['type'],
					Route | RequestUrl,
					R,
					InputBody,
					MutationPathType,
					OutputMutationBody
				>[isDynamicMutationType];
		}
	};
}

export default createBoltClient;

