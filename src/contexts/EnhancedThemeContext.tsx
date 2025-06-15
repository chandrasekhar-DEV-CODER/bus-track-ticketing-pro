
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type AccentColor = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

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
  blue: { primary: '#3B82F6', secondary: '#60A5FA' },
  green: { primary: '#10B981', secondary: '#34D399' },
  purple: { primary: '#8B5CF6', secondary: '#A78BFA' },
  orange: { primary: '#F59E0B', secondary: '#FCD34D' },
  pink: { primary: '#EC4899', secondary: '#F472B6' }
};

export const EnhancedThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) return stored;
    return 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const stored = localStorage.getItem('accentColor') as AccentColor;
    if (stored) return stored;
    return 'blue';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply accent colors as CSS variables
    const colors = accentColorMap[accentColor];
    root.style.setProperty('--accent-primary', colors.primary);
    root.style.setProperty('--accent-secondary', colors.secondary);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('accentColor', accentColor);
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
