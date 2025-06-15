
import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface CollegeBrandingProps {
  variant?: 'header' | 'footer' | 'card';
  showAlert?: boolean;
  className?: string;
}

const CollegeBranding: React.FC<CollegeBrandingProps> = ({ 
  variant = 'header', 
  showAlert = false, 
  className = '' 
}) => {
  const { state } = useAppContext();
  
  if (!state.college) {
    if (showAlert) {
      return (
        <div className={`flex items-center space-x-2 text-amber-600 dark:text-amber-400 ${className}`}>
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">No college selected</span>
        </div>
      );
    }
    return null;
  }

  const college = state.college;

  const baseStyles = "flex items-center space-x-3";
  const variantStyles = {
    header: "text-sm",
    footer: "text-xs opacity-75",
    card: "text-base"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {college.logo && (
        <img 
          src={college.logo} 
          alt={`${college.name} logo`}
          className="h-8 w-8 rounded-full object-cover"
        />
      )}
      <div>
        <p className="font-medium text-gray-900 dark:text-white">
          {college.name}
        </p>
        {variant === 'footer' && (
          <a 
            href="#" 
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <span>Campus Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default CollegeBranding;
