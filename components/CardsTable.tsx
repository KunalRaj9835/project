import React from 'react';
import { Card } from './types';

interface CardsTableProps {
  cards: Card[];
  selectedCardId: string;
  onSelectCard: (card: Card) => void;
}

const CardsTable: React.FC<CardsTableProps> = ({ cards, selectedCardId, onSelectCard }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 text-sm font-semibold text-gray-700">
        <div>Name</div>
        <div>Type</div>
        <div>Number</div>
        <div>Account</div>
        <div>Status</div>
        <div>Amount</div>
      </div>
      <div className="divide-y divide-gray-100">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => onSelectCard(card)}
            className={`grid grid-cols-6 gap-4 p-4 cursor-pointer transition-colors ${
              selectedCardId === card.id ? 'bg-gray-200 border-l-4' : index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'
            } hover:bg-gray-100`}
          >
            <div>{card.name}</div>
            <div>{card.type}</div>
            <div>{card.number}</div>
            <div>{card.account}</div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${card.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={card.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>{card.status}</span>
            </div>
            <div className="font-semibold">${card.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsTable;
