
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type AccentColor = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'red';

interface EnhancedThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
}

const EnhancedThemeContext = createContext<EnhancedThemeContextType | undefined>(undefined);

export const useEnhancedTheme = () => {
  const context = useContext(EnhancedThemeContext);
  if (context === undefined) {
    throw new Error('useEnhancedTheme must be used within an EnhancedThemeProvider');
  }
  return context;
};

const accentColorMap = {
  blue: { primary: '#3B82F6', secondary: '#60A5FA', ring: '#1D4ED8' },
  green: { primary: '#10B981', secondary: '#34D399', ring: '#047857' },
  purple: { primary: '#8B5CF6', secondary: '#A78BFA', ring: '#7C3AED' },
  orange: { primary: '#F59E0B', secondary: '#FCD34D', ring: '#D97706' },
  pink: { primary: '#EC4899', secondary: '#F472B6', ring: '#DB2777' },
  red: { primary: '#EF4444', secondary: '#F87171', ring: '#DC2626' }
};

export const EnhancedThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('smartbus-theme') as Theme;
    if (stored) return stored;
    return 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const stored = localStorage.getItem('smartbus-accent') as AccentColor;
    if (stored) return stored;
    return 'red';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Apply theme to html and body
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    // Apply accent colors as CSS variables
    const colors = accentColorMap[accentColor];
    root.style.setProperty('--accent-primary', colors.primary);
    root.style.setProperty('--accent-secondary', colors.secondary);
    root.style.setProperty('--accent-ring', colors.ring);
    
    // Save to localStorage
    localStorage.setItem('smartbus-theme', theme);
    localStorage.setItem('smartbus-accent', accentColor);
  }, [theme, accentColor]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  return (
    <EnhancedThemeContext.Provider value={{ theme, accentColor, toggleTheme, setAccentColor }}>
      {children}
    </EnhancedThemeContext.Provider>
  );
};
