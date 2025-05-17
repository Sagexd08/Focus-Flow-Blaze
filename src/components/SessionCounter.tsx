import React from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  SessionCounterContainer,
  BackgroundElement,
  SessionInfoContainer,
  SessionText,
  SessionIndicatorsContainer,
  SessionIndicator
} from './styles/SessionCounterStyles';

const SessionCounter: React.FC = () => {
  const { completedSessions, totalSessions } = usePomodoro();
  const { colors } = useTheme();

  // Create an array of session indicators
  const sessions = Array.from({ length: totalSessions }, (_, i) =>
    (i < completedSessions % totalSessions) ||
    (completedSessions > 0 && completedSessions % totalSessions === 0 && i === totalSessions - 1)
  );

  return (
    <SessionCounterContainer>
      {/* Decorative background element */}
      <BackgroundElement />

      <SessionInfoContainer>
        <SessionText color={colors.primary}>
          Session {completedSessions % totalSessions || totalSessions} of {totalSessions}
        </SessionText>
        <SessionText color={colors.secondary}>
          Total completed: {completedSessions}
        </SessionText>
      </SessionInfoContainer>

      <SessionIndicatorsContainer>
        {sessions.map((isCompleted, idx) => (
          <SessionIndicator
            key={idx}
            isCompleted={isCompleted}
            primaryColor={colors.primary}
            primaryRgb={colors.primaryRgb}
          />
        ))}
      </SessionIndicatorsContainer>
    </SessionCounterContainer>
  );
};

export default SessionCounter;
