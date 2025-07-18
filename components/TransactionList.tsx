// components/TransactionList.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './TransactionList.css';

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
    <div className="transactionContainer">
      <div className="transactionHeader">
        <div className="balanceSection">
          <span className="balanceAmount">$26,426.50</span>
          <ChevronDown className="chevronIcon" />
        </div>
        <div className="actionButtons">
          <button className="actionButton">
            <img src="/placeholder.svg" alt="Details Icon" className="buttonIcon" />
            Details
          </button>
          <button className="actionButton">
            <img src="/placeholder.svg" alt="Add Money Icon" className="buttonIcon" />
            Add Money
          </button>
        </div>
      </div>

      <div className="cardInfo">Card 7413 - Main</div>

      <div className="tableContainer">
        <table className="transactionTable">
          <thead>
            <tr className="tableHeader">
              <th className="tableHeaderCell">Transaction</th>
              <th className="tableHeaderCell">Date</th>
              <th className="tableHeaderCell">Account</th>
              <th className="tableHeaderCell">Card</th>
              <th className="tableHeaderCellRight">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`tableRow ${index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'}`}
              >
                <td className="tableCell">
                  <div className="transactionInfo">
                    <div className="merchantIcon">
                      <span className="iconStar">★</span>
                    </div>
                    <span className="merchantName">{transaction.merchant}</span>
                  </div>
                </td>
                <td className="tableCell tableCellSecondary">{transaction.time}</td>
                <td className="tableCell tableCellSecondary">{transaction.account}</td>
                <td className="tableCell tableCellSecondary">{transaction.card}</td>
                <td className="tableCell tableCellRight">
                  ${transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="seeAllSection">
        <button className="seeAllButton">See all</button>
      </div>
    </div>
  );
};

export default TransactionList;