// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import BankCard from '@/components/BankCard';
import AccountSummary from '@/components/AccountSummary';
import TransactionList from '@/components/TransactionList';

export default function HomePage() {
  

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 bg-white ml-60">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2/3 - Cards + Transactions */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex gap-6">
                  <BankCard type="main" cardNumber="7413 •••• •••• ••••" />
                  <BankCard type="salary" cardNumber="5176 •••• •••• ••••" />
                  <BankCard type="add" />
                </div>

                <TransactionList />
              </div>

              {/* Right 1/3 - Account Summary */}
              <div className="lg:col-span-1">
                <AccountSummary />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
