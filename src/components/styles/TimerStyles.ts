import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% { text-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5); }
  50% { text-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8); }
  100% { text-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5); }
`;

const scalePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  transition: all 0.5s ease;
  position: relative;
`;

export const PomodoroContainer = styled.div`
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10;
`;

export const Title = styled.h1`
  color: ${props => props.theme.primary};
  text-align: center;
  font-size: 3rem;
  margin-bottom: 30px;
  font-weight: 800;
  text-shadow: 0 0 20px ${props => props.theme.primary}60;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.secondary});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${glow} 3s ease-in-out infinite;
`;

export const TimerCard = styled.div`
  padding: 30px;
  background: ${props => props.theme.cardBackground};
  border-radius: 20px;
  color: ${props => props.theme.text};
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.primary}20;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.3),
                0 0 30px ${props => props.theme.primary}40,
                inset 0 0 15px rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 80%
    );
    transform: rotate(30deg);
    z-index: 0;
    pointer-events: none;
  }
`;

export const TimerHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  color: ${props => props.theme.primary};
  letter-spacing: 0.5px;
`;

export const TimerDisplay = styled.div`
  font-size: 5rem;
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 15px ${props => props.theme.primary}80;
  color: ${props => props.theme.text};
  letter-spacing: 2px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

export const TimerButton = styled.button`
  padding: 14px 28px;
  border-radius: 30px;
  border: none;
  background: ${props => props.theme.buttonBg};
  color: ${props => props.theme.buttonText};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px ${props => props.theme.primary}40;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.theme.primary}60;
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px ${props => props.theme.primary}40;
  }
  
  &.animate-scale-pulse {
    animation: ${scalePulse} 2s ease-in-out infinite;
  }
`;

export const SettingsButton = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1px solid ${props => props.theme.primary}30;
  border-radius: 25px;
  padding: 10px 20px;
  color: ${props => props.theme.text};
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px ${props => props.theme.primary}20;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.primary}30;
  }
`;

export const SettingsContainer = styled.div`
  margin-top: 20px;
`;

export const Footer = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
  color: ${props => props.theme.text};
  
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      text-decoration: underline;
      opacity: 0.9;
    }
  }
`;