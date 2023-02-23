import React from 'react';
import { RapidStyles } from '../../../utils';
import { HeadlessModalTyped } from './Modal';

const RAPID_CLASSNAME = 'rapid-modal-content';

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
};

const ModalContent = React.forwardRef<React.ElementRef<typeof HeadlessModalTyped.Panel>, ModalContentProps>(({ styles, ...rest }, ref) => {
  return (
    <HeadlessModalTyped.Panel
        className={RapidStyles(styles || rest.className, RAPID_CLASSNAME)}
        {...rest}
        ref={ref}

    />
  )
})

export default ModalContent
