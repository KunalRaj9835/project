import React, { useState } from 'react';
import { Filter, Plus, Circle, Eye, CreditCard, Clock, ArrowUp, Settings } from 'lucide-react';

// Types
interface Card {
  id: string;
  name: string;
  type: 'Physical' | 'Non-reloadable' | 'Reloadable';
  number: string;
  account: string;
  status: 'Active' | 'Closed';
  amount: number;
}

interface Transaction {
  id: string;
  merchant: string;
  date: string;
  location: string;
  amount: number;
}

// Sample data
const sampleCards: Card[] = [
  { id: '1', name: 'Primary', type: 'Non-reloadable', number: '**** 7413', account: 'Connect4Dig', status: 'Active', amount: 1499.20 },
  { id: '2', name: 'Primary', type: 'Physical', number: '**** 7413', account: 'Connect4Dig', status: 'Closed', amount: 1499.20 },
  { id: '3', name: 'Primary', type: 'Non-reloadable', number: '**** 7413', account: 'Connect4Dig', status: 'Active', amount: 1499.20 },
  { id: '4', name: 'Primary', type: 'Physical', number: '**** 1123', account: 'Connect4Dig', status: 'Active', amount: 1499.20 },
  { id: '5', name: 'Primary', type: 'Non-reloadable', number: '**** 2783', account: 'Connect4Dig', status: 'Active', amount: 1499.20 },
  { id: '6', name: 'Primary', type: 'Reloadable', number: '**** 1155', account: 'Connect4Dig', status: 'Closed', amount: 0.00 },
  { id: '7', name: 'Primary', type: 'Reloadable', number: '**** 2296', account: 'Connect4Dig', status: 'Active', amount: 1499.20 },
  { id: '8', name: 'Primary', type: 'Non-reloadable', number: '**** 9909', account: 'Connect4Dig', status: 'Active', amount: 1499.20 },
  
];

const sampleTransactions: Transaction[] = [
  { id: '1', merchant: 'Xero', date: '23 June, 09:06', location: 'Jersey, United Kingdom', amount: 145 },
  { id: '2', merchant: 'Dunkin Donuts', date: '23 June, 09:06', location: 'Jersey, United Kingdom', amount: 2.75 },
  { id: '3', merchant: 'Xero', date: '23 June, 09:06', location: 'Jersey, United Kingdom', amount: 145 },
  { id: '4', merchant: 'Xero', date: '23 June, 09:06', location: 'Jersey, United Kingdom', amount: 145 },
  { id: '5', merchant: 'Xero', date: '23 June, 09:06', location: 'Jersey, United Kingdom', amount: 145 },
];

// Card Detail Component
const CardDetail: React.FC<{ card: Card; onClose: () => void }> = ({ card, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        {/* Virtual Card */}
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">VIRTUAL</div>
              <div className="text-lg font-bold text-gray-800">PLATINUM</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">Main</div>
              <button className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-md text-sm mt-2 hover:bg-opacity-100 transition-all">
                Reveal
              </button>
            </div>
          </div>
          <div className="text-xl font-bold text-gray-800 tracking-wider">
            {card.number.replace('****', '7413')} •••• •••• ••••
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-6 gap-3">
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <Circle className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Close</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <ArrowUp className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Top up</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Set Pin</span>
          </button>
        </div>

        {/* Account Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600 mb-1">Account</div>
              <div className="font-medium text-gray-800">XYZ Name</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  card.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className={`font-medium ${
                  card.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {card.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {sampleTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {transaction.merchant === 'Xero' ? 'X' : 'D'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{transaction.merchant}</div>
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                    <div className="text-xs text-gray-500">{transaction.location}</div>
                  </div>
                </div>
                <div className="font-bold text-gray-800">
                  ${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-blue-600 font-medium mt-4 hover:text-blue-700 transition-colors">
            View All
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card>(sampleCards[0]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with Flexbox */}
      <div className="flex h-screen">
        
        {/* Middle Panel */}
        <div className="flex-1 bg-white ">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Your cards</h1>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Orders
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Plus className="w-4 h-4" />
                  Create a card
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Cards Table */}
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
    {sampleCards.map((card, index) => (
      <div
        key={card.id}
        className={`grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
          selectedCard.id === card.id
            ? 'bg-gray-200 border-l-4'
            : index % 2 === 0
            ? 'bg-[#f7f7f7]'
            : 'bg-white'
        }`}
        onClick={() => setSelectedCard(card)}
      >
        <div className="font-medium text-gray-800">{card.name}</div>
        <div className="text-gray-600">{card.type}</div>
        <div className="text-gray-600">{card.number}</div>
        <div className="text-gray-600">{card.account}</div>
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              card.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></div>
          <span
            className={`font-medium ${
              card.status === 'Active' ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {card.status}
          </span>
        </div>
        <div className="font-semibold text-gray-800">
          ${card.amount.toFixed(2)}
        </div>
      </div>
    ))}
  </div>
  <div className="p-4 text-center bg-gray-50">
    <button className="text-gray-500 hover:text-gray-700 font-medium">Load more</button>
  </div>
</div>

          </div>
        </div>

        {/* Right Panel */}
        <div className="w-96 bg-white  border-l border-gray-200">
          <div className="p-6 h-full ">
            
            {/* Selected Card */}
            <div className="mb-6">
              <div className="bg-[#f5f83e] rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">VIRTUAL</div>
                    <div className="text-lg font-bold text-gray-800">PLATINUM</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">Main</div>
                    <button className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-md text-sm mt-2 hover:bg-opacity-100 transition-all">
                      Reveal
                    </button>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800 tracking-wider">
                  {selectedCard.number.replace('****', '7413')} •••• •••• ••••
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between space-x-4">
                  <button className="flex flex-col items-center flex-1 p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <Circle className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Close</span>
                  </button>
                  <button className="flex flex-col items-center flex-1 p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <ArrowUp className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Top up</span>
                  </button>
                  <button className="flex flex-col items-center flex-1 p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <Settings className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Set Pin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Account</div>
                    <div className="font-medium text-gray-800">XYZ Name</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        selectedCard.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`font-medium ${
                        selectedCard.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {selectedCard.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {sampleTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                          {transaction.merchant === 'Xero' ? 'X' : 'D'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{transaction.merchant}</div>
                          <div className="text-xs text-gray-600">{transaction.date}</div>
                          <div className="text-xs text-gray-500">{transaction.location}</div>
                        </div>
                      </div>
                      <div className="font-bold text-gray-800 text-sm">
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="w-full text-center text-blue-600 font-medium mt-4 text-sm hover:text-blue-700 transition-colors"
                  onClick={() => handleCardClick(selectedCard)}
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Detail Modal */}
      {showModal && (
        <CardDetail card={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;