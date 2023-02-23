import React from 'react';
import { RapidStyles } from '../../../utils';
import { Dialog } from '@headlessui/react';
import { ExtractProps } from '../../../types';

// TODO: HeadlessUI still does not export component prop types -- later on we want to clean this up!
// See this issue: https://github.com/tailwindlabs/headlessui/issues/1394

const THEME_CLASSNAME = 'rapid-modal';

type ModalPropsTest = ExtractProps<typeof HeadlessModalTyped>;

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    styles?: string;
    open: boolean;
    onClose: () => void;
};

export const HeadlessModalTyped = Object.assign(Dialog, {
    Title: Dialog.Title,
    Description: Dialog.Description,
    Panel: Dialog.Panel,
});



const Modal = React.forwardRef<HTMLDivElement, ModalPropsTest>(({ styles, ...rest }, ref) => {
    return (
        <Dialog
            className={RapidStyles(styles || rest.className, THEME_CLASSNAME)}
            {...rest}
            ref={ref}
        />
    );
});



export default Modal;
