import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => (
  <div className="text-green-400 font-mono text-8xl">
    {formatTime(time)}
  </div>
);

export default Timer;
