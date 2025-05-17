
import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import CircularProgressTimer from './CircularProgressTimer';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { Button } from '@/components/ui/button';
import SplineViewer from './SplineViewer'; // Added SplineViewer import
import { cn } from '@/lib/utils';

const TimerDisplay: React.FC = () => {
  const { 
    isActive, 
    mode, 
    timeLeft, 
    progress,
    backgroundTheme,
    settings, // Added settings
    startTimer, 
    pauseTimer, 
    resetTimer,
    skipToNextSession
  } = usePomodoro();

  // Format time left as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get color based on current mode
  const getProgressColor = () => {
    switch(mode) {
      case 'work': return 'stroke-primary';
      case 'shortBreak': return 'stroke-green-500';
      case 'longBreak': return 'stroke-blue-500';
    }
  };

  // Get background color based on mode and theme
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

  // Get mode name
  const getModeName = () => {
    switch(mode) {
      case 'work': return 'Work';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
    }
  };

  return (
    <TimerDisplayContainer>
      {/* Background based on mode and theme */}
      <BackgroundContainer backgroundMode={getBackgroundClass()} />
      
      {/* Timer display */}
      <TimerWrapper>
        {/* Mode indicator */}
        <ModeText>
          {getModeName()}
        </ModeText>
        
        {/* Circular progress */}
        <CircularProgressTimer 
          progress={progress} 
          color={getProgressColor()}
          size={280}
          strokeWidth={12}
          className="mb-8 z-10"
        >
          {/* Time display */}
          <TimerText>
            {formatTime(timeLeft)}
          </TimerText>
        </CircularProgressTimer>
        
        {/* Control buttons */}
        <ButtonsContainer>
          <Button
            onClick={resetTimer}
            variant="outline" 
            size="icon"
            className="rounded-full bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30"
          >
            <RotateCcw className="h-5 w-5 text-white" />
          </Button>
          
          {isActive ? (
            <Button
              onClick={pauseTimer}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30"
            >
              <Pause className="h-5 w-5 text-white" />
            </Button>
          ) : (
            <Button
              onClick={startTimer}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30 animate-pulse-soft"
            >
              <Play className="h-5 w-5 text-white" />
            </Button>
          )}
          
          <Button
            onClick={skipToNextSession}
            variant="outline" 
            size="icon"
            className="rounded-full bg-white/20 border-white/30 backdrop-blur-sm hover:bg-white/30"
          >
            <SkipForward className="h-5 w-5 text-white" />
          </Button>
        </ButtonsContainer>
      </TimerWrapper>
      
      {/* 3D background if enabled */}
      {settings.enable3DAnimations && (
        <SplineContainer>
          <SplineViewer splineUrl="https://prod.spline.design/abcdef1234567890/scene.splinecode" isActive={isActive} mode={mode} />
        </SplineContainer>
      )}
    </TimerDisplayContainer>
  );
};

export default TimerDisplay;
