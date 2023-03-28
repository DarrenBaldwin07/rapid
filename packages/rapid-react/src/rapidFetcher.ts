import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { RapidWebHandlerType } from './types';


type FetchKey<T extends RapidWebHandlerType> = keyof T['queries'] | keyof T['mutations'];

function rapidFetcher<T extends RapidWebHandlerType, Key extends FetchKey<T>>() {
    type Postbody = T['mutations'][Key]['body'];

    return {
        post: <T = any, R = AxiosResponse<T, any>, D = Postbody>(url: string, data?: Postbody, config?: AxiosRequestConfig<D>): Promise<R> => axios.post(url, data, config),
        get: axios.get,
        delete: axios.delete,
        put: axios.put,
        patch: axios.patch
    };

}

export default rapidFetcher;
