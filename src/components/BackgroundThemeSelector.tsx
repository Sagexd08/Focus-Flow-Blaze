
import React from 'react';
import { Check } from 'lucide-react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { cn } from '@/lib/utils';

type BackgroundTheme = 'default' | 'nature' | 'abstract' | 'gradient';

interface ThemeOption {
  id: BackgroundTheme;
  label: string;
  className: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'default',
    label: 'Default',
    className: 'bg-gradient-1',
  },
  {
    id: 'nature',
    label: 'Nature',
    className: 'bg-gradient-2',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    className: 'bg-gradient-3',
  },
  {
    id: 'gradient',
    label: 'Gradient',
    className: 'bg-gradient-4',
  },
];

const BackgroundThemeSelector: React.FC = () => {
  const { backgroundTheme, setBackgroundTheme } = usePomodoro();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Background Theme</h3>
      <div className="grid grid-cols-2 gap-3">
        {themeOptions.map((theme) => (
          <div
            key={theme.id}
            className={cn(
              'relative flex h-24 cursor-pointer items-center justify-center rounded-lg p-2 transition-all',
              theme.className,
              {
                'ring-2 ring-primary ring-offset-2': backgroundTheme === theme.id,
              }
            )}
            onClick={() => setBackgroundTheme(theme.id)}
          >
            <span className="font-medium text-white text-shadow">{theme.label}</span>
            {backgroundTheme === theme.id && (
              <div className="absolute right-2 top-2 h-5 w-5 rounded-full bg-primary/80 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundThemeSelector;
