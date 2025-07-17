// src/app/page.tsx
'use client'; // This is a Client Component because it uses React state and effects.
// Note: The import path uses '@/' which is an alias for the 'src/' directory.
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import React from 'react';
import App from '@/components/App'; // Import your main App component
export default function HomePage() {
  const [mainTab, setMainTab] = React.useState('strategy'); // Example state for the main tab
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />
    
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 ml-60">
            <App />
        </main>
      </div>
    </div>
  );
}