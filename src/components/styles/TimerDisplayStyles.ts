import styled from 'styled-components';

export const TimerDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

export const TimerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const TimerText = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: ${props => props.theme.text || 'white'};
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  margin: 1rem 0;
  letter-spacing: 2px;
`;

export const ModeText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.text || 'white'};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SplineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.8;
`;

export const BackgroundContainer = styled.div<{ backgroundMode: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
  transition: all 0.5s ease;
  background: ${({ backgroundMode }) => {
    switch (backgroundMode) {
      case 'bg-gradient-1':
        return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
      case 'bg-gradient-2':
        return 'linear-gradient(135deg, #0f3443 0%, #34e89e 100%)';
      case 'bg-gradient-4':
        return 'linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)';
      case 'bg-nature-work':
        return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
      case 'bg-abstract-work':
        return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
      default:
        return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    }
  }};
`;