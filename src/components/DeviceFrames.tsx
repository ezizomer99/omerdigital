import React from 'react';
import Box from '@mui/material/Box';

interface DeviceFrameProps {
  children: React.ReactNode;
}

// Desktop Monitor Frame - Modern iMac-style
export function DesktopFrame({ children }: DeviceFrameProps) {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Monitor SVG Frame */}
      <Box
        component="svg"
        viewBox="0 0 800 560"
        sx={{ width: '100%', height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monitor Body - Dark frame */}
        <rect 
          x="40" 
          y="20" 
          width="720" 
          height="420" 
          rx="16" 
          fill="#1a1a1a"
        />
        
        {/* Screen bezel inner */}
        <rect 
          x="50" 
          y="30" 
          width="700" 
          height="390" 
          rx="8" 
          fill="#0d0d0d"
        />
        
        {/* Screen Content Area */}
        <rect 
          x="58" 
          y="38" 
          width="684" 
          height="374" 
          rx="4" 
          fill="#fafafa"
        />
        
        {/* Webcam dot */}
        <circle 
          cx="400" 
          cy="34" 
          r="3" 
          fill="#333"
        />
        
        {/* Monitor chin/bottom bezel */}
        <rect 
          x="40" 
          y="420" 
          width="720" 
          height="20" 
          fill="#1a1a1a"
        />
        
        {/* Stand neck */}
        <path 
          d="M350 440 L450 440 L440 490 L360 490 Z" 
          fill="#c0c0c0"
        />
        
        {/* Stand base */}
        <ellipse 
          cx="400" 
          cy="530" 
          rx="140" 
          ry="25" 
          fill="#d4d4d4"
        />
        <ellipse 
          cx="400" 
          cy="525" 
          rx="130" 
          ry="20" 
          fill="#e8e8e8"
        />
      </Box>
      
      {/* Image Container */}
      <Box
        sx={{
          position: 'absolute',
          top: '6.8%',
          left: '7.25%',
          width: '85.5%',
          height: '66.8%',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// Mobile Phone Frame - Modern iPhone-style
export function MobileFrame({ children }: DeviceFrameProps) {
  return (
    <Box sx={{ position: 'relative', maxWidth: '320px', mx: 'auto' }}>
      {/* Mobile Phone SVG Frame */}
      <Box
        component="svg"
        viewBox="0 0 280 580"
        sx={{ width: '100%', height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Phone Body - Dark frame */}
        <rect 
          x="10" 
          y="10" 
          width="260" 
          height="560" 
          rx="40" 
          fill="#1a1a1a"
        />
        
        {/* Inner bezel */}
        <rect 
          x="16" 
          y="16" 
          width="248" 
          height="548" 
          rx="36" 
          fill="#0d0d0d"
        />
        
        {/* Screen */}
        <rect 
          x="22" 
          y="22" 
          width="236" 
          height="536" 
          rx="32" 
          fill="#fafafa"
        />
        
        {/* Dynamic Island / Notch */}
        <rect 
          x="95" 
          y="32" 
          width="90" 
          height="28" 
          rx="14" 
          fill="#1a1a1a"
        />
        
        {/* Home Indicator */}
        <rect 
          x="100" 
          y="540" 
          width="80" 
          height="5" 
          rx="2.5" 
          fill="#333"
        />
        
        {/* Side button (power) */}
        <rect 
          x="270" 
          y="120" 
          width="3" 
          height="60" 
          rx="1.5" 
          fill="#2a2a2a"
        />
        
        {/* Volume buttons */}
        <rect 
          x="7" 
          y="100" 
          width="3" 
          height="35" 
          rx="1.5" 
          fill="#2a2a2a"
        />
        <rect 
          x="7" 
          y="145" 
          width="3" 
          height="35" 
          rx="1.5" 
          fill="#2a2a2a"
        />
      </Box>
      
      {/* Image Container */}
      <Box
        sx={{
          position: 'absolute',
          top: '3.8%',
          left: '7.9%',
          width: '84.3%',
          height: '92.4%',
          borderRadius: '11.4%',
          overflow: 'hidden',
          bgcolor: '#0d0d0d',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// Tablet Frame - Modern iPad-style
export function TabletFrame({ children }: DeviceFrameProps) {
  return (
    <Box sx={{ position: 'relative', maxWidth: '448px', mx: 'auto' }}>
      {/* Tablet SVG Frame */}
      <Box
        component="svg"
        viewBox="0 0 420 580"
        sx={{ width: '100%', height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tablet Body - Dark frame */}
        <rect 
          x="10" 
          y="10" 
          width="400" 
          height="560" 
          rx="28" 
          fill="#1a1a1a"
        />
        
        {/* Inner bezel */}
        <rect 
          x="16" 
          y="16" 
          width="388" 
          height="548" 
          rx="24" 
          fill="#0d0d0d"
        />
        
        {/* Screen */}
        <rect 
          x="24" 
          y="24" 
          width="372" 
          height="532" 
          rx="16" 
          fill="#fafafa"
        />
        
        {/* Front camera */}
        <circle 
          cx="210" 
          cy="17" 
          r="3" 
          fill="#333"
        />
        
        {/* Side button (power) */}
        <rect 
          x="410" 
          y="80" 
          width="3" 
          height="50" 
          rx="1.5" 
          fill="#2a2a2a"
        />
        
        {/* Volume buttons */}
        <rect 
          x="80" 
          y="7" 
          width="40" 
          height="3" 
          rx="1.5" 
          fill="#2a2a2a"
        />
        <rect 
          x="130" 
          y="7" 
          width="40" 
          height="3" 
          rx="1.5" 
          fill="#2a2a2a"
        />
      </Box>
      
      {/* Image Container */}
      <Box
        sx={{
          position: 'absolute',
          top: '4.1%',
          left: '5.7%',
          width: '88.6%',
          height: '91.7%',
          borderRadius: '3.8%',
          overflow: 'hidden',
          bgcolor: '#0d0d0d',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// Combined Device Showcase - Displays all three devices in a professional arrangement
interface DeviceShowcaseProps {
  desktopImage?: React.ReactNode;
  tabletImage?: React.ReactNode;
  mobileImage?: React.ReactNode;
}

export function DeviceShowcase({ desktopImage, tabletImage, mobileImage }: DeviceShowcaseProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 400, sm: 450, md: 500 },
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pb: 2,
      }}
    >
      {/* Desktop - Background center */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '85%', sm: '75%', md: '70%' },
          maxWidth: 600,
          zIndex: 1,
        }}
      >
        <DesktopFrame>
          {desktopImage}
        </DesktopFrame>
      </Box>

      {/* Tablet - Front left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: { xs: '2%', sm: '5%', md: '8%' },
          width: { xs: '35%', sm: '30%', md: '25%' },
          maxWidth: 200,
          zIndex: 2,
          transform: 'perspective(1000px) rotateY(15deg)',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(8px 8px 16px rgba(0,0,0,0.15))',
        }}
      >
        <TabletFrame>
          {tabletImage}
        </TabletFrame>
      </Box>

      {/* Mobile - Front right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: { xs: '5%', sm: '10%', md: '15%' },
          width: { xs: '18%', sm: '15%', md: '12%' },
          maxWidth: 100,
          zIndex: 3,
          transform: 'perspective(1000px) rotateY(-10deg)',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(8px 8px 16px rgba(0,0,0,0.15))',
        }}
      >
        <MobileFrame>
          {mobileImage}
        </MobileFrame>
      </Box>
    </Box>
  );
}
