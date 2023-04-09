import { MutableRefObject, useRef, useEffect } from 'react';

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>;

const useCombinedRefs = <T>(...refs: (ReactRef<T> | undefined)[]) => {
	const targetRef = useRef<T | null>(null);

	useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				// @ts-ignore
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef;
};

export default useCombinedRefs;
