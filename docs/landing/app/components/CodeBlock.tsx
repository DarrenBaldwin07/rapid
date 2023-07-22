import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	language: string;
	code: string;
}

const CodeBlock = ({ language, code }: Props) => {
	const codeRef = useRef<HTMLDivElement>(null);
	const [isShowingCopy, setIsShowingCopy] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		Prism.highlightElement(codeRef.current as Element);
	}, []);

	return (
		<div
			className='z-2 mt-6'
			onMouseOver={() => setIsShowingCopy(true)}
			onMouseLeave={() => setTimeout(() => setIsShowingCopy(false), 250)}
		>
			<div className='flex w-full justify-between rounded-lg bg-[#282C34]'>
				<pre ref={codeRef as any} className={`language-${language}`}>
					{code}
				</pre>
				<div>
					{isShowingCopy && (
						<button
							className='m-2 flex self-end rounded-lg border border-[#27272D] bg-[#18181C] p-2 text-white transition-all duration-100 ease-linear'
							onClick={() => {
								navigator.clipboard.writeText(code);
								setIsShowingCopy(false);
								setIsCopied(true);
								setTimeout(() => {
									setIsCopied(false);
								}, 1000);
							}}
						>
							<FontAwesomeIcon
								icon={isCopied ? faCheck : faCopy}
								color='white'
								size='sm'
								width={16}
								height={16}
							/>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CodeBlock;
