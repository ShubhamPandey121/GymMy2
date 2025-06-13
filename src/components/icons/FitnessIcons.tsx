import React from 'react';
import { Goal } from '@/types/fitness';

interface FitnessIconProps {
  type: Goal['type'];
  className?: string;
}

export const FitnessIcon: React.FC<FitnessIconProps> = ({ 
  type, 
  className = "w-16 h-16" 
}) => {
  const baseProps = {
    className,
    viewBox: "0 0 100 100",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };

  switch (type) {
    case 'weight-loss':
      return (
        <svg {...baseProps}>
          {/* Character head */}
          <circle cx="50" cy="25" r="12" fill="#FF6B9D" />
          
          {/* Eyes */}
          <circle cx="46" cy="22" r="2" fill="white" />
          <circle cx="54" cy="22" r="2" fill="white" />
          <circle cx="46" cy="22" r="1" fill="#333" />
          <circle cx="54" cy="22" r="1" fill="#333" />
          
          {/* Smile */}
          <path d="M46 27 Q50 30 54 27" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Body (slimmer) */}
          <ellipse cx="50" cy="50" rx="10" ry="18" fill="#FFB347" />
          
          {/* Arms */}
          <ellipse cx="35" cy="45" rx="4" ry="12" fill="#98FB98" transform="rotate(-20 35 45)" />
          <ellipse cx="65" cy="45" rx="4" ry="12" fill="#98FB98" transform="rotate(20 65 45)" />
          
          {/* Legs */}
          <ellipse cx="45" cy="75" rx="3" ry="15" fill="#87CEEB" />
          <ellipse cx="55" cy="75" rx="3" ry="15" fill="#87CEEB" />
          
          {/* Feet */}
          <ellipse cx="45" cy="88" rx="5" ry="3" fill="#DDA0DD" />
          <ellipse cx="55" cy="88" rx="5" ry="3" fill="#DDA0DD" />
          
          {/* Scale icon */}
          <rect x="15" y="15" width="12" height="8" rx="2" fill="#87CEEB" opacity="0.8" />
          <rect x="17" y="17" width="8" height="4" rx="1" fill="white" />
          
          {/* Weight loss indicator */}
          <path d="M75 20 L85 15 L80 25 Z" fill="#98FB98" />
          <text x="82" y="12" fontSize="6" fill="#98FB98" fontWeight="bold">-5kg</text>
        </svg>
      );

    case 'muscle-gain':
      return (
        <svg {...baseProps}>
          {/* Character head */}
          <circle cx="50" cy="22" r="10" fill="#FF6B9D" />
          
          {/* Eyes */}
          <circle cx="47" cy="20" r="1.5" fill="white" />
          <circle cx="53" cy="20" r="1.5" fill="white" />
          <circle cx="47" cy="20" r="0.8" fill="#333" />
          <circle cx="53" cy="20" r="0.8" fill="#333" />
          
          {/* Determined smile */}
          <path d="M47 24 Q50 26 53 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Muscular body */}
          <ellipse cx="50" cy="45" rx="14" ry="20" fill="#FFB347" />
          
          {/* Big muscular arms */}
          <ellipse cx="30" cy="40" rx="8" ry="15" fill="#98FB98" />
          <ellipse cx="70" cy="40" rx="8" ry="15" fill="#98FB98" />
          
          {/* Bicep definition */}
          <ellipse cx="30" cy="38" rx="5" ry="8" fill="#90EE90" />
          <ellipse cx="70" cy="38" rx="5" ry="8" fill="#90EE90" />
          
          {/* Strong legs */}
          <ellipse cx="45" cy="70" rx="5" ry="18" fill="#87CEEB" />
          <ellipse cx="55" cy="70" rx="5" ry="18" fill="#87CEEB" />
          
          {/* Feet */}
          <ellipse cx="45" cy="85" rx="6" ry="3" fill="#DDA0DD" />
          <ellipse cx="55" cy="85" rx="6" ry="3" fill="#DDA0DD" />
          
          {/* Dumbbell */}
          <rect x="15" y="25" width="4" height="2" fill="#666" />
          <rect x="12" y="23" width="10" height="6" fill="#888" />
          <circle cx="14" cy="26" r="3" fill="#666" />
          <circle cx="20" cy="26" r="3" fill="#666" />
          
          {/* Muscle gain indicator */}
          <path d="M80 35 L85 30 L85 40 Z" fill="#98FB98" />
          <text x="82" y="27" fontSize="5" fill="#98FB98" fontWeight="bold">+2kg</text>
        </svg>
      );

    case 'endurance':
      return (
        <svg {...baseProps}>
          {/* Character head */}
          <circle cx="50" cy="22" r="10" fill="#FF6B9D" />
          
          {/* Eyes (focused) */}
          <circle cx="47" cy="20" r="1.5" fill="white" />
          <circle cx="53" cy="20" r="1.5" fill="white" />
          <circle cx="47" cy="20" r="0.8" fill="#333" />
          <circle cx="53" cy="20" r="0.8" fill="#333" />
          
          {/* Determined expression */}
          <path d="M47 24 Q50 25 53 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Lean athletic body */}
          <ellipse cx="50" cy="45" rx="9" ry="18" fill="#FFB347" />
          
          {/* Running arms */}
          <ellipse cx="35" cy="40" rx="4" ry="12" fill="#98FB98" transform="rotate(-30 35 40)" />
          <ellipse cx="65" cy="48" rx="4" ry="12" fill="#98FB98" transform="rotate(30 65 48)" />
          
          {/* Running legs */}
          <ellipse cx="45" cy="70" rx="4" ry="15" fill="#87CEEB" transform="rotate(-15 45 70)" />
          <ellipse cx="55" cy="72" rx="4" ry="15" fill="#87CEEB" transform="rotate(15 55 72)" />
          
          {/* Running shoes */}
          <ellipse cx="42" cy="82" rx="6" ry="3" fill="#DDA0DD" transform="rotate(-15 42 82)" />
          <ellipse cx="58" cy="85" rx="6" ry="3" fill="#DDA0DD" transform="rotate(15 58 85)" />
          
          {/* Motion lines */}
          <path d="M25 50 L30 48" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M25 55 L32 53" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M25 60 L30 58" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          
          {/* Stopwatch */}
          <circle cx="80" cy="25" r="8" fill="#87CEEB" opacity="0.9" />
          <circle cx="80" cy="25" r="6" fill="white" />
          <path d="M80 22 L80 25 L82 27" stroke="#333" strokeWidth="1" strokeLinecap="round" />
          <rect x="78" y="18" width="4" height="2" fill="#666" />
          
          {/* Heart rate */}
          <path d="M15 35 Q18 32 20 35 Q22 32 25 35 L22 38 L18 38 Z" fill="#FF6B9D" />
        </svg>
      );

    case 'flexibility':
      return (
        <svg {...baseProps}>
          {/* Character head */}
          <circle cx="50" cy="25" r="10" fill="#FF6B9D" />
          
          {/* Peaceful eyes */}
          <path d="M45 22 Q47 20 49 22" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M51 22 Q53 20 55 22" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Calm smile */}
          <path d="M47 27 Q50 29 53 27" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Flexible body in yoga pose */}
          <ellipse cx="50" cy="45" rx="8" ry="15" fill="#FFB347" />
          
          {/* Yoga arms - one up, one down */}
          <ellipse cx="35" cy="35" rx="3" ry="15" fill="#98FB98" transform="rotate(-45 35 35)" />
          <ellipse cx="65" cy="55" rx="3" ry="15" fill="#98FB98" transform="rotate(45 65 55)" />
          
          {/* Yoga legs - lotus position */}
          <ellipse cx="40" cy="65" rx="12" ry="5" fill="#87CEEB" transform="rotate(-10 40 65)" />
          <ellipse cx="60" cy="65" rx="12" ry="5" fill="#87CEEB" transform="rotate(10 60 65)" />
          
          {/* Meditation elements */}
          <circle cx="50" cy="15" r="2" fill="#DDA0DD" opacity="0.7" />
          <circle cx="52" cy="12" r="1.5" fill="#DDA0DD" opacity="0.5" />
          <circle cx="48" cy="12" r="1.5" fill="#DDA0DD" opacity="0.5" />
          
          {/* Yoga mat */}
          <rect x="25" y="70" width="50" height="4" rx="2" fill="#98FB98" opacity="0.6" />
          
          {/* Zen circles */}
          <circle cx="20" cy="30" r="3" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.6" />
          <circle cx="80" cy="40" r="4" fill="none" stroke="#DDA0DD" strokeWidth="1" opacity="0.6" />
          <circle cx="85" cy="65" r="2" fill="none" stroke="#98FB98" strokeWidth="1" opacity="0.6" />
        </svg>
      );

    case 'general-fitness':
      return (
        <svg {...baseProps}>
          {/* Character head */}
          <circle cx="50" cy="25" r="11" fill="#FF6B9D" />
          
          {/* Happy eyes */}
          <circle cx="46" cy="22" r="2" fill="white" />
          <circle cx="54" cy="22" r="2" fill="white" />
          <circle cx="46" cy="22" r="1" fill="#333" />
          <circle cx="54" cy="22" r="1" fill="#333" />
          
          {/* Big smile */}
          <path d="M45 27 Q50 31 55 27" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Balanced body */}
          <ellipse cx="50" cy="48" rx="12" ry="18" fill="#FFB347" />
          
          {/* Active arms */}
          <ellipse cx="35" cy="45" rx="5" ry="13" fill="#98FB98" />
          <ellipse cx="65" cy="45" rx="5" ry="13" fill="#98FB98" />
          
          {/* Strong legs */}
          <ellipse cx="45" cy="72" rx="4" ry="16" fill="#87CEEB" />
          <ellipse cx="55" cy="72" rx="4" ry="16" fill="#87CEEB" />
          
          {/* Sneakers */}
          <ellipse cx="45" cy="86" rx="6" ry="3" fill="#DDA0DD" />
          <ellipse cx="55" cy="86" rx="6" ry="3" fill="#DDA0DD" />
          
          {/* Fitness equipment around */}
          {/* Dumbbell */}
          <rect x="15" y="20" width="3" height="1.5" fill="#666" />
          <circle cx="14" cy="20.5" r="2" fill="#666" />
          <circle cx="19" cy="20.5" r="2" fill="#666" />
          
          {/* Water bottle */}
          <rect x="80" y="30" width="4" height="12" rx="2" fill="#87CEEB" />
          <rect x="81" y="28" width="2" height="3" fill="#666" />
          <rect x="81" y="32" width="2" height="8" fill="#B0E0E6" />
          
          {/* Apple (healthy eating) */}
          <circle cx="20" cy="60" r="4" fill="#FF6B6B" />
          <path d="M20 57 Q22 55 24 57" stroke="#90EE90" strokeWidth="1.5" fill="none" />
          <ellipse cx="22" cy="56" rx="1" ry="2" fill="#90EE90" />
          
          {/* Activity tracker */}
          <rect x="75" y="65" width="8" height="5" rx="2" fill="#333" />
          <rect x="76" y="66" width="6" height="3" rx="1" fill="#87CEEB" />
          
          {/* Stars for achievement */}
          <path d="M25 40 L26 43 L29 43 L27 45 L28 48 L25 46 L22 48 L23 45 L21 43 L24 43 Z" fill="#FFD700" />
          <path d="M85 50 L86 52 L88 52 L87 53 L87 55 L85 54 L83 55 L83 53 L82 52 L84 52 Z" fill="#FFD700" />
        </svg>
      );

    default:
      return (
        <svg {...baseProps}>
          <circle cx="50" cy="50" r="35" fill="#DDD" />
          <circle cx="40" cy="40" r="3" fill="#666" />
          <circle cx="60" cy="40" r="3" fill="#666" />
          <path d="M40 60 Q50 70 60 60" stroke="#666" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="50" y="85" textAnchor="middle" fontSize="12" fill="#666" fontWeight="bold">
            Fitness
          </text>
        </svg>
      );
  }
};

export default FitnessIcon;