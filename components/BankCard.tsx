// components/BankCard.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import './BankCard.css';

interface BankCardProps {
  type: 'main' | 'salary' | 'add';
  cardNumber?: string;
}

const BankCard: React.FC<BankCardProps> = ({ type, cardNumber }) => {
  if (type === 'add') {
    return (
      <div className="addCardContainer">
        <div className="addCardIconContainer">
          <Plus className="addCardIcon" />
        </div>
        <div className="addCardText">
          View & Manage<br />cards
        </div>
      </div>
    );
  }

  const isMain = type === 'main';
  const cardClass = isMain ? 'mainCard' : 'salaryCard';
  const textClass = isMain ? 'mainCardText' : 'salaryCardText';

  return (
    <div className={`cardContainer ${cardClass}`}>
      <div className="cardHeader">
        <div>
          <div className={`virtualLabel ${textClass}`}>VIRTUAL</div>
          <div className={`cardTypeLabel ${textClass}`}>{isMain ? 'PLATINUM' : 'SALARY'}</div>
        </div>
        <div className={`mainLabel ${textClass}`}>{isMain ? 'Main' : ''}</div>
      </div>

      {!isMain && (
        <div className="logoContainer">
          <div className={`logoText ${textClass}`}>LOGO</div>
        </div>
      )}

      <div className={`cardNumber ${textClass}`}>
        {cardNumber || '•••• •••• •••• ••••'}
      </div>
    </div>
  );
};

export default BankCard;