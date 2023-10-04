import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-toml';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	language: string;
	code: string;
	fileName?: string;
}

const CodeBlock = ({ language, code, fileName }: Props) => {
	const codeRef = useRef<HTMLDivElement>(null);
	const [isShowingCopy, setIsShowingCopy] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		Prism.highlightElement(codeRef.current as Element);
	}, []);

	return (
		<div
			className='mt-6 overflow-y-hidden'
			onMouseOver={() => setIsShowingCopy(true)}
			onMouseLeave={() => setTimeout(() => setIsShowingCopy(false), 250)}
		>
			<div className='flex flex-col rounded-lg bg-[#282C34] p-2'>
				<div className='flex w-full justify-between'>
					<pre
						ref={codeRef as any}
						className={`language-${language} no-scroll-bar z-10 text-sm`}
					>
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
				{fileName && (
					<div className='w-max self-end rounded-full border border-[#27272D] bg-[#18181C] px-2 py-1 text-xs text-white'>
						<pre>{fileName}</pre>
					</div>
				)}
			</div>
		</div>
	);
};

export default CodeBlock;
