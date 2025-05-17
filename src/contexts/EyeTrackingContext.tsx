import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePomodoro } from './PomodoroContext';

interface EyeTrackingContextProps {
  isTracking: boolean;
  eyePosition: { x: number, y: number } | null;
  startTracking: () => void;
  stopTracking: () => void;
  focusedElement: string | null;
}

const EyeTrackingContext = createContext<EyeTrackingContextProps | undefined>(undefined);

export const EyeTrackingProvider = ({ children }: { children: ReactNode }) => {
  const { settings } = usePomodoro();
  const [isTracking, setIsTracking] = useState(false);
  const [eyePosition, setEyePosition] = useState<{ x: number, y: number } | null>(null);
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  // Simulate eye tracking with mouse movement for demo purposes
  // In a real implementation, this would use a webcam and ML model
  useEffect(() => {
    if (!isTracking || !settings.enableEyeTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      setEyePosition({ x: e.clientX, y: e.clientY });
      
      // Determine which element is being "looked at"
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const id = element.id || element.className;
        setFocusedElement(id);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking, settings.enableEyeTracking]);

  // Auto-start tracking if enabled in settings
  useEffect(() => {
    if (settings.enableEyeTracking) {
      startTracking();
    } else {
      stopTracking();
    }
  }, [settings.enableEyeTracking]);

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setEyePosition(null);
    setFocusedElement(null);
  };

  const value = {
    isTracking,
    eyePosition,
    startTracking,
    stopTracking,
    focusedElement,
  };

  return (
    <EyeTrackingContext.Provider value={value}>
      {children}
    </EyeTrackingContext.Provider>
  );
};

export const useEyeTracking = () => {
  const context = useContext(EyeTrackingContext);
  if (context === undefined) {
    throw new Error('useEyeTracking must be used within an EyeTrackingProvider');
  }
  return context;
};
