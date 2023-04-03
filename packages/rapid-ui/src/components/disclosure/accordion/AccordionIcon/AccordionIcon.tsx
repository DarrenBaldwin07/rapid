import React, { forwardRef } from 'react';
import { useCombinedRefs } from '../../../../hooks';
import { RapidStyles } from '../../../../utils';
import {
	useAccordionItemIndex,
	useAccordionIsOpen,
	useAccordionContext,
} from '../useAccordionHooks';

const RAPID_CLASSNAME = 'rapid-accordion-icon';

interface AccordionIconProps extends React.SVGProps<SVGSVGElement> {
	styles?: string;
}

const AccordionIcon = forwardRef<SVGSVGElement, AccordionIconProps>(
	({ styles, ...rest }, ref) => {
		const svgRef = React.useRef<SVGSVGElement>(null);
		const combinedRef = useCombinedRefs(ref, svgRef);
		const { activeItems } = useAccordionContext();
		const index = useAccordionItemIndex(svgRef);
		const isOpen = useAccordionIsOpen(index, activeItems);

		const iconStyles = `transition-transform duration-300 ${
			isOpen ? 'rotate-180 transform' : ''
		}`;

		return (
			<svg
				ref={combinedRef}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					iconStyles,
					RAPID_CLASSNAME,
				)}
				pointerEvents='box-none'
				role='presentation'
				width='16px'
				height='16px'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 448 512'
			>
				<path
					fill='black'
					d='M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
				/>
			</svg>
		);
	},
);
export default AccordionIcon;
