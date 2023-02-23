import React from 'react';
import { RapidStyles } from '../../../utils';
import { ScaleFade } from '../../transition';

const RAPID_CLASSNAME = 'rapid-modal-overlay';

interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
};

const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(({ styles, ...rest }, ref) => {
  const defaultOverlayStyles = 'fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm';
  return (
    <ScaleFade>
      <div
        className={RapidStyles(styles || rest.className, defaultOverlayStyles, RAPID_CLASSNAME)}
        {...rest}
        ref={ref}
        aria-hidden="true"
      />
    </ScaleFade>
  )
})

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay
