import styled, { keyframes } from 'styled-components';

// Container for the 3D timer with perspective transform
export const TimerContainer = styled.div<{ rotateX?: number; rotateY?: number }>`
  position: relative;
  width: 16rem; /* w-64 */
  height: 16rem; /* h-64 */
  transition: transform 0.3s ease-out;
  transform: ${({ rotateX = 0, rotateY = 0 }) => 
    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`};
  transform-style: preserve-3d;
`;

// Outer circle of the timer
export const TimerCircle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px; /* rounded-full */
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

// Progress indicator with gradient background
export const ProgressIndicator = styled.div<{ progress: number; colorClass: string }>`
  position: absolute;
  inset: 0;
  background: ${({ colorClass }) => {
    switch(colorClass) {
      case 'work': return 'linear-gradient(to bottom right, #a855f7, #ec4899)';
      case 'shortBreak': return 'linear-gradient(to bottom right, #4ade80, #14b8a6)';
      case 'longBreak': return 'linear-gradient(to bottom right, #60a5fa, #6366f1)';
      default: return 'linear-gradient(to bottom right, #a855f7, #ec4899)';
    }
  }};
  clip-path: ${({ progress }) => `conic-gradient(from 0deg, currentColor ${progress * 100}%, transparent 0)`};
`;

// Inner circle with time display
export const InnerCircle = styled.div`
  position: absolute;
  inset: 1rem; /* inset-4 */
  border-radius: 9999px; /* rounded-full */
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Time text display
export const TimeText = styled.div`
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700; /* font-bold */
  color: white;
`;

// 3D effect overlays
export const TopGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px; /* rounded-full */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  opacity: 0.5;
`;

export const BottomGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px; /* rounded-full */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0.3;
`;