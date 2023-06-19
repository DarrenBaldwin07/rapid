import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: Props) => {
  const codeRef = useRef<any>();
  const [isShowingCopy, setIsShowingCopy] = useState(false);

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, []);

  return (
    <div className='rounded-lg' onMouseEnter={() => setIsShowingCopy(true)}>
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>

  );
};

export default CodeBlock;
