import React from 'react';
import DocsLinks from './DocsLinks';

const DocsSidebar = () => {
	return (
		<div className='z-10'>
			<div className='z-10 hidden h-screen w-44 flex-col gap-4 border-r-[0.5px] border-[#222222] md:flex lg:w-56'>
				<DocsLinks />
			</div>
		</div>
	);
};

export default DocsSidebar;
