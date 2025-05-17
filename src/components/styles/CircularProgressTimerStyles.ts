import styled from 'styled-components';

export const ProgressContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressSvg = styled.svg`
  transform: rotate(-90deg);
`;

export const BackgroundCircle = styled.circle`
  stroke: rgba(115, 115, 115, 0.2);
  fill: none;
`;

export const ProgressCircle = styled.circle<{ color?: string }>`
  stroke: ${({ color }) => {
    switch(color) {
      case 'stroke-primary': return 'var(--primary)';
      case 'stroke-green-500': return '#10b981';
      case 'stroke-blue-500': return '#3b82f6';
      case 'stroke-muted': return 'rgba(115, 115, 115, 0.2)';
      default: return 'var(--primary)';
    }
  }};
  fill: none;
  transition: all 0.2s;
`;

export const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;