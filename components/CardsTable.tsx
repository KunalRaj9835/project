import React from 'react';
import { Card } from './types';
import './CardsTable.css';

interface CardsTableProps {
  cards: Card[];
  selectedCardId: string;
  onSelectCard: (card: Card) => void;
}

const CardsTable: React.FC<CardsTableProps> = ({ cards, selectedCardId, onSelectCard }) => {
  return (
    <div className="tableContainer">
      <div className="tableHeader">
        <div>Name</div>
        <div>Type</div>
        <div>Number</div>
        <div>Account</div>
        <div>Status</div>
        <div>Amount</div>
      </div>
      <div className="tableBody">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => onSelectCard(card)}
            className={`tableRow ${
              selectedCardId === card.id ? 'selectedRow' : index % 2 === 0 ? 'evenRow' : 'oddRow'
            }`}
          >
            <div>{card.name}</div>
            <div>{card.type}</div>
            <div>{card.number}</div>
            <div>{card.account}</div>
            <div className="statusCell">
              <div className={`statusDot ${card.status === 'Active' ? 'statusActive' : 'statusInactive'}`}></div>
              <span className={card.status === 'Active' ? 'statusTextActive' : 'statusTextInactive'}>{card.status}</span>
            </div>
            <div className="amountCell">${card.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsTable;