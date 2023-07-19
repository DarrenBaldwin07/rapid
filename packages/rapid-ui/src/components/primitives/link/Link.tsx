import React from 'react';
import { RapidStyles } from '../../../utils';
type LinkType = 'a';
interface LinkProps extends HTMLAnchorElement {
	styles?: string;
	as?: LinkType;
}

const THEME_CLASSNAME = 'rapid-link';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ styles, as = 'a', ...rest }, ref) => {
		const Component = (type: LinkType) => {
			switch (type) {
				case 'a':
					return (
						<a
							ref={ref}
							className={RapidStyles(
								styles || rest.className,
								'', //defaultStyles
								THEME_CLASSNAME,
							)}
						/>
					);
			}
		};
		return Component(as);
	},
);

Link.displayName = 'Link';

export default Link;
