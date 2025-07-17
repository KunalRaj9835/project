// components/BankCard.tsx
import React from 'react';
import { Plus } from 'lucide-react';

interface BankCardProps {
  type: 'main' | 'salary' | 'add';
  cardNumber?: string;
}

const BankCard: React.FC<BankCardProps> = ({ type, cardNumber }) => {
  if (type === 'add') {
    return (
      <div className="w-64 h-40 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <Plus className="w-6 h-6 text-gray-600" />
        </div>
        <div className="text-sm text-gray-600 text-center">
          View & Manage<br />cards
        </div>
      </div>
    );
  }

  const isMain = type === 'main';
  const bgColor = isMain ? 'bg-[#f5f83e]' : 'bg-[#595959]';
  const textColor = isMain ? 'text-black' : 'text-white';

  return (
    <div className={`w-64 h-40 ${bgColor} rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden`}>
      <div className="flex justify-between items-start">
        <div>
          <div className={`text-sm font-medium ${textColor} opacity-80`}>VIRTUAL</div>
          <div className={`text-lg font-bold ${textColor}`}>{isMain ? 'PLATINUM' : 'SALARY'}</div>
        </div>
        <div className={`text-sm ${textColor}`}>{isMain ? 'Main' : ''}</div>
      </div>

      {!isMain && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`text-sm ${textColor} opacity-60`}>LOGO</div>
        </div>
      )}

      <div className={`text-lg font-mono ${textColor}`}>
        {cardNumber || '•••• •••• •••• ••••'}
      </div>
    </div>
  );
};

export default BankCard;
