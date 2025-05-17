
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Sound effects
const TIMER_COMPLETE_SOUND = new URL('/timer-complete.mp3', import.meta.url).href;
const TIMER_START_SOUND = new URL('/timer-start.mp3', import.meta.url).href;
const BREAK_START_SOUND = new URL('/break-start.mp3', import.meta.url).href;

// Types
type TimerMode = 'work' | 'shortBreak' | 'longBreak';
type BackgroundTheme = 'default' | 'nature' | 'abstract' | 'gradient';

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLongBreak: number;
  autoStart: boolean;
  playSounds: boolean;
  highContrast: boolean;
  enableEyeTracking: boolean;
  enableParallax: boolean;
  enable3DAnimations: boolean;
  customSounds: {
    start: string;
    break: string;
    complete: string;
  };
}

interface TimerSession {
  mode: TimerMode;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  completed: boolean;
}

interface PomodoroContextProps {
  isActive: boolean;
  mode: TimerMode;
  timeLeft: number;
  progress: number;
  completedSessions: number;
  totalSessions: number;
  sessionHistory: TimerSession[];
  settings: TimerSettings;
  backgroundTheme: BackgroundTheme;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipToNextSession: () => void;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  setBackgroundTheme: (theme: BackgroundTheme) => void;
  uploadCustomSound: (type: 'start' | 'break' | 'complete', soundUrl: string) => void;
}

const defaultSettings: TimerSettings = {
  work: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
  sessionsBeforeLongBreak: 4,
  autoStart: false,
  playSounds: true,
  highContrast: false,
  enableEyeTracking: false,
  enableParallax: true,
  enable3DAnimations: true,
  customSounds: {
    start: TIMER_START_SOUND,
    break: BREAK_START_SOUND,
    complete: TIMER_COMPLETE_SOUND
  }
};

const PomodoroContext = createContext<PomodoroContextProps | undefined>(undefined);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(defaultSettings.work);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<TimerSession[]>([]);
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [currentSessionStart, setCurrentSessionStart] = useState<Date | null>(null);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('default');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Calculate progress (0 to 1)
  const getTotalTime = () => {
    switch (mode) {
      case 'work': return settings.work;
      case 'shortBreak': return settings.shortBreak;
      case 'longBreak': return settings.longBreak;
    }
  };

  const progress = 1 - timeLeft / getTotalTime();

  // Play sound based on timer events
  const playSound = (soundUrl: string) => {
    if (!settings.playSounds) return;

    const audio = new Audio(soundUrl);
    audio.volume = 0.5;
    audio.play().catch(err => console.error('Error playing sound:', err));
  };

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // Fix: Use NodeJS.Timeout for the interval ID
      const interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      setIntervalId(interval);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      handleTimerCompleted();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, timeLeft]);

  // Handle timer completion
  const handleTimerCompleted = () => {
    setIsActive(false);

    // Record the completed session
    if (currentSessionStart) {
      const newSession: TimerSession = {
        mode,
        startTime: currentSessionStart,
        endTime: new Date(),
        duration: getTotalTime(),
        completed: true
      };

      setSessionHistory(prev => [newSession, ...prev]);
    }

    // Play completion sound
    playSound(settings.customSounds.complete);

    // Show notification
    const modeText = mode === 'work' ? 'Work session' :
                    mode === 'shortBreak' ? 'Short break' : 'Long break';
    toast.success(`${modeText} completed!`);

    // If work session completed, increment counter
    if (mode === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);

      // Determine next mode
      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        startNewSession('longBreak');
      } else {
        startNewSession('shortBreak');
      }
    } else {
      // After any break, go back to work
      startNewSession('work');
    }
  };

  // Start a new session with the given mode
  const startNewSession = (newMode: TimerMode) => {
    setMode(newMode);

    // Set time based on mode
    switch (newMode) {
      case 'work':
        setTimeLeft(settings.work);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreak);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreak);
        break;
    }

    // Don't auto-start the next session
    setIsActive(false);
    setCurrentSessionStart(null);
  };

  // Control functions
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);

      // Record session start time if not already set
      if (!currentSessionStart) {
        setCurrentSessionStart(new Date());
        // Play start sound
        playSound(mode === 'work' ? settings.customSounds.start : settings.customSounds.break);
      }
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(getTotalTime());
    setCurrentSessionStart(null);
  };

  const skipToNextSession = () => {
    // Record current session as incomplete
    if (currentSessionStart) {
      const incompleteSession: TimerSession = {
        mode,
        startTime: currentSessionStart,
        endTime: new Date(),
        duration: getTotalTime() - timeLeft,
        completed: false
      };

      setSessionHistory(prev => [incompleteSession, ...prev]);
    }

    // Skip to next mode
    if (mode === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);

      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        startNewSession('longBreak');
      } else {
        startNewSession('shortBreak');
      }
    } else {
      startNewSession('work');
    }
  };

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    // Update current timer if needed
    resetTimer();
    setTimeLeft(
      mode === 'work'
        ? updatedSettings.work
        : mode === 'shortBreak'
          ? updatedSettings.shortBreak
          : updatedSettings.longBreak
    );
  };

  const uploadCustomSound = (type: 'start' | 'break' | 'complete', soundUrl: string) => {
    const updatedCustomSounds = {
      ...settings.customSounds,
      [type]: soundUrl
    };

    updateSettings({
      customSounds: updatedCustomSounds
    });

    // Play a preview of the sound
    playSound(soundUrl);
  };

  const value = {
    isActive,
    mode,
    timeLeft,
    progress,
    completedSessions,
    totalSessions: settings.sessionsBeforeLongBreak,
    sessionHistory,
    settings,
    backgroundTheme,
    startTimer,
    pauseTimer,
    resetTimer,
    skipToNextSession,
    updateSettings,
    setBackgroundTheme,
    uploadCustomSound,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};
