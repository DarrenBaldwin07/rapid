import { useEffect, useId, Children, cloneElement, useCallback } from 'react';
import {
	useFloating,
	offset,
	flip,
	shift,
	autoUpdate,
} from '@floating-ui/react-dom';
import { ScaleFade } from '../../transition';
import { AnimatePresence } from 'framer-motion';
import useDisclosure from '../../../hooks/useDisclosure';
import { RapidStyles, getVariantClassName } from '../../../utils';
import { Text } from '../../primitives';
import { createVariant } from '../../../theme';
import { Portal } from '../../utilities/portal';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactElement;
	shouldCloseOnSroll?: boolean;
	label?: string;
	id?: string;
	styles?: string;
	orientation?: 'top' | 'bottom' | 'left' | 'right';
	isAnimated?: boolean;
	variant?: string;
}

export const tooltipTheme = createVariant({
	baseStyle: 'rounded-[13px] py-1 px-2',
	variants: {
		default: 'bg-main text-white',
		outline: 'bg-white border border-lightGrey text-main',
		destructive: 'bg-danger text-white',
		unstyled: 'text-black',
	},
	defaultProps: {
		variant: 'default',
	},
});

const THEME_CLASSNAME = 'rapid-tooltip';

/**
 * Tooltips display descriptions about (usually) interactive elements when the user hovers over or focuses on the element.
 *
 * @see Docs     (Coming soon)
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
const Tooltip = (props: TooltipProps) => {
	const {
		children,
		shouldCloseOnSroll,
		label,
		id,
		styles,
		orientation = 'top',
		isAnimated = true,
		variant,
		...rest
	} = props;

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { x, y, strategy, refs } = useFloating({
		open: isOpen,
		placement: orientation,
		middleware: [offset(10), flip(), shift({ padding: 5 })],
		whileElementsMounted: autoUpdate,
	});

	// Declare a unique id for the tooltip element for aria compliance and accessibility
	const uuid = useId();
	const uid = id ?? uuid;
	const tooltipId = `rapid-tooltip-${uid}`;

	// Restrict children to a max of 1
	const child = Children.only(children) as React.ReactElement & {
		ref?: React.Ref<any>;
	};

	// Init our trigger props for the passed in child element fro the consumer
	const trigger: React.ReactElement = cloneElement(child, {
		...child.props,
		ref: refs.setReference,
		onPointerEnter: (e: PointerEvent) => {
			if (e.pointerType == 'touch') return;
			onOpen();
		},
		onPointerLeave: (e: PointerEvent) => {
			if (e.pointerType == 'touch') return;
			onClose();
		},
		onClick: () => {
			onClose();
			// If the user also specified an onClick handler, then we want to call that as well
			if (child?.props?.onClick) child.props.onClick();
		},
		onBlur: () => onClose(),
		onFocus: () => onOpen(),
		onPointerDown: () => handlePointerDown(),
		'aria-describedby': id,
	});

	// Init our event listeners for hiding/showing the tooltip
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[isOpen],
	);

	const handlePointerDown = useCallback(() => {
		if (isOpen) {
			onClose();
		}
	}, [isOpen]);

	const handleScroll = useCallback(() => {
		if (isOpen && shouldCloseOnSroll) {
			onClose();
		}
	}, [isOpen]);

	const handlePointerLeave = useCallback(() => {
		if (isOpen) {
			onClose();
		}
	}, [isOpen]);

	useEffect(() => {
		// Register event listeners
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('pointerDown', handlePointerDown);
		document.addEventListener('pointerLeave', handlePointerLeave);
		document.addEventListener('scroll', handleScroll);
		// Clean up and remove them on unmount
		() => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('pointerDown', handlePointerDown);
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// If the consumer did not provide a label, then we want to give them the children they passed in (no need to show an animate div with nothing)
	if (!label) {
		return <>{children}</>;
	}

	return (
		<>
			{trigger}
			<AnimatePresence>
				{isOpen && (
					<Portal>
						<div
							ref={refs.setFloating}
							style={{
								position: strategy,
								top: y ?? 0,
								left: x ?? 0,
							}}
						>
							<ScaleFade
								isEnabled={isAnimated}
								initialscale={0.85}
								exitAnimation='exit'
							>
								<div
									id={tooltipId}
									role='tooltip'
									className={RapidStyles(
										styles || rest.className,
										getVariantClassName(
											variant,
											'tooltip',
										) || THEME_CLASSNAME,
									)}
								>
									<Text styles='text-sm'>{label}</Text>
								</div>
							</ScaleFade>
						</div>
					</Portal>
				)}
			</AnimatePresence>
		</>
	);
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
