
export interface RapidWebHandlerType {
    queries: {
        [key: string]: TypedQueryHandler
    },
    mutations: {
        [key: string]: TypedMutationHandler
    }
}

interface TypedMutationHandler {
    type: 'post' | 'get' | 'put' | 'delete',
    query_params?: any,
    path?: any,
    body_type?: any
}

interface TypedQueryHandler {
    type: 'post' | 'get' | 'put' | 'delete';
    query_params?: any;
    path?: any;
}
