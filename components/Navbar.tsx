'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Clock } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  userInitials?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  userInitials = "EH"
}) => {
  const pathname = usePathname();
  
  // Get current page name from pathname
  const getCurrentPageName = () => {
    const path = pathname.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="navbarContainer">
      <div className="navbarContent">
        {/* Left side - Current page name (positioned to avoid sidebar) */}
        <div className="pageNameContainer">
          <h1 className="pageNameText">
            {getCurrentPageName()}
          </h1>
        </div>

        {/* Right side - Search, buttons, and profile */}
        <div className="navbarActions">
          {/* Search input */}
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Enter card name or number"
              className="searchInput"
            />
          </div>

          {/* History/Search button */}
          <button className="historyButton">
            <Clock className="historyIcon" />
          </button>

          {/* Combined Profile and Account button */}
          <button className="profileButton">
            <div className="profileAvatar">
              {userInitials}
            </div>
            <span className="profileLabel">Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;