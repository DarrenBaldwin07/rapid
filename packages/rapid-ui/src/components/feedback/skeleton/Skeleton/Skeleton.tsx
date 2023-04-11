import React from 'react';
import { RapidStyles } from '../../../../utils';
import classNames from '../../../../conditional';
import { twMerge } from 'tailwind-merge';
import type { Speed } from '..';

// We do not want to enable users to pass in children to the Skeleton component
interface SkeletonProps
	extends React.HTMLAttributes<Omit<HTMLDivElement, 'children'>> {
	styles?: string;
	isLoading?: boolean;
	speed?: Speed;
}

const RAPID_CLASSNAME = 'rapid-skeleton';
const SKELETON_STYLES = 'h-6 w-full rounded-md';

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ styles, isLoading = true, speed = 'skeleton-pulse', ...rest }, ref) => {
		return (
			<div
				{...rest}
				ref={ref}
				className={twMerge(
					RapidStyles(
						styles || rest.className,
						SKELETON_STYLES,
						RAPID_CLASSNAME,
					),
					// The pulse className is merged with all the others so that it cannot get overridden by the user
					classNames({
						condition: isLoading,
						classNames: speed || 'skeleton-pulse',
					}),
				)}
			/>
		);
	},
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
