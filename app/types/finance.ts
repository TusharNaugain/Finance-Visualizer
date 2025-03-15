export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface Budget {
  category: string;
  amount: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', color: '#FF6B6B' },
  { id: '2', name: 'Transportation', color: '#4ECDC4' },
  { id: '3', name: 'Entertainment', color: '#45B7D1' },
  { id: '4', name: 'Shopping', color: '#96CEB4' },
  { id: '5', name: 'Bills', color: '#FFEEAD' },
  { id: '6', name: 'Others', color: '#D4A5A5' }
];