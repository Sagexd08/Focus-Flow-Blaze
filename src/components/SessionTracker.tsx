
import React from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const SessionTracker: React.FC = () => {
  const { completedSessions, totalSessions } = usePomodoro();
  
  // Create an array representing all sessions in the cycle
  const sessions = Array.from({ length: totalSessions }, (_, i) => i < completedSessions % totalSessions);
  
  return (
    <div className="w-full mt-4 mb-6">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Session {completedSessions % totalSessions || totalSessions} of {totalSessions}</span>
        <span>Total completed: {completedSessions}</span>
      </div>
      
      <div className="flex gap-1">
        {sessions.map((isCompleted, idx) => (
          <div 
            key={idx} 
            className={cn(
              "h-2 flex-1 rounded-full transition-all",
              isCompleted ? "bg-primary animate-fade-in" : "bg-muted"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SessionTracker;
