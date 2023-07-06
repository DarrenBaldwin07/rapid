import React from 'react';
import { Text } from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
	routes: string[];
}

export const BreadCrumb = ({ routes }: Props) => {
	return (
		<div className='mb-6 flex items-center'>
			<Text styles='gradient-text uppercase text-xs exclude-from-markdown'>
				{routes[0]}
			</Text>
			{routes.slice(1).map((route, index) => {
				return (
					<div key={index} className='flex items-center'>
						<FontAwesomeIcon
							icon={faChevronRight}
							size='sm'
							width={6}
							height={6}
							color='white'
							className='mx-2'
						/>
						<Text styles='text-white text-xs exclude-from-markdown'>
							{route}
						</Text>
					</div>
				);
			})}
		</div>
	);
};
