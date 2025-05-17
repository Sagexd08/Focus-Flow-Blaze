
import React, { useRef } from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import BackgroundThemeSelector from './BackgroundThemeSelector';

const TimerSettings: React.FC = () => {
  const { settings, updateSettings, uploadCustomSound } = usePomodoro();
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Convert settings time (in seconds) to minutes for slider
  const workMinutes = settings.work / 60;
  const shortBreakMinutes = settings.shortBreak / 60;
  const longBreakMinutes = settings.longBreak / 60;

  const handleWorkChange = (value: number[]) => {
    updateSettings({ work: value[0] * 60 });
  };

  const handleShortBreakChange = (value: number[]) => {
    updateSettings({ shortBreak: value[0] * 60 });
  };

  const handleLongBreakChange = (value: number[]) => {
    updateSettings({ longBreak: value[0] * 60 });
  };

  const handleSessionsChange = (value: number[]) => {
    updateSettings({ sessionsBeforeLongBreak: value[0] });
  };

  const handleAutoStartChange = (checked: boolean) => {
    updateSettings({ autoStart: checked });
  };

  const handleSoundChange = (checked: boolean) => {
    updateSettings({ playSounds: checked });
  };

  const handleHighContrastChange = (checked: boolean) => {
    updateSettings({ highContrast: checked });
  };

  const handleEyeTrackingChange = (checked: boolean) => {
    updateSettings({ enableEyeTracking: checked });
  };

  const handleParallaxChange = (checked: boolean) => {
    updateSettings({ enableParallax: checked });
  };

  const handle3DAnimationsChange = (checked: boolean) => {
    updateSettings({ enable3DAnimations: checked });
  };

  const handleAudioUpload = (type: 'start' | 'break' | 'complete') => {
    if (audioInputRef.current) {
      audioInputRef.current.setAttribute('data-sound-type', type);
      audioInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const soundType = e.target.getAttribute('data-sound-type') as 'start' | 'break' | 'complete';
    const url = URL.createObjectURL(file);
    uploadCustomSound(soundType, url);
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <BackgroundThemeSelector />

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="work-time">Work duration</Label>
              <span className="text-sm text-muted-foreground">{workMinutes} min</span>
            </div>
            <Slider
              id="work-time"
              min={1}
              max={60}
              step={1}
              value={[workMinutes]}
              onValueChange={handleWorkChange}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="short-break">Short break</Label>
              <span className="text-sm text-muted-foreground">{shortBreakMinutes} min</span>
            </div>
            <Slider
              id="short-break"
              min={1}
              max={30}
              step={1}
              value={[shortBreakMinutes]}
              onValueChange={handleShortBreakChange}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="long-break">Long break</Label>
              <span className="text-sm text-muted-foreground">{longBreakMinutes} min</span>
            </div>
            <Slider
              id="long-break"
              min={5}
              max={60}
              step={5}
              value={[longBreakMinutes]}
              onValueChange={handleLongBreakChange}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="sessions">Sessions before long break</Label>
              <span className="text-sm text-muted-foreground">{settings.sessionsBeforeLongBreak}</span>
            </div>
            <Slider
              id="sessions"
              min={1}
              max={10}
              step={1}
              value={[settings.sessionsBeforeLongBreak]}
              onValueChange={handleSessionsChange}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sounds">Audio Notifications</Label>
                <p className="text-sm text-muted-foreground">Play sounds on timer events</p>
              </div>
              <Switch
                id="sounds"
                checked={settings.playSounds}
                onCheckedChange={handleSoundChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-start">Auto Start</Label>
                <p className="text-sm text-muted-foreground">Automatically start next session</p>
              </div>
              <Switch
                id="auto-start"
                checked={settings.autoStart}
                onCheckedChange={handleAutoStartChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast">High Contrast</Label>
                <p className="text-sm text-muted-foreground">Improve readability</p>
              </div>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={handleHighContrastChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="eye-tracking">Eye Tracking</Label>
                <p className="text-sm text-muted-foreground">Adjust UI based on eye position</p>
              </div>
              <Switch
                id="eye-tracking"
                checked={settings.enableEyeTracking}
                onCheckedChange={handleEyeTrackingChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="parallax">Parallax Effects</Label>
                <p className="text-sm text-muted-foreground">Add depth to backgrounds</p>
              </div>
              <Switch
                id="parallax"
                checked={settings.enableParallax}
                onCheckedChange={handleParallaxChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="3d-animations">3D Animations</Label>
                <p className="text-sm text-muted-foreground">Enable 3D timer effects</p>
              </div>
              <Switch
                id="3d-animations"
                checked={settings.enable3DAnimations}
                onCheckedChange={handle3DAnimationsChange}
              />
            </div>
          </div>

          {settings.playSounds && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Sounds</h3>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2"
                  onClick={() => handleAudioUpload('start')}
                >
                  <Upload size={16} />
                  <span className="text-xs">Start Sound</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2"
                  onClick={() => handleAudioUpload('break')}
                >
                  <Upload size={16} />
                  <span className="text-xs">Break Sound</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2"
                  onClick={() => handleAudioUpload('complete')}
                >
                  <Upload size={16} />
                  <span className="text-xs">Complete Sound</span>
                </Button>
              </div>

              <input
                type="file"
                ref={audioInputRef}
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerSettings;
