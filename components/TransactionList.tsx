// components/TransactionList.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const mockTransactions = [
  { id: 1, merchant: 'Walmart', time: '10:22am', account: 'Connect4Dig', card: '7413', amount: 149.45 },
  { id: 2, merchant: 'Walmart', time: '10:22am', account: 'Connect4Dig', card: '7413', amount: 149.45 },
  { id: 3, merchant: 'Walmart', time: '10:22am', account: 'Connect4Dig', card: '7413', amount: 149.45 },
  { id: 4, merchant: 'Walmart', time: '10:22am', account: 'Connect4Dig', card: '7413', amount: 149.45 },
  { id: 5, merchant: 'Walmart', time: '10:22am', account: 'Connect4Dig', card: '7413', amount: 149.45 },
  { id: 6, merchant: 'Walmart', time: '10:22am', account: 'Connect4Dig', card: '7413', amount: 149.45 },
];

const TransactionList: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState('7413');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-gray-800">$26,426.50</span>
          <ChevronDown className="w-5 h-5 text-gray-600 " />
        </div>
        <div className="flex gap-3">
  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
    <img src="/placeholder.svg" alt="Details Icon" className="w-4 h-4" />
    Details
  </button>
  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
    <img src="/placeholder.svg" alt="Add Money Icon" className="w-4 h-4" />
    Add Money
  </button>
</div>

      </div>

      <div className="text-sm text-gray-500 mb-6">Card 7413 - Main</div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 text-sm font-medium text-gray-600">Transaction</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Account</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Card</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
  {mockTransactions.map((transaction, index) => (
    <tr
      key={transaction.id}
      className={`${
        index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'
      } border-b border-gray-50 hover:bg-gray-100`}
    >
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">★</span>
          </div>
          <span className="text-gray-800 font-medium">{transaction.merchant}</span>
        </div>
      </td>
      <td className="py-4 text-gray-600">{transaction.time}</td>
      <td className="py-4 text-gray-600">{transaction.account}</td>
      <td className="py-4 text-gray-600">{transaction.card}</td>
      <td className="py-4 text-right text-gray-800 font-medium">
        ${transaction.amount}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      <div className="mt-6 text-center">
        <button className="text-gray-500 hover:text-gray-700 text-sm">See all</button>
      </div>
    </div>
  );
};

export default TransactionList;
