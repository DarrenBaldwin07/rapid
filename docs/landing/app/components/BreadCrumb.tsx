import React from 'react';
import { Text } from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { toUpperCased } from '../helpers';

interface Props {
  routes: string[];
}

export const BreadCrumb = ({ routes }: Props) => {
  return (
    <div className='flex items-center mb-6 z-10'>
      <Text styles='gradient-text uppercase text-xs z-10'>{routes[0]}</Text>
      {routes.slice(1).map((route, index) => {
        return (
          <div key={index} className='flex items-center z-10'>
            <FontAwesomeIcon icon={faChevronRight} size='sm' width={6} height={6} color='white' className='mx-2' />
            <Text styles='text-white text-xs'>{route}</Text>
          </div>
        )
      })}
    </div>
  )
}
