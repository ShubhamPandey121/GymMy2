import React from 'react';

import CuteRobotSVG from '@/components/icons/GymMyLogo.svg';

export const CuteRobotIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src="/GymMyLogo.svg" className={className} alt="Cute Robot" />
);



export const FitnessCharacterIcon = ({ type, className = "w-12 h-12" }: { type: string, className?: string }) => {
  const getCharacter = () => {
    switch (type) {
      case 'weight-loss':
        return (
          <svg className={className} viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="35" rx="18" ry="20" fill="#ff6b9d" />
            <circle cx="44" cy="30" r="2" fill="white" />
            <circle cx="56" cy="30" r="2" fill="white" />
            <path d="M46 38 Q50 42 54 38" stroke="white" strokeWidth="2" fill="none" />
            <ellipse cx="50" cy="65" rx="15" ry="20" fill="#ffb347" />
            <rect x="35" y="50" width="6" height="20" rx="3" fill="#98fb98" />
            <rect x="59" y="50" width="6" height="20" rx="3" fill="#98fb98" />
            <rect x="45" y="80" width="4" height="12" rx="2" fill="#87ceeb" />
            <rect x="51" y="80" width="4" height="12" rx="2" fill="#87ceeb" />
            <circle cx="35" cy="25" r="2" fill="#dda0dd" />
            <path d="M37 25 Q42 20 45 28" stroke="#dda0dd" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'muscle-gain':
        return (
          <svg className={className} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="35" r="18" fill="#ff6b9d" />
            <circle cx="45" cy="30" r="2" fill="white" />
            <circle cx="55" cy="30" r="2" fill="white" />
            <path d="M47 38 Q50 41 53 38" stroke="white" strokeWidth="2" fill="none" />
            <ellipse cx="50" cy="65" rx="20" ry="18" fill="#ffb347" />
            <ellipse cx="32" cy="55" rx="8" ry="12" fill="#98fb98" />
            <ellipse cx="68" cy="55" rx="8" ry="12" fill="#98fb98" />
            <rect x="46" y="80" width="8" height="15" rx="4" fill="#87ceeb" />
            <circle cx="30" cy="45" r="4" fill="#dda0dd" />
            <circle cx="70" cy="45" r="4" fill="#dda0dd" />
          </svg>
        );
      case 'endurance':
        return (
          <svg className={className} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="30" r="15" fill="#ff6b9d" />
            <circle cx="46" cy="27" r="2" fill="white" />
            <circle cx="54" cy="27" r="2" fill="white" />
            <path d="M47 32 Q50 35 53 32" stroke="white" strokeWidth="1.5" fill="none" />
            <ellipse cx="50" cy="55" rx="12" ry="15" fill="#ffb347" />
            <rect x="38" y="45" width="5" height="18" rx="2.5" fill="#98fb98" transform="rotate(-15 40.5 54)" />
            <rect x="57" y="45" width="5" height="18" rx="2.5" fill="#98fb98" transform="rotate(15 59.5 54)" />
            <rect x="46" y="68" width="4" height="15" rx="2" fill="#87ceeb" transform="rotate(-10 48 75.5)" />
            <rect x="50" y="68" width="4" height="15" rx="2" fill="#87ceeb" transform="rotate(10 52 75.5)" />
            <circle cx="45" cy="15" r="3" fill="#98fb98" />
            <circle cx="55" cy="15" r="3" fill="#98fb98" />
            <path d="M45 18 Q50 25 55 18" stroke="#98fb98" strokeWidth="2" fill="none" />
          </svg>
        );
      default:
        return (
          <svg className={className} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="35" r="16" fill="#ff6b9d" />
            <circle cx="45" cy="31" r="2" fill="white" />
            <circle cx="55" cy="31" r="2" fill="white" />
            <path d="M46 38 Q50 42 54 38" stroke="white" strokeWidth="2" fill="none" />
            <rect x="42" y="50" width="16" height="20" rx="8" fill="#ffb347" />
            <rect x="37" y="48" width="6" height="16" rx="3" fill="#98fb98" />
            <rect x="57" y="48" width="6" height="16" rx="3" fill="#98fb98" />
            <rect x="46" y="70" width="3" height="12" rx="1.5" fill="#87ceeb" />
            <rect x="51" y="70" width="3" height="12" rx="1.5" fill="#87ceeb" />
            <circle cx="45" cy="18" r="2" fill="#dda0dd" />
            <circle cx="55" cy="18" r="2" fill="#dda0dd" />
            <path d="M45 20 Q50 15 55 20" stroke="#dda0dd" strokeWidth="2" fill="none" />
          </svg>
        );
    }
  };

  return getCharacter();
};

