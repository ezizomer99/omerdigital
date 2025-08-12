import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
}

// Desktop/Laptop Frame
export function DesktopFrame({ children, className = "" }: DeviceFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Laptop SVG Frame */}
      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Laptop Screen */}
        <rect 
          x="50" 
          y="30" 
          width="700" 
          height="400" 
          rx="12" 
          fill="#1f2937" 
          stroke="#374151" 
          strokeWidth="3"
        />
        
        {/* Screen Content Area */}
        <rect 
          x="65" 
          y="45" 
          width="670" 
          height="370" 
          rx="8" 
          fill="#000000"
        />
        
        {/* Laptop Base */}
        <path 
          d="M20 430 L780 430 L760 470 L40 470 Z" 
          fill="#374151"
        />
        
        {/* Trackpad */}
        <rect 
          x="350" 
          y="440" 
          width="100" 
          height="20" 
          rx="4" 
          fill="#1f2937"
        />
      </svg>
      
      {/* Image Container */}
      <div className="absolute top-[9%] left-[8.125%] w-[83.75%] h-[74%] rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Mobile Phone Frame
export function MobileFrame({ children, className = "" }: DeviceFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mobile Phone SVG Frame */}
      <svg 
        viewBox="0 0 300 600" 
        className="w-full h-auto max-w-xs mx-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Phone Body */}
        <rect 
          x="20" 
          y="20" 
          width="260" 
          height="560" 
          rx="25" 
          fill="#1f2937" 
          stroke="#374151" 
          strokeWidth="3"
        />
        
        {/* Screen */}
        <rect 
          x="35" 
          y="60" 
          width="230" 
          height="480" 
          rx="15" 
          fill="#000000"
        />
        
        {/* Home Indicator (iPhone style) */}
        <rect 
          x="125" 
          y="550" 
          width="50" 
          height="4" 
          rx="2" 
          fill="#374151"
        />
        
        {/* Camera/Speaker */}
        <rect 
          x="130" 
          y="35" 
          width="40" 
          height="6" 
          rx="3" 
          fill="#374151"
        />
      </svg>
      
      {/* Image Container */}
      <div className="absolute top-[10%] left-[11.67%] w-[76.67%] h-[80%] rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Tablet Frame (optional)
export function TabletFrame({ children, className = "" }: DeviceFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Tablet SVG Frame */}
      <svg 
        viewBox="0 0 500 700" 
        className="w-full h-auto max-w-md mx-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tablet Body */}
        <rect 
          x="30" 
          y="30" 
          width="440" 
          height="640" 
          rx="20" 
          fill="#1f2937" 
          stroke="#374151" 
          strokeWidth="3"
        />
        
        {/* Screen */}
        <rect 
          x="50" 
          y="70" 
          width="400" 
          height="560" 
          rx="12" 
          fill="#000000"
        />
        
        {/* Home Button */}
        <circle 
          cx="250" 
          cy="650" 
          r="15" 
          fill="#374151"
        />
      </svg>
      
      {/* Image Container */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
