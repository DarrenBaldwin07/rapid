import { useEffect, useRef } from 'react'

interface RefObject {
    /**
    * A Function that will be called when the user clicks outside of the element
    * @type {() => void}
    */
    onMatch: () => void;
    /**
     * Whether or not to enable the hook
     * @default true
     * @type {boolean}
    */
    enabled?: boolean;
};

/**
 * A hook that will call a function when the user clicks outside of the element
 * @param {RefObject} props
 * @returns {React.MutableRefObject<T>}
 * @example
 * const ref = useDidClickOutside({
 *    onMatch: () => console.log('Clicked outside of the element'),
 *   enabled: true
 * })
 * return <div ref={ref}>Click outside of me</div>
 *
*/
function useIsClickedOutside<T extends HTMLElement>(props: RefObject) {
    const { onMatch, enabled = true } = props;
    const reference = useRef<T>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (reference.current && !reference.current.contains(event.target as Node)) {
            onMatch();
        }
    }

    const handleTouchOutside = (event: TouchEvent) => {
        if (reference.current && !reference.current.contains(event.target as Node)) {
            onMatch();
        }
    }

    useEffect(() => {
        // Return early if consumer says so
        if (!enabled) return;

        // Get our document
        const doc = getOwnedDoc(reference.current);
        // Register listeners
        doc.addEventListener('mousedown', handleClickOutside);
        doc.addEventListener("touchstart", handleTouchOutside);

        return () => {
            // Unregister listeners
            doc.removeEventListener('mousedown', handleClickOutside);
            doc.removeEventListener("touchstart", handleTouchOutside);
        }
    }, [])
    return reference;
}

function getOwnedDoc(node?: Element | null): Document {
    return node?.ownerDocument ?? document
}


export default useIsClickedOutside;
