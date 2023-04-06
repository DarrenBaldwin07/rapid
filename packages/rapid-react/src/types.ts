import { AxiosResponse, AxiosRequestConfig } from 'axios';

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
		X = T3,
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
		X = T3,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: X,
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
		X = T3,
		R = AxiosResponse<T, U>,
		D = V,
	>(
		url: W,
		data?: X,
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
