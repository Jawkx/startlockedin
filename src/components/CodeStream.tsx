import React, { useEffect, useRef } from 'react';

interface CodeStreamProps {
  code: string;
  speed: number;
  isPlaying: boolean;
  style?: React.CSSProperties;
}

const CodeStream: React.FC<CodeStreamProps> = ({
  code,
  speed,
  isPlaying,
  style = {}
}) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    let timeoutId: number;

    const typeCode = () => {
      if (!codeRef.current || !isPlaying) return;

      if (currentIndexRef.current < code.length) {
        codeRef.current.textContent = code.slice(0, currentIndexRef.current + 1);
        currentIndexRef.current++;
        timeoutId = window.setTimeout(typeCode, speed);
      } else {
        currentIndexRef.current = 0;
        timeoutId = window.setTimeout(() => {
          if (codeRef.current) codeRef.current.textContent = '';
          typeCode();
        }, 1500);
      }
    };

    if (isPlaying) {
      typeCode();
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [code, speed, isPlaying]);

  return (
    <pre
      ref={codeRef}
      className={`absolute overflow-hidden whitespace-pre font-mono text-sm leading-relaxed p-4 text-emerald-500`}
      style={style}
    />
  );
};

export default CodeStream;
