import React from 'react';
import { Card, Transaction } from './types';

interface Props {
  card: Card;
  transactions: Transaction[];
  onClose: () => void;
}

const CardDetailModal: React.FC<Props> = ({ card, transactions, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Card Details</h2>
        <div className="text-lg font-medium text-gray-700 mb-2">{card.name} - {card.number}</div>
        <div className="mb-4 text-gray-600">{card.type} • {card.account}</div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Recent Transactions</h3>
          <ul className="space-y-2">
            {transactions.map(tx => (
              <li key={tx.id} className="flex justify-between bg-gray-100 p-3 rounded">
                <div>
                  <div className="font-medium">{tx.merchant}</div>
                  <div className="text-xs text-gray-500">{tx.date}</div>
                </div>
                <div className="font-bold text-right">${tx.amount.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200">Close</button>
      </div>
    </div>
  );
};

export default CardDetailModal;
