import React, { useEffect, useState } from 'react';
import { Text } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Github from '../../assets/github.svg';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNextDocPathName, shouldShowDocsNavigation } from '../routes/docs';

const NextDoc = () => {
	const [pathName, setPathName] = useState<string>();
	const [isShowingDocsNavigation, setIsShowingDocsNavigation] =
		useState(false);

	useEffect(() => {
		setPathName(window.location.pathname);
		setIsShowingDocsNavigation(
			shouldShowDocsNavigation(pathName as string),
		);
	}, [pathName]);

	return (
		<>
			{isShowingDocsNavigation && (
				<div className='mt-16 flex flex-col items-center gap-4 md:flex-row'>
					<a
						href='https://github.com/Cincinnati-Ventures/rapid'
						className='exclude-from-markdown w-full no-underline md:w-1/3'
					>
						<div className='hover:border-mainBlue flex items-center gap-2 rounded-lg border-[0.5px] border-[#222222] p-4 transition-all duration-100 ease-linear'>
							<img width={24} src={Github} alt='github' />
							<Text className='text-sm font-bold text-white'>
								View on Github
							</Text>
						</div>
					</a>
					<Link
						to={getNextDocPathName(pathName).path}
						className='exclude-from-markdown w-full no-underline md:w-1/3'
					>
						<div className='hover:border-mainBlue flex items-center gap-2 rounded-lg border-[0.5px] border-[#222222] p-4 transition-all duration-100 ease-linear'>
							<FontAwesomeIcon
								icon={faChevronRight}
								color='white'
								width={20}
								height={20}
							/>
							<Text className='text-sm font-bold text-white'>
								Next Doc: {getNextDocPathName(pathName)?.text}
							</Text>
						</div>
					</Link>
				</div>
			)}
		</>
	);
};

export default NextDoc;
