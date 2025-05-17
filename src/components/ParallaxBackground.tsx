import React, { useEffect, useState } from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className
}) => {
  const { settings, backgroundTheme, mode } = usePomodoro();
  const { colors } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track scroll position for parallax effect
  useEffect(() => {
    if (!settings.enableParallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [settings.enableParallax]);

  // Track mouse position for mouse-based parallax effect
  useEffect(() => {
    if (!settings.enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5, // -0.5 to 0.5
        y: e.clientY / window.innerHeight - 0.5 // -0.5 to 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [settings.enableParallax]);

  // Get background class based on theme and mode
  const getBackgroundClass = () => {
    const modeClasses = {
      work: {
        default: 'bg-gradient-1',
        nature: 'bg-nature-work',
        abstract: 'bg-abstract-work',
        gradient: 'bg-gradient-4'
      },
      shortBreak: {
        default: 'bg-gradient-2',
        nature: 'bg-nature-short',
        abstract: 'bg-abstract-short',
        gradient: 'bg-gradient-5'
      },
      longBreak: {
        default: 'bg-gradient-3',
        nature: 'bg-nature-long',
        abstract: 'bg-abstract-long',
        gradient: 'bg-gradient-6'
      }
    };

    return modeClasses[mode][backgroundTheme];
  };

  // Calculate parallax transform based on scroll position and mouse movement
  const getParallaxStyle = () => {
    if (!settings.enableParallax) return {};

    return {
      transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <div className={cn(
      'relative min-h-screen overflow-hidden',
      className
    )}>
      {/* Parallax background */}
      <div
        className={cn(
          'absolute inset-0 -z-10',
          settings.enableParallax && 'transition-transform'
        )}
        style={{
          ...getParallaxStyle(),
          background: colors.background
        }}
      >
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="animate-floating absolute w-32 h-32 rounded-full blur-xl -top-10 -left-10"
            style={{ background: `${colors.primary}20` }} // 20 is hex for 12% opacity
          ></div>
          <div
            className="animate-floating-delay absolute w-40 h-40 rounded-full blur-xl top-1/2 right-10"
            style={{ background: `${colors.secondary}15` }} // 15 is hex for 8% opacity
          ></div>
          <div
            className="animate-pulse-slow absolute w-20 h-20 rounded-full blur-md bottom-10 left-1/3"
            style={{ background: `${colors.accent}20` }}
          ></div>

          {/* Additional particles for more visual interest */}
          <div
            className="animate-floating-slow absolute w-24 h-24 rounded-full blur-lg top-1/4 left-1/4"
            style={{ background: `${colors.primary}10` }}
          ></div>
          <div
            className="animate-pulse-slow absolute w-16 h-16 rounded-full blur-md top-3/4 right-1/4"
            style={{ background: `${colors.secondary}15` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
