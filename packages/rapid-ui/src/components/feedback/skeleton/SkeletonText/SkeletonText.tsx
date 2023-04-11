import React from 'react';
import { RapidStyles } from '../../../../utils';
import classNames from '../../../../conditional';
import { twMerge } from 'tailwind-merge';
import { VStack } from '../../../layout';
import type { Spacing } from '../../../../types';
import type { Speed } from '..';

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
	isLoading?: boolean;
	numberOfLines?: number;
	speed?: Speed;
	lineSpacing?: Spacing;
	containerStyles?: string;
	styles?: string;
}

const RAPID_CLASSNAME = 'rapid-skeleton';
const SKELETON_TEXT_STYLES = 'h-3 w-full rounded-md';

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
	(
		{
			styles,
			containerStyles,
			lineSpacing,
			isLoading = true,
			numberOfLines = 4,
			speed,
		},
		ref,
	) => {
		return (
			<VStack styles={containerStyles} spacing={lineSpacing}>
				{Array.from(Array(numberOfLines).keys()).map(
					(number, index) => {
						return (
							<div
								key={index + number}
								ref={ref}
								className={twMerge(
									RapidStyles(
										styles,
										SKELETON_TEXT_STYLES,
										RAPID_CLASSNAME,
									),
									classNames({
										condition: isLoading,
										classNames: speed || 'skeleton-pulse',
									}),
								)}
							/>
						);
					},
				)}
			</VStack>
		);
	},
);

SkeletonText.displayName = 'SkeletonText';

export default SkeletonText;
