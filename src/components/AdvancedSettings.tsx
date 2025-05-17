import React, { useRef } from 'react';
import { usePomodoro } from '@/contexts/PomodoroContext';
import { useTheme } from '@/contexts/ThemeContext';

const AdvancedSettings: React.FC = () => {
  const { settings, updateSettings, uploadCustomSound } = usePomodoro();
  const { colors } = useTheme();
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleSoundToggle = (checked: boolean) => {
    updateSettings({ playSounds: checked });
  };

  const handleHighContrastToggle = (checked: boolean) => {
    updateSettings({ highContrast: checked });
  };

  const handleEyeTrackingToggle = (checked: boolean) => {
    updateSettings({ enableEyeTracking: checked });
  };

  const handleParallaxToggle = (checked: boolean) => {
    updateSettings({ enableParallax: checked });
  };

  const handle3DAnimationsToggle = (checked: boolean) => {
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

  // Toggle switch component
  const ToggleSwitch = ({ 
    label, 
    description, 
    checked, 
    onChange 
  }: { 
    label: string; 
    description: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void 
  }) => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: '16px',
      padding: '12px',
      borderRadius: '8px',
      background: 'rgba(0,0,0,0.05)'
    }}>
      <div>
        <div style={{ 
          fontWeight: 'bold', 
          marginBottom: '4px',
          color: colors.text
        }}>
          {label}
        </div>
        <div style={{ 
          fontSize: '0.85rem',
          color: colors.text,
          opacity: 0.7
        }}>
          {description}
        </div>
      </div>
      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: checked ? colors.primary : 'rgba(0,0,0,0.2)',
          borderRadius: '34px',
          transition: '0.4s',
          '&:before': {
            position: 'absolute',
            content: '""',
            height: '16px',
            width: '16px',
            left: '4px',
            bottom: '4px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: '0.4s',
            transform: checked ? 'translateX(26px)' : 'translateX(0)'
          }
        }}>
          <span style={{
            position: 'absolute',
            content: '""',
            height: '16px',
            width: '16px',
            left: '4px',
            bottom: '4px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: '0.4s',
            transform: checked ? 'translateX(26px)' : 'translateX(0)'
          }}></span>
        </span>
      </label>
    </div>
  );

  return (
    <div style={{ 
      padding: '20px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        marginBottom: '20px',
        color: colors.primary,
        textAlign: 'center'
      }}>
        Advanced Settings
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold',
          marginBottom: '12px',
          color: colors.text
        }}>
          Accessibility
        </h3>
        <ToggleSwitch 
          label="High Contrast Mode" 
          description="Improves readability with higher contrast colors"
          checked={settings.highContrast}
          onChange={handleHighContrastToggle}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold',
          marginBottom: '12px',
          color: colors.text
        }}>
          Audio
        </h3>
        <ToggleSwitch 
          label="Sound Effects" 
          description="Play sounds when timer starts, pauses, and completes"
          checked={settings.playSounds}
          onChange={handleSoundToggle}
        />

        {settings.playSounds && (
          <div style={{ 
            marginTop: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px'
          }}>
            <button 
              onClick={() => handleAudioUpload('start')}
              style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                color: colors.text,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Start Sound
            </button>
            <button 
              onClick={() => handleAudioUpload('break')}
              style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                color: colors.text,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Break Sound
            </button>
            <button 
              onClick={() => handleAudioUpload('complete')}
              style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                color: colors.text,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Complete Sound
            </button>
          </div>
        )}

        <input 
          type="file" 
          ref={audioInputRef}
          style={{ display: 'none' }}
          accept="audio/*"
          onChange={handleFileChange}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold',
          marginBottom: '12px',
          color: colors.text
        }}>
          Visual Effects
        </h3>
        <ToggleSwitch 
          label="Eye Tracking" 
          description="Adjust UI based on where you're looking (uses mouse position)"
          checked={settings.enableEyeTracking}
          onChange={handleEyeTrackingToggle}
        />
        <ToggleSwitch 
          label="Parallax Effects" 
          description="Add depth with subtle parallax scrolling"
          checked={settings.enableParallax}
          onChange={handleParallaxToggle}
        />
        <ToggleSwitch 
          label="3D Animations" 
          description="Enable 3D timer and visual effects"
          checked={settings.enable3DAnimations}
          onChange={handle3DAnimationsToggle}
        />
      </div>
    </div>
  );
};

export default AdvancedSettings;
