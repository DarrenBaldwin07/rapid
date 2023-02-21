// Tailwind Utility classes we want to use inside of the consumers tailwindConfig
const tailwindUtilities = {
	'.spinner-slow': {
		animation: 'spin 3s linear infinite',
		'@keyframes spin': {
			from: {
				transform: 'rotate(0deg)',
			},
			to: {
				transform: 'rotate(360deg)',
			},
		},
	},
	'.spinner-medium': {
		animation: 'spin 1.5s linear infinite',
		'@keyframes spin': {
			from: {
				transform: 'rotate(0deg)',
			},
			to: {
				transform: 'rotate(360deg)',
			},
		},
	},
	'.spinner-fast': {
		animation: 'spin 0.5s linear infinite',
		'@keyframes spin': {
			from: {
				transform: 'rotate(0deg)',
			},
			to: {
				transform: 'rotate(360deg)',
			},
		},
	},
	select: {
		'-moz-appearance': 'none',
		'-webkit-appearance': 'none',
	},
};

export default tailwindUtilities;
