import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { RapidStyles } from '../../../../utils';
import { SlideFade } from '../../../transition';
import { useDidClickOutside, useMergeRefs } from '../../../../hooks';
import { useDrawerContext } from '../useDrawer';
import { DrawerSizes, DrawerDirections } from '../Drawer';

const RAPID_CLASSNAME = 'rapid-drawer-content';
const CONTAINER_CLASS = 'rapid-drawer-panel-container';

const DEFAULT_CONTAINER_STYLES = 'fixed';
const DEFAULT_PANEL_STYLES = 'flex flex-col item-start bg-white';

const DIRECTIONAL_CONTAINER_STYLES = {
	left: 'flex inset-y-0 left-0',
	right: 'flex inset-y-0 right-0',
	top: 'inset-x-0 top-0',
	bottom: 'inset-x-0 bottom-0',
};

const drawerPannelStyles = `${DEFAULT_PANEL_STYLES} w-full h-full`;

interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
	containerStyles?: string;
	children: ReactNode;
	styles?: string;
}

const buildContainerCSS = (
	direction: DrawerDirections,
	size: DrawerSizes,
): React.CSSProperties => {
	const sizePercentages: Record<DrawerSizes, string> = {
		sm: '20%',
		md: '40%',
		lg: '60%',
		xl: '80%',
		full: '100%',
	};

	const property =
		direction === 'left' || direction === 'right' ? 'width' : 'height';

	return { [property]: sizePercentages[size] };
};

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
	({ styles, containerStyles, children, ...rest }, ref) => {
		const { open, onClose, size, direction, enableAnimation, zIndex } =
			useDrawerContext();

		const clickOutsideRef = useDidClickOutside({
			onMatch: () => onClose(),
			enabled: true,
		});

		return (
			<div
				style={{
					...buildContainerCSS(direction, size),
					zIndex: zIndex ? zIndex + 1 : 50,
				}}
				className={RapidStyles(
					containerStyles,
					`${DEFAULT_CONTAINER_STYLES} ${DIRECTIONAL_CONTAINER_STYLES[direction]}`,
					CONTAINER_CLASS,
				)}
			>
				<SlideFade
					direction={direction}
					open={open}
					isEnabled={enableAnimation}
					styles='w-full h-full'
				>
					<div
						ref={useMergeRefs(ref, clickOutsideRef)}
						{...rest}
						className={RapidStyles(
							styles || rest.className,
							drawerPannelStyles,
							RAPID_CLASSNAME,
						)}
					>
						{children}
					</div>
				</SlideFade>
			</div>
		);
	},
);

export default DrawerContent;
