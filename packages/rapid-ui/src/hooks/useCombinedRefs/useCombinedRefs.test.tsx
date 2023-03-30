import React, { createRef, forwardRef } from 'react';
import { test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useCombinedRefs } from './';

/**
 * TestComponent is a simple example that demonstrates the usage of the useCombinedRefs hook.
 * 
    It receives an external ref (ref) and an onRender callback as props. The TestComponent creates
    an internal ref (internalRef) and combines it with the external ref using the useCombinedRefs hook.
    The combined ref (combinedRef) is then attached to the button element. When the button is clicked,
    the onRender callback is invoked with the combinedRef. This allows us to verify that both external
    and internal refs have access to the button's DOM node, ensuring that the useCombinedRefs hook
    works as expected.
 */

interface TestComponentProps {
	onRender?: (element: HTMLButtonElement | null) => void;
}

const TestComponent = forwardRef<HTMLButtonElement, TestComponentProps>(
	({ onRender }, ref) => {
		const localRef = React.useRef<HTMLButtonElement>(null);
		const combinedRef = useCombinedRefs(ref, localRef);

		React.useEffect(() => {
			if (onRender) {
				onRender(localRef.current);
			}
		}, [onRender]);

		return <button ref={combinedRef}>Click me</button>;
	},
);

test('TestComponent should use the combined ref', async () => {
	const externalRef = createRef<HTMLButtonElement>();

	const onRender = vi.fn();
	const { getByText } = render(
		<TestComponent ref={externalRef} onRender={onRender} />,
	);

	const button = getByText(/click me/i);
	fireEvent.click(button);

	expect(externalRef.current).not.toBeNull();
	expect(externalRef.current).toBeInstanceOf(HTMLButtonElement);
	expect(onRender).toHaveBeenCalledTimes(1);
	expect(onRender).toHaveBeenCalledWith(externalRef.current);
});
