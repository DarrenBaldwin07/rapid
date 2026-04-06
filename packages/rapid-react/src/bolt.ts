import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { RapidWebHandlerType, BoltRoutes, Bolt } from './types';
import { isDynamicRoute, generatePathUrl, toArray } from './util';

type FetchKey<T extends RapidWebHandlerType> =
	| keyof T['queries']
	| keyof T['mutations'];

/// The bolt config object (this will expand to have more options in the future)
interface BoltConfig {
	transport: string;
}

/**
 * Resolves a URL from either a string or a Route object, optionally prepending the transport.
 */
function resolveUrl(
	url: string | { url: string },
	transport: string,
	params?: unknown,
): string {
	let parsedUrl: string;
	if (typeof url === 'string') {
		parsedUrl = url;
	} else {
		parsedUrl = url.url;
	}

	// If we have dynamic path params, generate the full path URL
	if (params !== undefined) {
		return generatePathUrl(parsedUrl, toArray(params), transport);
	}

	return `${transport}${parsedUrl}`;
}

/**
 * Creates a new typesafe Bolt client for the given routes.
 * All routes are generated and exported from the Rapid-web rust crate.
 *
 * @param routes - The routes that you want to fetch from your rust backend
 * @param config - The bolt config object
 * @returns A new Bolt client
 *
 * # Example
 * ```ts
 * // Create a new bolt client
 * const bolt = createBoltClient<Handlers, typeof routes>(routes, config);
 * // Fetch data from your rust backend with full typesafety!
 * const route = bolt('getUsers').get('/users');
 * ```
 *
 * @beta
 */
function createBoltClient<T extends RapidWebHandlerType, R extends BoltRoutes>(
	routes: BoltRoutes,
	config: BoltConfig,
) {
	const transport = config.transport;

	return <Key extends FetchKey<T> & string>(key: Key) => {
		const route = routes[key];
		const routeType = route.type;
		const routePath = route.url;
		const isDynamic = isDynamicRoute(routePath);

		// Type aliases for mutation handlers
		type InputBody = T['mutations'][typeof key]['input'];
		type OutputMutationBody = T['mutations'][typeof key]['output'];
		// Type aliases for query handlers
		type OutputQueryBody = T['queries'][typeof key]['output'];
		// Route URL type — ensures users can only pass valid route paths
		type RequestUrl = R[typeof key]['url'];
		// Path types for dynamic routes
		type QueryPathType = T['queries'][typeof key]['path'];
		type MutationPathType = T['mutations'][typeof key]['path'];

		// Conditional types for dynamic vs default route handling
		type isDynamicMutationType =
			T['mutations'][typeof key]['isDynamic'] extends true
				? 'dynamic'
				: 'default';
		type isDynamicQueryType =
			T['queries'][typeof key]['isDynamic'] extends true
				? 'dynamic'
				: 'default';

		type Route = {
			url: RequestUrl;
			type: typeof routeType;
		};

		switch (routeType) {
			case 'query': {
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
							return axios.get(
								resolveUrl(url as string | { url: string }, transport, params),
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
						return axios.get(
							resolveUrl(url as string | { url: string }, transport),
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
			case 'mutation': {
				if (isDynamic) {
					return {
						post: <
							T = OutputMutationBody,
							R = AxiosResponse<T, OutputMutationBody>,
							D = InputBody,
						>(
							url: Route | RequestUrl,
							params: MutationPathType,
							data?: InputBody,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							return axios.post(
								resolveUrl(url as string | { url: string }, transport, params),
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
							return axios.put(
								resolveUrl(url as string | { url: string }, transport, params),
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
							return axios.patch(
								resolveUrl(url as string | { url: string }, transport, params),
								data,
								config,
							);
						},
						delete: <
							T = OutputMutationBody,
							R = AxiosResponse<T, OutputMutationBody>,
							D = any,
						>(
							url: Route | RequestUrl,
							params: MutationPathType,
							config?: AxiosRequestConfig<D>,
						): Promise<R> => {
							return axios.delete(
								resolveUrl(url as string | { url: string }, transport, params),
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
						return axios.post(
							resolveUrl(url as string | { url: string }, transport),
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
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						return axios.put(
							resolveUrl(url as string | { url: string }, transport),
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
						data?: InputBody,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						return axios.patch(
							resolveUrl(url as string | { url: string }, transport),
							data,
							config,
						);
					},
					delete: <
						T = OutputMutationBody,
						R = AxiosResponse<T, OutputMutationBody>,
						D = any,
					>(
						url: Route | RequestUrl,
						config?: AxiosRequestConfig<D>,
					): Promise<R> => {
						return axios.delete(
							resolveUrl(url as string | { url: string }, transport),
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
		}
	};
}

export default createBoltClient;
