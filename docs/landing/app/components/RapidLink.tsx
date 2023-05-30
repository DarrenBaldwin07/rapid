import React from 'react';
import { NavLink } from '@remix-run/react';

interface Props {
    to: string;
    text: string;
}

const RapidLink = ({ to, text }: Props) => {
  return (
    <NavLink to={to}>
        {text}
    </NavLink>
  )
}

export default RapidLink
