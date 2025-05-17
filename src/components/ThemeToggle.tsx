import React from 'react';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';

interface ThemeOption {
  id: ThemeType;
  name: string;
}

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, themeColors } = useTheme();

  // Theme options
  const themes: ThemeOption[] = [
    { id: 'sunset', name: 'Sunset' },
    { id: 'ocean', name: 'Ocean' },
    { id: 'purple', name: 'Purple' },
    { id: 'green', name: 'Green' },
    { id: 'blue', name: 'Blue' },
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' }
  ];

  return (
    <div className="flex flex-col items-center mt-8">
      <h3 className="text-lg font-semibold mb-3 text-shadow">
        Choose Theme
      </h3>

      <div className="flex flex-wrap justify-center gap-3 max-w-xs">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-transparent shadow-md transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg ${theme === t.id ? 'border-white shadow-lg animate-pulse scale-125' : ''}`}
            style={{
              background: themeColors[t.id].cardBg,
              boxShadow: theme === t.id
                ? `0 0 15px rgba(${themeColors[t.id].primaryRgb}, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.5)`
                : '0 2px 5px rgba(0,0,0,0.2)'
            }}
            title={t.name}
            aria-label={`Switch to ${t.name} theme`}
          >
            {theme === t.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm animate-floating-slow">
                ✓
              </span>
            )}

            {/* Radial gradient hover effect */}
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{
                background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
