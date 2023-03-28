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
	'@keyframes skeleton-loading': {
		'0%': {
			'background-color': '#EDF2F7',
		},
		'100%': {
			'background-color': '#A0AEC0',
		},
	},
	'.skeleton-pulse': {
		animation: 'skeleton-loading 1s linear infinite alternate',
	},
	'.skeleton-pulse-medium': {
		animation: 'skeleton-loading 0.5s linear infinite alternate',
	},
	'.skeleton-pulse-fast': {
		animation: 'skeleton-loading 0.25s linear infinite alternate',
	},
};

export default tailwindUtilities;
