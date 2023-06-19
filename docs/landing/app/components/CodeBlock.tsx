import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
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
    <div className='rounded-lg relative'>
      <pre onMouseOver={() => setIsShowingCopy(true)} onMouseLeave={() => setTimeout(() => setIsShowingCopy(false), 250)}>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
        <div>
          {isShowingCopy && (
            <button
              className='absolute transition-all duration-100 ease-linear right-[15px] top-1/2 -translate-y-1/2 text-white bg-[#18181C] border border-[#27272D] p-[3.5px] rounded-lg'
              onClick={() => {
                navigator.clipboard.writeText(code);
                setIsShowingCopy(false);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
              }}
            >
              <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} color='white' size='sm' width={24} height={24} />
            </button>
          )}
        </div>
      </pre>
    </div>

  );
};

export default CodeBlock;
