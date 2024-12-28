import React, { useMemo } from 'react';
import CodeStream from './CodeStream';
import { snippets } from '../utils/codeSnippets';
import { generateRandomPosition, generateRandomSpeed } from '../utils/streamUtils';

interface CodeBackgroundProps {
  isPlaying: boolean;
}

const NUM_STREAMS = 30;

const CodeBackground: React.FC<CodeBackgroundProps> = ({ isPlaying }) => {
  const streams = useMemo(() => {
    return Array.from({ length: NUM_STREAMS }, (_, i) => ({
      id: i,
      code: snippets[Object.keys(snippets)[i % Object.keys(snippets).length]],
      speed: generateRandomSpeed(),
      style: generateRandomPosition(),
      opacity: 70
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {streams.map(({ id, code, speed, style }) => (
        <CodeStream
          key={id}
          code={code}
          speed={speed}
          isPlaying={isPlaying}
          style={style}
        />
      ))}
    </div>
  );
};

export default CodeBackground;
