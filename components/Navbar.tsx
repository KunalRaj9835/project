'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Clock } from 'lucide-react';

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
    <nav className="bg-white px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left side - Current page name (positioned to avoid sidebar) */}
        <div className="flex-shrink-0 ml-60">
          <h1 className="text-xl font-medium text-gray-900">
            {getCurrentPageName()}
          </h1>
        </div>

        {/* Right side - Search, buttons, and profile */}
        <div className="flex items-center gap-4">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter card name or number"
              className="w-64 px-4 py-2 bg-[#efefef] rounded-lg border-none outline-none text-sm placeholder-gray-500"
            />
          </div>

          {/* History/Search button */}
          <button className="w-10 h-10 bg-[#efefef] rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
            <Clock className="w-5 h-5 text-gray-600" />
          </button>

          {/* Combined Profile and Account button */}
          <button className="flex items-center gap-3 px-4 py-2 bg-[#efefef] rounded-full hover:bg-gray-300 transition-colors">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {userInitials}
            </div>
            <span className="text-sm font-medium text-gray-700">Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;