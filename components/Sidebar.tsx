import React, { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
  className?: string;
  mobilePosition?: 'top' | 'bottom';
}

const Sidebar: React.FC<SidebarProps> = ({ children, className = '', mobilePosition = 'bottom' }) => {
  // Always return the grid column for desktop
  // For mobile-top, we'll handle ordering with CSS
  return (
    <div className={`lg:col-span-1 ${className} ${mobilePosition === 'top' ? 'order-first lg:order-last' : ''}`}>
      <div className="lg:sticky lg:top-20 space-y-8">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
