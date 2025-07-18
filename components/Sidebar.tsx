'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Sidebar.css'; // Import CSS

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Cards', href: '/cards' },
    { label: 'Accounts', href: '/' },
    { label: 'Transactions', href: '/' },
  ];

  return (
    <div className={`sidebarWrapper ${className}`}>
      <div className="sidebar">
        <div className="logoWrapper">
          <div className="logoText">LOGO</div>
        </div>

        <nav>
          <ul className="menuList">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`menuItem ${isActive ? 'active' : 'inactive'}`}
                  >
                    <div className="menuIcon">
                      <Image src="/placeholder.svg" alt="icon" fill />
                    </div>
                    <span className="menuLabel">
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
