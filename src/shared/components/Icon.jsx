import React from 'react';

const Icon = ({ name, filled = false, className = '', size = 24 }) => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'overflow-visible',
  };

  const filledSvgProps = {
    ...svgProps,
    fill: 'currentColor',
    stroke: 'none',
  };

  const getIcon = () => {
    switch (name) {
      case 'search':
        return (
          <svg {...svgProps}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case 'close':
        return (
          <svg {...svgProps}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        );
      case 'arrow_back':
        return (
          <svg {...svgProps}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        );
      case 'add':
        return (
          <svg {...svgProps}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case 'delete_sweep':
        return (
          <svg {...svgProps}>
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        );
      case 'sync':
        return (
          <svg {...svgProps}>
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M21 21v-5h-5" />
          </svg>
        );
      case 'favorite':
        return (
          <svg {...svgProps}>
            {/* Outer Bookmark outline */}
            <path
              d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner Heart */}
            <path
              d="M12 14.5l-.6-.55C8.8 11.6 7 10 7 8.1c0-1.6 1.2-2.8 2.8-2.8.9 0 1.74.42 2.2 1.09.46-.67 1.3-1.09 2.2-1.09 1.6 0 2.8 1.2 2.8 2.8 0 1.9-1.8 3.5-4.4 5.85L12 14.5z"
              fill={filled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'star':
        const starProps = filled ? filledSvgProps : svgProps;
        return (
          <svg {...starProps}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 'my_location':
        return (
          <svg {...svgProps}>
            <circle cx="12" cy="12" r="7" />
            <line x1="12" y1="1" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="1" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="23" y2="12" />
          </svg>
        );
      case 'error':
        return (
          <svg {...svgProps}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 'wb_sunny':
        return (
          <svg {...svgProps}>
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        );
      case 'visibility':
        return (
          <svg {...svgProps}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        );
      case 'compress':
        return (
          <svg {...svgProps}>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
            <line x1="12" y1="12" x2="16" y2="8" strokeWidth="2" />
            <line x1="12" y1="3" x2="12" y2="6" />
            <line x1="3" y1="12" x2="6" y2="12" />
            <line x1="21" y1="12" x2="18" y2="12" />
          </svg>
        );
      case 'air':
        return (
          <svg {...svgProps}>
            <path d="M4 12h12a2 2 0 1 0 0-4H8" />
            <path d="M2 16h14a3 3 0 1 0 0-6H6" />
            <path d="M6 20h8a4 4 0 1 0 0-8H4" />
          </svg>
        );
      case 'wb_twilight':
        return (
          <svg {...svgProps}>
            {/* Horizon Line */}
            <path d="M2 20h20" />
            {/* Rising Sun (Semi-circle) */}
            <path d="M8 20a4 4 0 0 1 8 0" fill="currentColor" />
            {/* Sun Rays */}
            <path d="M12 12V8" />
            <path d="M6.34 14.34l-2.83-2.83" />
            <path d="M17.66 14.34l2.83-2.83" />
            {/* Upward Rising Arrow inside sun */}
            <polyline points="10 17 12 15 14 17" />
          </svg>
        );
      case 'dark_mode':
        return (
          <svg {...filledSvgProps}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
      default:
        return (
          <svg {...svgProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        );
    }
  };

  // We map the names to specific Tailwind colors and drop shadows for the SVG strokes/fills
  const gradientMap = {
    favorite: 'text-error drop-shadow-[0_1px_3px_rgba(255,180,171,0.4)]',
    star: 'text-amber-400 drop-shadow-[0_1px_3px_rgba(245,158,11,0.4)]',
    my_location: 'text-cyan-400 drop-shadow-[0_1px_3px_rgba(6,182,212,0.4)]',
    sync: 'text-teal-400 drop-shadow-[0_1px_3px_rgba(20,184,166,0.4)]',
    search: 'text-sky-400 drop-shadow-[0_1px_3px_rgba(56,189,248,0.4)]',
    error: 'text-red-500 drop-shadow-[0_2px_4px_rgba(220,38,38,0.4)]',
    delete_sweep: 'text-rose-500 drop-shadow-[0_1px_2px_rgba(239,68,68,0.3)]',
    wb_sunny: 'text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]',
    visibility: 'text-cyan-400 drop-shadow-[0_2px_4px_rgba(56,189,248,0.5)]',
    compress: 'text-emerald-400 drop-shadow-[0_2px_4px_rgba(52,211,153,0.5)]',
    air: 'text-indigo-400 drop-shadow-[0_2px_4px_rgba(192,132,252,0.5)]',
    wb_twilight: 'text-rose-400 drop-shadow-[0_2px_4px_rgba(251,113,133,0.5)]',
    dark_mode: 'text-indigo-400 drop-shadow-[0_2px_4px_rgba(129,140,248,0.5)]',
  };

  const svgClass = gradientMap[name] || 'text-current';

  return (
    <span className={`inline-flex items-center justify-center ${svgClass} ${className}`}>
      {getIcon()}
    </span>
  );
};

export default Icon;
