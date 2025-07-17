export interface Card {
  id: string;
  name: string;
  type: 'Physical' | 'Non-reloadable' | 'Reloadable';
  number: string;
  account: string;
  status: 'Active' | 'Closed';
  amount: number;
}

export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  location: string;
  amount: number;
}
