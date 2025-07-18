import React from 'react';
import { Card, Transaction } from './types';
import './CardDetailModal.css';

interface Props {
  card: Card;
  transactions: Transaction[];
  onClose: () => void;
}

const CardDetailModal: React.FC<Props> = ({ card, transactions, onClose }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <h2 className="modalTitle">Card Details</h2>
        <div className="cardInfo">{card.name} - {card.number}</div>
        <div className="cardMeta">{card.type} • {card.account}</div>
        <div className="transactionsSection">
          <h3 className="transactionsTitle">Recent Transactions</h3>
          <ul className="transactionsList">
            {transactions.map(tx => (
              <li key={tx.id} className="transactionItem">
                <div>
                  <div className="merchantName">{tx.merchant}</div>
                  <div className="transactionDate">{tx.date}</div>
                </div>
                <div className="transactionAmount">${tx.amount.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default CardDetailModal;