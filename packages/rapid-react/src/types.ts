export interface RapidWebHandlerType {
    queries: {
        [key: string]: TypedQueryHandler
    },
    mutations: {
        [key: string]: TypedMutationHandler
    }
}

export interface TypedMutationHandler {
    type: 'post' | 'get' | 'put' | 'delete' | 'patch',
    query_params?: any,
    path?: any,
    input?: any,
    output: any
}

export interface TypedQueryHandler {
    type: 'post' | 'get' | 'put' | 'delete' | 'patch';
    query_params?: any;
    path?: any;
    output: any
}

export interface BoltRoutes {
    [key: string]: string
}
