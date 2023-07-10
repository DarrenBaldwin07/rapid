import React from 'react';

interface SelectIconProps extends React.SVGProps<SVGSVGElement> {}

const SelectIcon = (props: SelectIconProps) => {
	return (
		<div className='pointer-events-none absolute right-0 top-1/2 mr-3 inline-flex -translate-y-1/2 items-center justify-center'>
			<svg
				pointerEvents='box-none'
				{...props}
				role='presentation'
				width='16px'
				height='16px'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 448 512'
			>
				<path
					fill='black'
					d='M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
				/>
			</svg>
		</div>
	);
};

export default SelectIcon;
