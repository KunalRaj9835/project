'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname(); // ← Get current path

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Cards', href: '/cards' },
    { label: 'Accounts', href: '/' },
    { label: 'Transactions', href: '/' },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="bg-[#e4e4e4] h-screen fixed left-0 top-0 z-[60] w-[236px]">
        <div className="flex items-center p-6 pb-8">
          <div className="text-2xl font-bold text-black">LOGO</div>
        </div>

        <nav>
          <ul className="space-y-1 px-4">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-gray-700 transition-colors duration-200 rounded-lg
                      ${isActive 
                        ? 'bg-white text-black shadow-sm' 
                        : 'bg-transparent hover:bg-gray-300'
                      }
                    `}
                  >
                    <div className="relative w-5 h-5 mr-3">
                      <Image src="/placeholder.svg" alt="icon" fill />
                    </div>
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
