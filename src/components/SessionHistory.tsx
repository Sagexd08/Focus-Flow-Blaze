
import React from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const SessionHistory: React.FC = () => {
  const { sessionHistory } = usePomodoro();
  
  if (sessionHistory.length === 0) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-sm border min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">No sessions yet. Start your first timer!</p>
      </div>
    );
  }
  
  // Format date function
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) {
      return `${mins} min`;
    } else {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return `${hours}h ${remainingMins}m`;
    }
  };
  
  // Calculate statistics
  const totalWorkTime = sessionHistory.reduce((sum, session) => {
    return session.mode === 'work' && session.completed ? sum + session.duration : sum;
  }, 0);
  
  const totalSessions = sessionHistory.filter(s => s.completed).length;
  
  return (
    <div className="bg-card rounded-xl shadow-sm border">
      <div className="p-6 pb-3">
        <h2 className="text-xl font-semibold mb-2">Session History</h2>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Total: {totalSessions} sessions</span>
          <span>Work: {formatDuration(totalWorkTime)}</span>
        </div>
      </div>
      
      <ScrollArea className="h-[300px] w-full">
        <div className="p-6 pt-0 space-y-3">
          {sessionHistory.map((session, index) => (
            <div 
              key={index} 
              className={cn(
                "history-item",
                session.completed ? "" : "opacity-70"
              )}
            >
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={session.mode === 'work' ? 'default' : 'outline'}>
                    {session.mode === 'work' ? 'Work' : 
                     session.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                  </Badge>
                  {!session.completed && (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Incomplete
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(session.startTime)}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Duration: {formatDuration(session.duration)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SessionHistory;
