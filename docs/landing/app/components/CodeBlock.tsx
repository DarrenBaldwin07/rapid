import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";

const CodeBlock = ({ language, code }: any) => {
  const codeRef = useRef<any>();

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, []);

  return (
    <pre>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
