import React from 'react';
import { Card, Transaction } from './types';
import { ArrowUp, Circle, Settings } from 'lucide-react';
import './CardSidebar.css';

interface Props {
  card: Card;
  transactions: Transaction[];
  onViewAll: () => void;
}

const CardSidebar: React.FC<Props> = ({ card, transactions, onViewAll }) => {
  return (
    <div className="sidebarContainer">
      <div className="cardDisplay">
        <div className="cardHeader">
          <div>
            <div className="virtualLabel">VIRTUAL</div>
            <div className="cardTypeLabel">PLATINUM</div>
          </div>
          <div className="cardActions">
            <div className="mainLabel">Main</div>
            <button className="revealButton">Reveal</button>
          </div>
        </div>
        <div className="cardNumber">{card.number.replace('****', '7413')} •••• •••• ••••</div>
      </div>

      <div className="actionButtons">
        {[{ label: 'Close', Icon: Circle }, { label: 'Top up', Icon: ArrowUp }, { label: 'Set Pin', Icon: Settings }].map(({ label, Icon }) => (
          <button key={label} className="actionButton">
            <div className="actionIcon">
              <Icon className="iconSize" />
            </div>
            <span className="actionLabel">{label}</span>
          </button>
        ))}
      </div>

      <div className="accountInfo">
        <div className="accountDetails">
          <div>
            <div className="accountLabel">Account</div>
            <div className="accountName">XYZ Name</div>
          </div>
          <div className="statusSection">
            <div className="statusLabel">Status</div>
            <div className="statusContainer">
              <div className={`statusDot ${card.status === 'Active' ? 'statusActive' : 'statusInactive'}`}></div>
              <span className={card.status === 'Active' ? 'statusTextActive' : 'statusTextInactive'}>{card.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="transactionsSection">
        <h3 className="transactionsTitle">Recent Transactions</h3>
        <div className="transactionsList">
          {transactions.slice(0, 3).map((t) => (
            <div key={t.id} className="transactionItem">
              <div className="transactionLeft">
                <div className="merchantAvatar">
                  {t.merchant[0]}
                </div>
                <div>
                  <div className="merchantName">{t.merchant}</div>
                  <div className="transactionDate">{t.date}</div>
                  <div className="transactionLocation">{t.location}</div>
                </div>
              </div>
              <div className="transactionAmount">${t.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <button className="viewAllButton" onClick={onViewAll}>View All</button>
      </div>
    </div>
  );
};

export default CardSidebar;