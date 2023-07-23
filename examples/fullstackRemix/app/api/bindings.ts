// @generated automatically by Rapid-web (https://rapid.cincinnati.ventures). DO NOT CHANGE OR EDIT THIS FILE!

export interface Handlers {
	queries: {
		index: {
			output: any;
			type: 'query';
			isDynamic: false;
		};

		hello: {
			output: string;
			type: 'query';
			isDynamic: false;
		};
	};
	mutations: {};
}

export const routes = {
	index: {
		url: '/',
		type: 'query',
	},
	hello: {
		url: '/hello',
		type: 'query',
	},
} as const;
