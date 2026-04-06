import { AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * The two canonical handler types in Rapid.
 * - `query` maps to read operations (HTTP GET)
 * - `mutation` maps to write operations (HTTP POST/PUT/PATCH/DELETE)
 */
export type SupportedHTTPMethods = 'query' | 'mutation';

/**
 * Resolves the Bolt output type based on whether the route is dynamic and the handler type.
 */
export type BoltDynamicOutput<
	T extends SupportedHTTPMethods,
	T1,
	T2,
	T3,
	T4,
	T5,
> = T extends 'query'
	? QueryFunctionDynamic<T1, T2, T4, T5>
	: T extends 'mutation'
	? MutationFunctionDynamic<T1, T2, T3, T4, T5>
	: never;

export type BoltOutput<
	T extends SupportedHTTPMethods,
	T1,
	T2,
	T3,
	T4,
> = T extends 'query'
	? QueryFunction<T1, T2, T4>
	: T extends 'mutation'
	? MutationFunction<T1, T2, T3, T4>
	: never;

export type Bolt<T extends SupportedHTTPMethods, T1, T2, T3, T4, T5> = {
	dynamic: BoltDynamicOutput<T, T1, T2, T3, T4, T5>;
	default: BoltOutput<T, T1, T2, T3, T5>;
};

/**
 * Mutation handler function type — provides `post`, `put`, `patch`, and `delete` methods.
 */
export type MutationFunction<T1, T2, T3, T4> = {
	post: <
		W extends T1,
		T = T4,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
	put: <
		W extends T1,
		T = T4,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
	patch: <
		W extends T1,
		T = T4,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
	delete: <
		W extends T1,
		T = T4,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

/**
 * Dynamic mutation handler function type — includes path params.
 */
export type MutationFunctionDynamic<T1, T2, T3, T4, T5> = {
	post: <
		W extends T1,
		T = T5,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		params: T4,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
	put: <
		W extends T1,
		T = T5,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		params: T4,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
	patch: <
		W extends T1,
		T = T5,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		params: T4,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
	delete: <
		W extends T1,
		T = T5,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		params: T4,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

/**
 * Query handler function type — provides a `get` method.
 */
export type QueryFunction<T1, T2, T3> = {
	get: <
		W extends T1,
		T = T3,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

/**
 * Dynamic query handler function type — includes path params.
 */
export type QueryFunctionDynamic<T1, T2, T3, T4> = {
	get: <
		W extends T1,
		T = T4,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		params: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

export interface RapidWebHandlerType {
	queries: {
		[key: string]: TypedQueryHandler;
	};
	mutations: {
		[key: string]: TypedMutationHandler;
	};
}

// Types that represent a typescript handler generated from rapid-web
export interface TypedMutationHandler {
	type: SupportedHTTPMethods;
	query_params?: any;
	path?: any;
	input?: any;
	isDynamic: boolean;
	output: any;
}

// Queries are the same as mutations except they don't have an input type
export interface TypedQueryHandler {
	type: SupportedHTTPMethods;
	query_params?: any;
	path?: any;
	isDynamic: boolean;
	output: any;
}

export interface Route {
	url: string;
	type: SupportedHTTPMethods;
}

export interface BoltRoutes {
	[key: string]: Route;
}
