import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { RapidWebHandlerType, BoltRoutes } from './types';

interface Handlers {
    queries: {},
    mutations: {
        index: {
            input: User
            output: any
            type: 'post'
        },

        test: {
            input: string
            output: any
            type: 'post'
        },
    }
}

export interface User {
    id: number;
}

const routes = {
    index: '/',
    test: '/test'
} as const;



type FetchKey<T extends RapidWebHandlerType> = keyof T['queries'] | keyof T['mutations'];

/**
 * Creates a new typesafe Bolt client for the given routes
 *
 * @param routes RapidUiThemeConfig
 * @returns A new bolt client
 *
 * @beta
 */
function createBoltClient<T extends RapidWebHandlerType, R extends BoltRoutes>() {
    return <Key extends FetchKey<T> & string>(key: Key) => {
        // Get the type that the input body should be (for post, delete, put, and patch requests)
        type InputBody = T['mutations'][typeof key]['input'];
        // Declare our route types so that users can never pass in a path that is invalid (does not point to an actual route declared on the Rust backend)
        // This will almost guarentee that users never request a route that throws a 404 :)
        type RequestUrl = R[typeof key];

        return {
            post: <T = any, R = AxiosResponse<T, any>, D = InputBody>(url: RequestUrl, data?: InputBody, config?: AxiosRequestConfig<D>): Promise<R> => axios.post(url, data, config),
            get: <T = any, R = AxiosResponse<T, any>, D = InputBody>(url: RequestUrl, config?: AxiosRequestConfig<D>): Promise<R> => axios.get(url, config),
            delete: <T = any, R = AxiosResponse<T, any>, D = InputBody>(url: RequestUrl, config?: AxiosRequestConfig<D>): Promise<R> => axios.delete(url, config),
            put: <T = any, R = AxiosResponse<T, any>, D = InputBody>(url: RequestUrl, data?: InputBody, config?: AxiosRequestConfig<D>): Promise<R> => axios.put(url, data, config),
            patch: <T = any, R = AxiosResponse<T, any>, D = InputBody>(url: RequestUrl, data?: InputBody, config?: AxiosRequestConfig<D>): Promise<R> => axios.patch(url, data, config)
        }
    };
}

const bolt = createBoltClient<Handlers, typeof routes>();

const req = bolt('index').post('/', { id: 1 });

export default createBoltClient;


