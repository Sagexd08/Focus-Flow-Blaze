import React, { useState } from 'react';
import SimpleTimer from "./components/SimpleTimer";
import ThemeToggle from "./components/ThemeToggle";
import SessionCounter from "./components/SessionCounter";
import AdvancedSettings from "./components/AdvancedSettings";
import ThreeDTimer from "./components/ThreeDTimer";
import ParallaxBackground from "./components/ParallaxBackground";
import { PomodoroProvider } from '@/contexts/PomodoroContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { EyeTrackingProvider } from '@/contexts/EyeTrackingContext';

// Main app content with theme applied
const AppContent = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <EyeTrackingProvider>
      <ParallaxBackground>
        <AppContainer className="app-container">
          <PomodoroContainer className="pomodoro-container">
            <Title>
              Focus Flow Blaze
            </Title>

            <PomodoroProvider>
              <div style={{ position: 'relative' }}>
                <SimpleTimer />
                <ThreeDTimer className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <SessionCounter />

                <div style={{ marginTop: '25px', textAlign: 'center' }}>
                  <SettingsButton onClick={() => setShowSettings(!showSettings)}>
                    {showSettings ? '✕ Hide Settings' : '⚙ Advanced Settings'}
                  </SettingsButton>
                </div>

                {showSettings && (
                  <SettingsContainer>
                    <AdvancedSettings />
                  </SettingsContainer>
                )}
              </div>
            </PomodoroProvider>

            <ThemeToggle />

            <Footer>
              <p>
                Stay focused. Stay productive. <span>Achieve more.</span>
              </p>
            </Footer>
          </div>
        </div>
      </ParallaxBackground>
    </EyeTrackingProvider>
  );
};

// Main App component with providers
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
