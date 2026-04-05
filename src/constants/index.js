// Transaction categories
export const TRANSACTION_CATEGORIES = [
  'Food',
  'Transport', 
  'Shopping',
  'Utilities',
  'Health',
  'Income',
  'Investment'
];

// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
};

// User roles
export const USER_ROLES = {
  VIEWER: 'Viewer',
  ADMIN: 'Admin'
};

// Chart colors
export const CHART_COLORS = {
  FOOD: '#3B82F6',
  TRANSPORT: '#10B981', 
  SHOPPING: '#F59E0B',
  UTILITIES: '#EF4444',
  HEALTH: '#8B5CF6',
  DEFAULT: '#6B7280'
};

// Sample transactions for initial data
export const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2024-04-05', description: 'Grocery Store', category: 'Food', amount: 85.50, type: 'expense' },
  { id: 2, date: '2024-04-04', description: 'Salary Deposit', category: 'Income', amount: 3500.00, type: 'income' },
  { id: 3, date: '2024-04-04', description: 'Electric Bill', category: 'Utilities', amount: 120.00, type: 'expense' },
  { id: 4, date: '2024-04-03', description: 'Restaurant', category: 'Food', amount: 45.00, type: 'expense' },
  { id: 5, date: '2024-04-03', description: 'Freelance Project', category: 'Income', amount: 750.00, type: 'income' },
  { id: 6, date: '2024-04-02', description: 'Gas Station', category: 'Transport', amount: 60.00, type: 'expense' },
  { id: 7, date: '2024-04-02', description: 'Online Shopping', category: 'Shopping', amount: 125.00, type: 'expense' },
  { id: 8, date: '2024-04-01', description: 'Investment Return', category: 'Investment', amount: 200.00, type: 'income' },
  { id: 9, date: '2024-03-31', description: 'Coffee Shop', category: 'Food', amount: 12.50, type: 'expense' },
  { id: 10, date: '2024-03-30', description: 'Gym Membership', category: 'Health', amount: 50.00, type: 'expense' },
  { id: 11, date: '2024-03-29', description: 'Bonus Payment', category: 'Income', amount: 500.00, type: 'income' },
  { id: 12, date: '2024-03-28', description: 'Internet Bill', category: 'Utilities', amount: 59.99, type: 'expense' },
  { id: 13, date: '2024-03-15', description: 'Grocery Store', category: 'Food', amount: 92.30, type: 'expense' },
  { id: 14, date: '2024-03-10', description: 'Restaurant', category: 'Food', amount: 38.75, type: 'expense' },
  { id: 15, date: '2024-03-05', description: 'Gas Station', category: 'Transport', amount: 55.20, type: 'expense' },
  { id: 16, date: '2024-02-28', description: 'Electric Bill', category: 'Utilities', amount: 115.50, type: 'expense' },
  { id: 17, date: '2024-02-20', description: 'Online Shopping', category: 'Shopping', amount: 89.99, type: 'expense' },
  { id: 18, date: '2024-02-15', description: 'Coffee Shop', category: 'Food', amount: 15.25, type: 'expense' }
];

// Filter options
export const FILTER_OPTIONS = {
  TYPE: {
    ALL: 'all',
    INCOME: 'income',
    EXPENSE: 'expense'
  },
  SORT_BY: {
    DATE: 'date',
    AMOUNT: 'amount'
  },
  SORT_ORDER: {
    ASC: 'asc',
    DESC: 'desc'
  }
};

// Storage keys
export const STORAGE_KEYS = {
  FINANCE_DATA: 'finance-storage'
};
