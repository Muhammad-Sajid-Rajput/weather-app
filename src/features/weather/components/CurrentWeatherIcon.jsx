import React, { useState } from 'react';
import { getIconPath } from '@/shared/utils/weather';

const CurrentWeatherIcon = ({ condition, code, isDay, icon, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const iconSrc = code && !hasError ? getIconPath(code, isDay) : null;
  const fallbackSrc = icon ? (icon.startsWith('//') ? `https:${icon}` : icon) : '';

  return (
    <div className={`transition-transform duration-500 hover:scale-110 ${className}`}>
      {iconSrc ? (
        <img
          src={iconSrc}
          alt={condition || 'Weather Icon'}
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : fallbackSrc ? (
        <img
          src={fallbackSrc}
          alt={condition || 'Weather Icon'}
          className="w-full h-full object-contain"
        />
      ) : null}
    </div>
  );
};

export default CurrentWeatherIcon;
