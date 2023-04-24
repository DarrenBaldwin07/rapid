// @generated automatically by Rapid-web (https://rapid.cincinnati.ventures). DO NOT CHANGE OR EDIT THIS FILE!

export interface Handlers {
	queries: {
		"index": {
  			output: any
  			type: 'get'
  			isDynamic: false
		},

		"hello": {
  			output: any
  			type: 'get'
  			isDynamic: false
		},
	},
	mutations: {},
}

export const routes = {
	"index": {
		url: '/',
		type: 'get',
	},
	"hello": {
		url: '/hello',
		type: 'get',
	},
} as const
