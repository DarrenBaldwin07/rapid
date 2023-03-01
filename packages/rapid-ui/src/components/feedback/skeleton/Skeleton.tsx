import React from 'react';
import { RapidStyles } from '../../../utils';
import classNames from '../../../conditional';
import { twMerge } from 'tailwind-merge';

const RAPID_CLASSNAME = 'rapid-skeleton';

// Note: we do not want the user to be able to pass in children to the Skeleton component
interface SkeletonProps extends React.HTMLAttributes<Omit<HTMLDivElement, "children">> {
	styles?: string;
	isLoading?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ styles, isLoading = true, ...rest }, ref) => {
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
					classNames({
						condition: isLoading,
						classNames: 'skeleton-pulse',
					}),
				)}
			/>
		);
	},
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
