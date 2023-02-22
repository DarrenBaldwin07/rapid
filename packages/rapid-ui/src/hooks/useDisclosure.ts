import React, { useState, useId } from 'react';

type HTMLProps = React.HTMLAttributes<HTMLElement>

/**
 * `useDisclosure` is a custom hook used to help handle frequent true/false user interactions (i.e modals, accordians, drawers, etc)
 * This component is simplier version of the `useDisclosure` hook in Chakra UI: https://chakra-ui.com/docs/hooks/use-disclosure
 */
function useDisclosure() {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = React.useCallback(() => setIsOpen((prev) => !prev), [isOpen, onOpen, onClose]);

    const uid = useId();
    const id = `disclosure-${uid}`;

    function getTriggerProps(props: HTMLProps = {}): HTMLProps {
        return {
          ...props,
          "aria-expanded": isOpen,
          "aria-controls": id, // This registers a aria control relationship between the trigger and the disclosure
          onClick(event) {
            props.onClick?.(event)
            onToggle()
          },
        }
    }

    function getDisclosureProps(props: HTMLProps = {}): HTMLProps {
        return {
            ...props,
            hidden: !isOpen,
            id, // This connects back to the id above (hence the aria control relationship where the button controls the disclosure)
        }
    }

    return { isOpen, onOpen, onClose, onToggle, getTriggerProps, getDisclosureProps };
}

export default useDisclosure;

