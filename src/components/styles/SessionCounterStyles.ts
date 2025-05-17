import styled, { keyframes } from 'styled-components';

const rotateSlow = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.3); }
  50% { box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.6); }
  100% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.3); }
`;

export const SessionCounterContainer = styled.div`
  position: relative;
  margin-top: 1.25rem;
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(8px);
  transition: all 0.5s ease-out;
  
  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const BackgroundElement = styled.div`
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  transform: rotate(45deg);
  pointer-events: none;
  z-index: 0;
  animation: ${rotateSlow} 60s linear infinite;
`;

export const SessionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 10;
`;

export const SessionText = styled.span<{ color: string }>`
  font-weight: 500;
  letter-spacing: 0.025em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: ${props => props.color};
`;

export const SessionIndicatorsContainer = styled.div`
  display: flex;
  gap: 0.375rem;
  margin-top: 0.75rem;
`;

export const SessionIndicator = styled.div<{ isCompleted: boolean; primaryColor: string; primaryRgb: string }>`
  position: relative;
  height: 0.625rem;
  flex: 1;
  overflow: hidden;
  border-radius: 0.125rem;
  transition: all 0.5s ease-out;
  background: ${props => props.isCompleted ? props.primaryColor : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: ${props => props.isCompleted ? `0 0 10px rgba(${props.primaryRgb}, 0.5)` : 'none'};
  animation: ${props => props.isCompleted ? glow : 'none'} 2s infinite ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    animation: ${props => props.isCompleted ? 'shimmer 2s infinite' : 'none'};
  }
  
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;