import React from 'react';
import { RapidStyles } from '../../../utils';

type TextType =
	| 'p'
	| 'span'
	| 'i'
	| 'b'
	| 'u'
	| 'abbr'
	| 'cite'
	| 'kbd'
	| 'mark'
	| 's'
	| 'samp'
	| 'sup';

interface HeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
	styles?: string;
	as?: TextType;
}

const THEME_CLASSNAME = 'rapid-text';

const Text = React.forwardRef<HTMLParagraphElement, HeadingProps>(
	({ styles, as = 'p', ...rest }, ref) => {
		const Component = (type: TextType) => {
			switch (type) {
				case 'p':
					return (
						<p
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'span':
					return (
						<span
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'i':
					return (
						<i
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'b':
					return (
						<b
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'u':
					return (
						<u
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'abbr':
					return (
						<abbr
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'cite':
					return (
						<cite
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'kbd':
					return (
						<kbd
							ref={ref}
							{...rest}
							className={RapidStyles(styles, THEME_CLASSNAME)}
						/>
					);
				case 'mark':
					return (
						<mark
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 's':
					return (
						<s
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'samp':
					return (
						<samp
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
				case 'sup':
					return (
						<sup
							ref={ref}
							{...rest}
							className={RapidStyles(
								styles || rest.className,
								THEME_CLASSNAME,
							)}
						/>
					);
			}
		};
		return Component(as);
	},
);

Text.displayName = 'Text';

export default Text;
