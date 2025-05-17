import { createGlobalStyle } from 'styled-components';

export type ThemeType = 'dark' | 'light' | 'blue' | 'purple' | 'green' | 'sunset' | 'ocean';

export interface ThemeColors {
  background: string;
  cardBackground: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  buttonBg: string;
  buttonText: string;
}

export const themeColors: Record<ThemeType, ThemeColors> = {
  dark: {
    background: 'linear-gradient(to bottom, #0F172A, #1E293B, #334155)',
    cardBackground: 'linear-gradient(135deg, #334155 0%, #1E293B 50%, #0F172A 100%)',
    text: '#F8FAFC',
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    accent: '#F43F5E',
    buttonBg: 'rgba(139, 92, 246, 0.25)',
    buttonText: '#F8FAFC'
  },
  light: {
    background: 'linear-gradient(to bottom, #F8FAFC, #F1F5F9, #E2E8F0)',
    cardBackground: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)',
    text: '#0F172A',
    primary: '#6D28D9',
    secondary: '#0891B2',
    accent: '#E11D48',
    buttonBg: 'rgba(109, 40, 217, 0.1)',
    buttonText: '#6D28D9'
  },
  blue: {
    background: 'linear-gradient(to bottom, #0C4A6E, #0369A1, #0284C7)',
    cardBackground: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)',
    text: '#F0F9FF',
    primary: '#38BDF8',
    secondary: '#7DD3FC',
    accent: '#FB7185',
    buttonBg: 'rgba(56, 189, 248, 0.25)',
    buttonText: '#F0F9FF'
  },
  purple: {
    background: 'linear-gradient(to bottom, #581C87, #7E22CE, #9333EA)',
    cardBackground: 'linear-gradient(135deg, #A855F7 0%, #9333EA 50%, #7E22CE 100%)',
    text: '#FAF5FF',
    primary: '#D8B4FE',
    secondary: '#F0ABFC',
    accent: '#FBBF24',
    buttonBg: 'rgba(216, 180, 254, 0.25)',
    buttonText: '#FAF5FF'
  },
  green: {
    background: 'linear-gradient(to bottom, #14532D, #15803D, #16A34A)',
    cardBackground: 'linear-gradient(135deg, #22C55E 0%, #16A34A 50%, #15803D 100%)',
    text: '#F0FDF4',
    primary: '#86EFAC',
    secondary: '#BEF264',
    accent: '#FB923C',
    buttonBg: 'rgba(134, 239, 172, 0.25)',
    buttonText: '#F0FDF4'
  },
  sunset: {
    background: 'linear-gradient(to bottom, #7F1D1D, #B91C1C, #EF4444)',
    cardBackground: 'linear-gradient(135deg, #FCA5A5 0%, #F87171 50%, #EF4444 100%)',
    text: '#FEF2F2',
    primary: '#FECACA',
    secondary: '#FED7AA',
    accent: '#A78BFA',
    buttonBg: 'rgba(254, 202, 202, 0.25)',
    buttonText: '#FEF2F2'
  },
  ocean: {
    background: 'linear-gradient(to bottom, #164E63, #0E7490, #06B6D4)',
    cardBackground: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 50%, #0E7490 100%)',
    text: '#ECFEFF',
    primary: '#A5F3FC',
    secondary: '#BAE6FD',
    accent: '#F472B6',
    buttonBg: 'rgba(165, 243, 252, 0.25)',
    buttonText: '#ECFEFF'
  }
};

export const GlobalStyle = createGlobalStyle<{ theme: ThemeColors }>`
  :root {
    --primary: ${props => props.theme.primary};
    --primary-rgb: ${props => props.theme.primary.replace('#', '')};
    --secondary: ${props => props.theme.secondary};
    --secondary-rgb: ${props => props.theme.secondary.replace('#', '')};
    --accent: ${props => props.theme.accent};
    --accent-rgb: ${props => props.theme.accent.replace('#', '')};
    --background: ${props => props.theme.background};
    --card-bg: ${props => props.theme.cardBackground};
    --text: ${props => props.theme.text};
    --text-rgb: ${props => props.theme.text.replace('#', '')};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background: var(--background);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  /* Background animation */
  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 75%,
      transparent 100%
    );
    background-size: 200% 200%;
    z-index: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .bg-animation-enabled::before {
    opacity: 1;
    animation: backgroundShift 15s ease-in-out infinite;
  }

  /* Particles */
  .particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(var(--primary-rgb, 252, 165, 165), 0.5);
    pointer-events: none;
    z-index: 0;
  }

  @keyframes float-particle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(var(--x-end));
      opacity: 0;
    }
  }

  @keyframes backgroundShift {
    0% { background-position: 0% 0%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }

  @keyframes glow {
    0% { text-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5); }
    50% { text-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8); }
    100% { text-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5); }
  }
`;