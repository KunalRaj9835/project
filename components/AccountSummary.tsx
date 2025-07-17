// components/AccountSummary.tsx
import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';

const AccountSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-800">Accounts</h2>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded-full">$</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-gray-800 mb-1">$54,200.02</div>
        <div className="text-sm text-gray-500">Total balance across accounts</div>
      </div>

      <div className=" rounded-xl border-t border-gray-100 bg-[#f9f9f9] p-4">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">XYZ Company</h3>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Balance</div>
          <div className="text-2xl font-semibold text-gray-800">$26,950.00</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-2">Cards</div>
          <div className="flex gap-4">
            <span className="text-sm text-gray-700">1 R</span>
            <span className="text-sm text-gray-400">4 NR</span>
            <span className="text-sm text-gray-400">1 P</span>
            <span className="text-sm text-green-500 ml-auto">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
