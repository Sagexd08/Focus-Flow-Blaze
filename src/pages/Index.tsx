
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PomodoroProvider } from '@/contexts/PomodoroContext';
import TimerDisplay from '@/components/TimerDisplay';
import SessionTracker from '@/components/SessionTracker';
import TimerSettings from '@/components/TimerSettings';
import SessionHistory from '@/components/SessionHistory';
import ParallaxBackground from '@/components/ParallaxBackground';
import ThreeDTimer from '@/components/ThreeDTimer';

const Index = () => {
  return (
    <PomodoroProvider>
      <ParallaxBackground>
        <main className="min-h-screen flex flex-col p-4 md:p-8">
          <header className="container mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Pomodoro Timer</h1>
            <p className="text-white/80">Focus on your work with timed sessions</p>
          </header>

          <div className="container flex-1 grid gap-8 md:grid-cols-2 mb-8">
            <div className="space-y-6 relative">
              <TimerDisplay />
              <ThreeDTimer className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
              <SessionTracker />
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="history" className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="mt-0">
                  <SessionHistory />
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <TimerSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </ParallaxBackground>
    </PomodoroProvider>
  );
};

export default Index;
