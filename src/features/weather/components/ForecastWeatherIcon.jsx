import React, { useState } from 'react';
import { getIconPath } from '@/shared/utils/weather';

const ForecastWeatherIcon = ({ condition, code, isDay = true, icon, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const iconSrc = code && !hasError ? getIconPath(code, isDay) : null;
  const fallbackSrc = icon ? (icon.startsWith('//') ? `https:${icon}` : icon) : '';

  return (
    <div className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 ${className}`}>
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

export default ForecastWeatherIcon;
