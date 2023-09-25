import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NpmInstall = () => {
	return (
		<div className='bg-grey border-lightGrey flex w-full items-center justify-between gap-2 rounded-full border transition-all duration-100 ease-out hover:cursor-copy hover:bg-[#1D1C21]'>
			<code className='py-1 pl-4 text-xs text-white'>
				npm install coming-soon
			</code>
			<div className='py-2 pr-2'>
				<div className='bg-lightGrey rounded-full p-2 text-white'>
					<FontAwesomeIcon
						icon={['fal', 'copy']}
						width={12}
						height={12}
						color='white'
					/>
				</div>
			</div>
		</div>
	);
};

export default NpmInstall;
