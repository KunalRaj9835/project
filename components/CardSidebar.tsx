import React from 'react';
import { Card, Transaction } from './types';
import { ArrowUp, Circle, Settings } from 'lucide-react';

interface Props {
  card: Card;
  transactions: Transaction[];
  onViewAll: () => void;
}

const CardSidebar: React.FC<Props> = ({ card, transactions, onViewAll }) => {
  return (
    <div className="w-96 bg-white border-l border-gray-200 p-6">
      <div className="bg-yellow-200 rounded-xl p-6 shadow mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <div className="text-sm text-gray-700">VIRTUAL</div>
            <div className="text-lg font-bold text-gray-900">PLATINUM</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">Main</div>
            <button className="bg-white px-3 py-1 mt-2 rounded-md text-sm">Reveal</button>
          </div>
        </div>
        <div className="text-xl font-bold tracking-widest text-gray-800">{card.number.replace('****', '7413')} •••• •••• ••••</div>
      </div>

      <div className="flex gap-3 mb-6">
        {[{ label: 'Close', Icon: Circle }, { label: 'Top up', Icon: ArrowUp }, { label: 'Set Pin', Icon: Settings }].map(({ label, Icon }) => (
          <button key={label} className="flex flex-col items-center flex-1 p-3 bg-white rounded-lg ">
            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full mb-2">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-gray-600">Account</div>
            <div className="font-medium text-gray-800">XYZ Name</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Status</div>
            <div className="flex items-center justify-end">
              <div className={`w-2 h-2 rounded-full mr-2 ${card.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={card.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>{card.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((t) => (
            <div key={t.id} className="flex justify-between items-center p-2 bg-white rounded shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center mr-3 text-sm font-bold">
                  {t.merchant[0]}
                </div>
                <div>
                  <div className="font-medium">{t.merchant}</div>
                  <div className="text-xs text-gray-500">{t.date}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
              <div className="font-bold">${t.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-blue-600 font-medium" onClick={onViewAll}>View All</button>
      </div>
    </div>
  );
};

export default CardSidebar;
