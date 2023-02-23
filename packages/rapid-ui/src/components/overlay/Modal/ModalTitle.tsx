import React from 'react';
import { RapidStyles } from '../../../utils';
import { HeadlessModalTyped } from './Modal';

// This component is not themeable -- we could change this in the future
const RAPID_CLASSNAME = 'rapid-modal-title';

interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    styles?: string;
}

const ModalTitle = React.forwardRef<React.ElementRef<typeof HeadlessModalTyped.Title>, ModalTitleProps>(({ styles,...rest}, ref) => {
  return (
    <HeadlessModalTyped.Title
        className={RapidStyles(styles || rest.className, RAPID_CLASSNAME)}
        {...rest}
        ref={ref}
    />

  )
})

export default ModalTitle
