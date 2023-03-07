import React from 'react';
import { RapidStyles } from '../../../../utils';
import classNames from '../../../../conditional';
import { twMerge } from 'tailwind-merge';
import type { Speed } from '..';

const RAPID_CLASSNAME = 'rapid-skeleton';

// Note: we do not want the user to be able to pass in children to the Skeleton component
interface SkeletonProps
	extends React.HTMLAttributes<Omit<HTMLDivElement, 'children'>> {
	styles?: string;
	isLoading?: boolean;
	speed?: Speed;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ styles, isLoading = true, speed = 'skeleton-pulse', ...rest }, ref) => {
		const defaultStyles = 'h-6 w-40 rounded-md';
		return (
			<div
				{...rest}
				ref={ref}
				className={twMerge(
					RapidStyles(
						styles || rest.className,
						defaultStyles,
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
