import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
	node?: DocumentFragment;
}

const RAPID_CLASSNAME = 'rapid-portal';

// Currently, this is a internal Component that we are not re-exporting -- as we add more to it we can re-evaluate
const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
	(props: PortalProps, ref) => {
		const { node, ...portalProps } = props;

		return ReactDOM.createPortal(
			<div {...portalProps} ref={ref} className={RAPID_CLASSNAME} />,
			node || document.body,
		);
	},
);

Portal.displayName = 'Portal';

export default Portal;
