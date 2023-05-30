import React from 'react';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ request }) => {
  return null;
}

const DocsIntroduction = () => {
  return (
    <div className='text-white'>Introduction doc!</div>
  )
}

export default DocsIntroduction;
