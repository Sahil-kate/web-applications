// Format currency amount
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format month for charts
export const formatMonth = (dateString) => {
  if (!dateString) return 'Invalid';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid';
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous * 100).toFixed(1);
};

// Get color based on transaction type
export const getTransactionTypeColor = (type) => {
  return type === 'income' ? 'text-green-600' : 'text-red-600';
};

// Get badge color based on transaction type
export const getTransactionBadgeColor = (type) => {
  return type === 'income' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';
};

// Get category color for charts
export const getCategoryColor = (category) => {
  const colors = {
    'Food': '#3B82F6',
    'Transport': '#10B981',
    'Shopping': '#F59E0B',
    'Utilities': '#EF4444',
    'Health': '#8B5CF6',
    'Income': '#10B981',
    'Investment': '#8B5CF6'
  };
  return colors[category] || '#6B7280';
};

// Generate unique ID
export const generateId = () => {
  return Date.now() + Math.random();
};

// Validate transaction data
export const validateTransaction = (transaction) => {
  const errors = [];
  
  if (!transaction.date) {
    errors.push('Date is required');
  }
  
  if (!transaction.description || transaction.description.trim() === '') {
    errors.push('Description is required');
  }
  
  if (!transaction.amount || transaction.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (!transaction.category) {
    errors.push('Category is required');
  }
  
  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    errors.push('Type must be either income or expense');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
