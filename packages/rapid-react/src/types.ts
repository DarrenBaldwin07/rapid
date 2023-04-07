import { AxiosResponse, AxiosRequestConfig } from 'axios';

export type BoltDynamicOutput<
	T extends SupportedHTTPMethods,
	T1,
	T2,
	T3,
	T4
> = T extends 'post'
	? PostFunctionDynamic<T1, T2, T3, T4>
	: T extends 'get'
	? GetFunctionDynamic<T1, T2, T4>
	: T extends 'put'
	? PutFunctionDynamic<T1, T2, T3, T4>
	: T extends 'delete'
	? DeleteFunctionDynamic<T1, T2, T4>
	: T extends 'patch'
	? PatchFunctionDynamic<T1, T2, T3, T4>
	: never;

export type Bolt<T extends SupportedHTTPMethods, T1, T2, T3, T4> = {
	dynamic: BoltDynamicOutput<T, T1, T2, T3, T4>
	default: BoltOutput<T, T1, T2, T3>
}


export type PostFunctionDynamic<T1, T2, T3, T4> = {
	post: <
		W extends T1,
		X extends T4,
		T = any,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		params: X,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

export type PutFunctionDynamic<T1, T2, T3, T4> = {
	put: <
		W extends T1,
		T = any,
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
};

export type PatchFunctionDynamic<T1, T2, T3, T4> = {
	patch: <
		W extends T1,
		T = any,
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
};

export type GetFunctionDynamic<T1, T2, T3> = {
	get: <
		W extends T1,
		T = any,
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

export type DeleteFunctionDynamic<T1, T2, T3> = {
	delete: <
		W extends T1,
		T = any,
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

export type BoltOutput<
	T extends SupportedHTTPMethods,
	T1,
	T2,
	T3,
> = T extends 'post'
	? PostFunction<T1, T2, T3>
	: T extends 'get'
	? GetFunction<T1, T2>
	: T extends 'put'
	? PutFunction<T1, T2, T3>
	: T extends 'delete'
	? DeleteFunction<T1, T2>
	: T extends 'patch'
	? PatchFunction<T1, T2, T3>
	: never;

export type PostFunction<T1, T2, T3> = {
	post: <
		W extends T1,
		T = any,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

export type GetFunction<T1, T2> = {
	get: <
		W extends T1,
		T = any,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

export type PutFunction<T1, T2, T3> = {
	put: <
		W extends T1,
		T = any,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

export type DeleteFunction<T1, T2> = {
	delete: <
		W extends T1,
		T = any,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};
export type PatchFunction<T1, T2, T3> = {
	patch: <
		W extends T1,
		T = any,
		U = any,
		V = T2,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: T3,
		config?: AxiosRequestConfig<D>,
	) => Promise<R>;
};

export type SupportedHTTPMethods = 'post' | 'get' | 'put' | 'delete' | 'patch';

export interface RapidWebHandlerType {
	queries: {
		[key: string]: TypedQueryHandler;
	};
	mutations: {
		[key: string]: TypedMutationHandler;
	};
}


export interface TypedMutationHandler {
	type: SupportedHTTPMethods;
	query_params?: any;
	path?: any;
	input?: any;
	isDynamic: boolean;
	output: any;
}

export interface TypedQueryHandler {
	type: SupportedHTTPMethods;
	query_params?: any;
	path?: any;
	output: any;
}

export interface Route {
	url: string;
	type: SupportedHTTPMethods;
}

export interface BoltRoutes {
	[key: string]: Route;
}
