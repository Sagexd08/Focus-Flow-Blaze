import React, { useEffect, useRef, useState } from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { useEyeTracking } from '@/contexts/EyeTrackingContext';
import { cn } from '@/lib/utils';
import {
  TimerContainer,
  TimerCircle,
  ProgressIndicator,
  InnerCircle,
  TimeText,
  TopGradientOverlay,
  BottomGradientOverlay
} from './styles/ThreeDTimerStyles';

interface ThreeDTimerProps {
  className?: string;
}

const ThreeDTimer: React.FC<ThreeDTimerProps> = ({ className }) => {
  const { settings, progress, timeLeft, mode } = usePomodoro();
  const { eyePosition } = useEyeTracking();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Format time left as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate 3D rotation based on eye position
  useEffect(() => {
    if (!settings.enable3DAnimations || !eyePosition || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle based on eye position relative to center
    const maxRotation = 15; // max rotation in degrees
    const rotateY = ((eyePosition.x - centerX) / window.innerWidth) * maxRotation;
    const rotateX = ((centerY - eyePosition.y) / window.innerHeight) * maxRotation;
    
    setRotation({ x: rotateX, y: rotateY });
  }, [eyePosition, settings.enable3DAnimations]);
  
  // Get color based on current mode
  const getProgressColor = () => {
    return mode;
  };
  
  if (!settings.enable3DAnimations) {
    return null;
  }
  
  return (
    <TimerContainer 
      ref={containerRef}
      className={className}
      rotateX={rotation.x}
      rotateY={rotation.y}
    >
      {/* 3D Timer Circle */}
      <TimerCircle>
        <ProgressIndicator 
          progress={progress}
          colorClass={getProgressColor()}
        />
        
        {/* Inner circle with time */}
        <InnerCircle>
          <TimeText>
            {formatTime(timeLeft)}
          </TimeText>
        </InnerCircle>
        
        {/* 3D effect elements */}
        <TopGradientOverlay />
        <BottomGradientOverlay />
      </TimerCircle>
    </TimerContainer>
  );
};

export default ThreeDTimer;
