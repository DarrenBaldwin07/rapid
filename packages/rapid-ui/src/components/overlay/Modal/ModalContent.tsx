import React from 'react';
import { RapidStyles } from '../../../utils';
import { HeadlessModalTyped } from './Modal';
import { ScaleFade } from '../../transition';

const RAPID_CLASSNAME = 'rapid-modal-content';

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
    containerStyles?: string;
};

const ModalContent = React.forwardRef<React.ElementRef<typeof HeadlessModalTyped.Panel>, ModalContentProps>(({ styles, containerStyles, ...rest }, ref) => {
  const defaultPanelStyles = 'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all';
  const defaultContainerStyles = 'fixed inset-0 flex items-center justify-center p-4';
  return (
    <div className={RapidStyles(containerStyles || defaultContainerStyles, 'rapid-modal-panel-container')}>
      <ScaleFade>
        <HeadlessModalTyped.Panel
          className={RapidStyles(styles || rest.className, defaultPanelStyles, RAPID_CLASSNAME)}
          {...rest}
          ref={ref}
          as='div'
        />
      </ScaleFade>
    </div>
  )
})

ModalContent.displayName = 'ModalContent';

export default ModalContent
