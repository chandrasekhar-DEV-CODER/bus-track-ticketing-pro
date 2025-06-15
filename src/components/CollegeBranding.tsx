
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { GraduationCap } from 'lucide-react';

interface CollegeBrandingProps {
  variant?: 'header' | 'footer' | 'card';
  showAlert?: boolean;
}

const CollegeBranding: React.FC<CollegeBrandingProps> = ({ 
  variant = 'card', 
  showAlert = false 
}) => {
  const { state } = useApp();
  const { college } = state;

  if (!college) return null;

  const brandingStyle = {
    '--brand-primary': college.primaryColor,
    '--brand-secondary': college.secondaryColor,
  } as React.CSSProperties;

  if (variant === 'header') {
    return (
      <div className="flex items-center space-x-2" style={brandingStyle}>
        {college.logo ? (
          <img src={college.logo} alt={college.name} className="h-8 w-8 rounded" />
        ) : (
          <div 
            className="h-8 w-8 rounded flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            <GraduationCap className="h-5 w-5" />
          </div>
        )}
        <span className="font-semibold text-gray-900 dark:text-white">
          {college.name}
        </span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="bg-white/10 dark:bg-black/20 rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
        <div className="flex items-center mb-2">
          <GraduationCap 
            className="h-5 w-5 mr-2" 
            style={{ color: college.primaryColor }}
          />
          <span className="font-semibold text-gray-900 dark:text-white">
            {college.name}
          </span>
        </div>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p>{college.supportPhone}</p>
          <p>{college.supportEmail}</p>
        </div>
        {showAlert && college.specialAlerts.length > 0 && (
          <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-400">
              {college.specialAlerts[0]}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
      <CollegeBranding variant="header" />
      {showAlert && college.specialAlerts.length > 0 && (
        <div className="mt-3">
          {college.specialAlerts.map((alert, index) => (
            <div key={index} className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2">
              <p className="text-sm text-blue-800 dark:text-blue-400">{alert}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeBranding;
