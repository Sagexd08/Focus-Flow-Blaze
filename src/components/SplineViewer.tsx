import React, { lazy, Suspense } from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineViewerProps {
  splineUrl: string;
  className?: string;
  isActive?: boolean; // Added: Timer active state
  mode?: 'work' | 'shortBreak' | 'longBreak'; // Added: Timer mode
}

// TODO: Utilize isActive and mode to change Spline behavior or scene
const SplineViewer: React.FC<SplineViewerProps> = ({ splineUrl: defaultSplineUrl, className, isActive, mode }) => {
  const { settings } = usePomodoro();

  // Function to determine which Spline scene to show based on timer state
  const getDynamicSplineUrl = () => {
    if (!isActive) {
      return "https://prod.spline.design/placeholder-paused/scene.splinecode"; // Placeholder for paused state
    }
    switch (mode) {
      case 'work':
        return "https://prod.spline.design/placeholder-work/scene.splinecode"; // Placeholder for work mode
      case 'shortBreak':
        return "https://prod.spline.design/placeholder-shortbreak/scene.splinecode"; // Placeholder for short break mode
      case 'longBreak':
        return "https://prod.spline.design/placeholder-longbreak/scene.splinecode"; // Placeholder for long break mode
      default:
        return defaultSplineUrl;
    }
  };

  const currentSplineUrl = getDynamicSplineUrl();

  if (!settings.enable3DAnimations) {
    return null;
  }

  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50">Loading 3D Scene...</div>}>
        <Spline scene={currentSplineUrl} />
      </Suspense>
    </div>
  );
};

export default SplineViewer;