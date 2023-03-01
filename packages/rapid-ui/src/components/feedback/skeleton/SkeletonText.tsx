import React from 'react';
import { RapidStyles } from '../../../utils';
import classNames from '../../../conditional';
import { twMerge } from 'tailwind-merge';
import { VStack } from '../../layout';
import type { Spacing } from '../../../types';

const RAPID_CLASSNAME = 'rapid-skeleton';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
	isLoading?: boolean;
    containerStyles?: string;
    lineSpacing?: Spacing;
    numberOfLines?: number;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ styles, containerStyles, lineSpacing, isLoading = true, numberOfLines = 4 }, ref) => {
		const defaultStyles = 'h-6 w-40 rounded-md';
		return (
            <VStack styles={containerStyles} spacing={lineSpacing}>
                {Array.from(Array(numberOfLines).keys()).map((number, index) => {
                    return (
                        <div
                            key={index + number}
                            ref={ref}
                            className={twMerge(
                                RapidStyles(
                                    styles,
                                    defaultStyles,
                                    RAPID_CLASSNAME,
                                ),
                                classNames({
                                    condition: isLoading,
                                    classNames: 'skeleton-pulse',
                                }),
                            )}
                        />
                    )
                })}
            </VStack>
		);
	},
);

SkeletonText.displayName = "SkeletonText";

export default SkeletonText;
