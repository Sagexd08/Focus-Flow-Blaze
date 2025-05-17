
import React from 'react';
import { cn } from '@/lib/utils';
import {
  ProgressContainer,
  ProgressSvg,
  BackgroundCircle,
  ProgressCircle,
  ContentContainer
} from './styles/CircularProgressTimerStyles';

interface CircularProgressTimerProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  color?: string;
}

const CircularProgressTimer: React.FC<CircularProgressTimerProps> = ({
  progress,
  size = 300,
  strokeWidth = 16,
  className,
  children,
  color = 'stroke-primary'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  
  return (
    <ProgressContainer className={className}>
      <ProgressSvg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <BackgroundCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <ProgressCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          color={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </ProgressSvg>
      
      {/* Content inside the circle */}
      <ContentContainer>
        {children}
      </ContentContainer>
    </ProgressContainer>
  );
};

export default CircularProgressTimer;
