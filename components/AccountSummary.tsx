// components/AccountSummary.tsx
import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import './AccountSummary.css';

const AccountSummary: React.FC = () => {
  return (
    <div className="summaryContainer">
      <div className="summaryHeader">
        <div className="titleSection">
          <h2 className="titleText">Accounts</h2>
          <span className="accountCount">4</span>
        </div>
        <div className="currencySection">
          <span className="currencySymbol">$</span>
          <ChevronDown className="chevronIcon" />
        </div>
      </div>

      <div className="totalBalanceSection">
        <div className="totalAmount">$54,200.02</div>
        <div className="totalDescription">Total balance across accounts</div>
      </div>

      <div className="accountCard">
        <div className="accountCardHeader">
          <h3 className="companyName">XYZ Company</h3>
          <MoreHorizontal className="moreIcon" />
        </div>

        <div className="balanceSection">
          <div className="balanceLabel">Balance</div>
          <div className="balanceAmount">$26,950.00</div>
        </div>

        <div className="cardsSection">
          <div className="cardsLabel">Cards</div>
          <div className="cardsInfo">
            <span className="cardActive">1 R</span>
            <span className="cardInactive">4 NR</span>
            <span className="cardInactive">1 P</span>
            <span className="statusActive">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;