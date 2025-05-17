import React from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatTime } from '@/utils/timeUtils';

const SimpleTimer: React.FC = () => {
  const { timeLeft, isActive, currentMode, startTimer, pauseTimer, resetTimer, skipToNext } = usePomodoro();
  const { colors } = useTheme();

  // Get the background color based on the current mode
  const getBackgroundStyle = () => {
    switch (currentMode) {
      case 'work':
        return {
          background: colors.cardBg,
          boxShadow: `0 10px 30px rgba(0,0,0,0.25),
                      0 0 20px rgba(${colors.primaryRgb}, 0.3),
                      inset 0 0 10px rgba(255, 255, 255, 0.1)`
        };
      case 'shortBreak':
        return {
          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.25),
                      0 0 20px rgba(${colors.secondaryRgb}, 0.3),
                      inset 0 0 10px rgba(255, 255, 255, 0.1)`
        };
      case 'longBreak':
        return {
          background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.25),
                      0 0 20px rgba(${colors.accentRgb}, 0.3),
                      inset 0 0 10px rgba(255, 255, 255, 0.1)`
        };
      default:
        return {
          background: colors.cardBg,
          boxShadow: `0 10px 30px rgba(0,0,0,0.25)`
        };
    }
  };

  return (
    <div
      className="pomodoro-card relative overflow-hidden rounded-2xl p-8 shadow-lg backdrop-blur-md transition-all duration-500 ease-out"
      style={getBackgroundStyle()}
    >
      {/* Decorative element */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-rotate-slow"
          style={{
            background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)`,
            transform: 'rotate(45deg)',
            zIndex: 0
          }}
        />
      </div>

      <h2
        className="text-center text-2xl font-bold mb-6 text-shadow relative z-10"
        style={{ color: colors.text }}
      >
        {currentMode === 'work' ? 'Focus Time' :
         currentMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
      </h2>

      <div
        className="relative z-10 my-8 text-center text-6xl font-bold tracking-wider animate-glow"
        style={{
          color: colors.text,
          textShadow: `0 0 15px rgba(${colors.primaryRgb}, 0.5)`
        }}
      >
        {formatTime(timeLeft)}

        {/* Glow effect behind timer */}
        <div
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -z-10 animate-pulse-slow"
          style={{
            background: `radial-gradient(circle, rgba(${colors.primaryRgb}, 0.2) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%'
          }}
        />
      </div>

      <div className="flex justify-center gap-4 mt-8 relative z-10">
        {isActive ? (
          <button
            onClick={pauseTimer}
            className="relative z-10 cursor-pointer rounded-full px-7 py-3.5 font-semibold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:translate-y-0.5 active:scale-95"
            style={{
              background: `rgba(${colors.primaryRgb}, 0.3)`,
              color: colors.text,
              boxShadow: `0 5px 15px rgba(${colors.primaryRgb}, 0.4)`
            }}
          >
            Pause
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="relative z-10 cursor-pointer rounded-full px-7 py-3.5 font-semibold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:translate-y-0.5 active:scale-95 animate-pulse-slow"
            style={{
              background: `rgba(${colors.primaryRgb}, 0.3)`,
              color: colors.text,
              boxShadow: `0 5px 15px rgba(${colors.primaryRgb}, 0.4)`
            }}
          >
            Start
          </button>
        )}

        <button
          onClick={resetTimer}
          className="relative z-10 cursor-pointer rounded-full px-7 py-3.5 font-semibold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:translate-y-0.5 active:scale-95"
          style={{
            background: 'rgba(0,0,0,0.2)',
            color: colors.text
          }}
        >
          Reset
        </button>

        <button
          onClick={skipToNext}
          className="relative z-10 cursor-pointer rounded-full px-7 py-3.5 font-semibold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:translate-y-0.5 active:scale-95"
          style={{
            background: `rgba(${colors.secondaryRgb}, 0.3)`,
            color: colors.text,
            boxShadow: `0 5px 15px rgba(${colors.secondaryRgb}, 0.4)`
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default SimpleTimer;
