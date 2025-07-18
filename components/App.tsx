import React, { useState } from 'react';
import { Filter, Plus, Circle, Eye, CreditCard, Clock, ArrowUp, Settings } from 'lucide-react';
import './App.css';

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
    <div className="modalOverlay">
      <div className="modalContainer">
        {/* Virtual Card */}
        <div className="virtualCard">
          <div className="cardHeader">
            <div>
              <div className="cardVirtualLabel">VIRTUAL</div>
              <div className="cardTypeLabel">PLATINUM</div>
            </div>
            <div className="cardMainSection">
              <div className="cardMainLabel">Main</div>
              <button className="revealButton">
                Reveal
              </button>
            </div>
          </div>
          <div className="cardNumber">
            {card.number.replace('****', '7413')} •••• •••• ••••
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actionButtonsContainer">
          <button className="actionButton">
            <div className="actionButtonIcon">
              <Circle className="iconSize" />
            </div>
            <span className="actionButtonLabel">Close</span>
          </button>
          <button className="actionButton">
            <div className="actionButtonIcon">
              <ArrowUp className="iconSize" />
            </div>
            <span className="actionButtonLabel">Top up</span>
          </button>
          <button className="actionButton">
            <div className="actionButtonIcon">
              <Settings className="iconSize" />
            </div>
            <span className="actionButtonLabel">Set Pin</span>
          </button>
        </div>

        {/* Account Info */}
        <div className="accountInfoContainer">
          <div className="accountInfoContent">
            <div>
              <div className="accountLabel">Account</div>
              <div className="accountName">XYZ Name</div>
            </div>
            <div className="statusSection">
              <div className="statusLabel">Status</div>
              <div className="statusContent">
                <div className={`statusIndicator ${
                  card.status === 'Active' ? 'statusActive' : 'statusInactive'
                }`}></div>
                <span className={`statusText ${
                  card.status === 'Active' ? 'statusTextActive' : 'statusTextInactive'
                }`}>
                  {card.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactionsSection">
          <h3 className="transactionsTitle">Recent Transactions</h3>
          <div className="transactionsList">
            {sampleTransactions.map((transaction) => (
              <div key={transaction.id} className="transactionItem">
                <div className="transactionContent">
                  <div className="merchantIcon">
                    {transaction.merchant === 'Xero' ? 'X' : 'D'}
                  </div>
                  <div>
                    <div className="merchantName">{transaction.merchant}</div>
                    <div className="transactionDate">{transaction.date}</div>
                    <div className="transactionLocation">{transaction.location}</div>
                  </div>
                </div>
                <div className="transactionAmount">
                  ${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <button className="viewAllButton">
            View All
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="closeButton"
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
    <div className="appContainer">
      {/* Main Container with Flexbox */}
      <div className="mainLayout">
        
        {/* Middle Panel */}
        <div className="middlePanel">
          <div className="middlePanelContent">
            {/* Header */}
            <div className="headerSection">
              <h1 className="headerTitle">Your cards</h1>
              <div className="headerButtons">
                <button className="headerButton">
                  Orders
                </button>
                <button className="headerButton">
                  <Plus className="headerButtonIcon" />
                  Create a card
                </button>
                <button className="headerButton">
                  <Filter className="headerButtonIcon" />
                  Filter
                </button>
              </div>
            </div>

            {/* Cards Table */}
            <div className="cardsTable">
              <div className="tableHeader">
                <div>Name</div>
                <div>Type</div>
                <div>Number</div>
                <div>Account</div>
                <div>Status</div>
                <div>Amount</div>
              </div>
              <div className="tableBody">
                {sampleCards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`tableRow ${
                      selectedCard.id === card.id
                        ? 'tableRowSelected'
                        : index % 2 === 0
                        ? 'tableRowEven'
                        : 'tableRowOdd'
                    }`}
                    onClick={() => setSelectedCard(card)}
                  >
                    <div className="tableCell tableCellName">{card.name}</div>
                    <div className="tableCell">{card.type}</div>
                    <div className="tableCell">{card.number}</div>
                    <div className="tableCell">{card.account}</div>
                    <div className="tableCell tableCellStatus">
                      <div
                        className={`statusIndicator ${
                          card.status === 'Active' ? 'statusActive' : 'statusInactive'
                        }`}
                      ></div>
                      <span
                        className={`statusText ${
                          card.status === 'Active' ? 'statusTextActive' : 'statusTextInactive'
                        }`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <div className="tableCell tableCellAmount">
                      ${card.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="tableFooter">
                <button className="loadMoreButton">Load more</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Panel */}
        <div className="rightPanel">
          <div className="rightPanelContent">
            
            {/* Selected Card */}
            <div className="selectedCardSection">
              <div className="selectedCard">
                <div className="cardHeader">
                  <div>
                    <div className="cardVirtualLabel">VIRTUAL</div>
                    <div className="cardTypeLabel">PLATINUM</div>
                  </div>
                  <div className="cardMainSection">
                    <div className="cardMainLabel">Main</div>
                    <button className="revealButton">
                      Reveal
                    </button>
                  </div>
                </div>
                <div className="cardNumber">
                  {selectedCard.number.replace('****', '7413')} •••• •••• ••••
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rightPanelActions">
              <div className="rightPanelActionButtons">
                <div className="rightPanelActionButtonsContainer">
                  <button className="rightPanelActionButton">
                    <div className="rightPanelActionButtonIcon">
                      <Circle className="rightPanelIconSize" />
                    </div>
                    <span className="rightPanelActionButtonLabel">Close</span>
                  </button>
                  <button className="rightPanelActionButton">
                    <div className="rightPanelActionButtonIcon">
                      <ArrowUp className="rightPanelIconSize" />
                    </div>
                    <span className="rightPanelActionButtonLabel">Top up</span>
                  </button>
                  <button className="rightPanelActionButton">
                    <div className="rightPanelActionButtonIcon">
                      <Settings className="rightPanelIconSize" />
                    </div>
                    <span className="rightPanelActionButtonLabel">Set Pin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="rightPanelAccountStatus">
              <div className="rightPanelAccountStatusContent">
                <div className="rightPanelAccountStatusInfo">
                  <div>
                    <div className="accountLabel">Account</div>
                    <div className="accountName">XYZ Name</div>
                  </div>
                  <div className="statusSection">
                    <div className="statusLabel">Status</div>
                    <div className="statusContent">
                      <div className={`statusIndicator ${
                        selectedCard.status === 'Active' ? 'statusActive' : 'statusInactive'
                      }`}></div>
                      <span className={`statusText ${
                        selectedCard.status === 'Active' ? 'statusTextActive' : 'statusTextInactive'
                      }`}>
                        {selectedCard.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rightPanelTransactions">
              <div className="rightPanelTransactionsContent">
                <h3 className="rightPanelTransactionsTitle">Recent Transactions</h3>
                <div className="rightPanelTransactionsList">
                  {sampleTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="rightPanelTransactionItem">
                      <div className="rightPanelTransactionContent">
                        <div className="rightPanelMerchantIcon">
                          {transaction.merchant === 'Xero' ? 'X' : 'D'}
                        </div>
                        <div>
                          <div className="rightPanelMerchantName">{transaction.merchant}</div>
                          <div className="rightPanelTransactionDate">{transaction.date}</div>
                          <div className="rightPanelTransactionLocation">{transaction.location}</div>
                        </div>
                      </div>
                      <div className="rightPanelTransactionAmount">
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="rightPanelViewAllButton"
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