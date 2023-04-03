import React, { MutableRefObject } from 'react';

const useCombinedRefs = <T>(
	...refs: Array<
		MutableRefObject<T | null> | ((instance: T | null) => void) | null
	>
): MutableRefObject<T | null> => {
	const targetRef = React.useRef<T | null>(null);

	React.useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef;
};

export default useCombinedRefs;
