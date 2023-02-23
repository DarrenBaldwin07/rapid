import React from 'react';
import { RapidStyles } from '../../../utils';
import { HeadlessModalTyped } from './Modal';

const RAPID_CLASSNAME = 'rapid-modal-description';

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
};

const ModalDescription = React.forwardRef<React.ElementRef<typeof HeadlessModalTyped.Description>, ModalBodyProps>(({styles, ...rest}, ref) => {
  return (
    <HeadlessModalTyped.Description
        className={RapidStyles(styles || rest.className, RAPID_CLASSNAME)}
        {...rest}
        ref={ref}
    />
  )
})

export default ModalDescription
