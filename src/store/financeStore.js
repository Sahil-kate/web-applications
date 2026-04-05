import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  INITIAL_TRANSACTIONS, 
  USER_ROLES, 
  FILTER_OPTIONS, 
  STORAGE_KEYS 
} from '../constants';

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // Theme Management
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // Role Management
      currentRole: USER_ROLES.VIEWER,
      setCurrentRole: (role) => set({ currentRole: role }),

      // Transactions Data
      transactions: INITIAL_TRANSACTIONS,

      // Transaction CRUD Operations
      addTransaction: (transactionData) => set((state) => ({
        transactions: [...state.transactions, { 
          ...transactionData, 
          id: Math.max(...state.transactions.map(t => t.id), 0) + 1 
        }]
      })),

      updateTransaction: (transactionId, updatedTransactionData) => set((state) => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId ? { ...updatedTransactionData, id: transactionId } : transaction
        )
      })),

      deleteTransaction: (transactionId) => set((state) => ({
        transactions: state.transactions.filter(transaction => transaction.id !== transactionId)
      })),

      // Transaction Filters
      filters: {
        searchTerm: '',
        filterType: FILTER_OPTIONS.TYPE.ALL,
        sortBy: FILTER_OPTIONS.SORT_BY.DATE,
        sortOrder: FILTER_OPTIONS.SORT_ORDER.DESC
      },

      setFilter: (filterKey, filterValue) => set((state) => ({
        filters: { ...state.filters, [filterKey]: filterValue }
      })),

      resetFilters: () => set({
        filters: {
          searchTerm: '',
          filterType: FILTER_OPTIONS.TYPE.ALL,
          sortBy: FILTER_OPTIONS.SORT_BY.DATE,
          sortOrder: FILTER_OPTIONS.SORT_ORDER.DESC
        }
      }),

      // Computed Values
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filteredTransactions = transactions;

        // Apply search filter
        if (filters.searchTerm) {
          filteredTransactions = filteredTransactions.filter(transaction =>
            transaction.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            transaction.amount.toString().includes(filters.searchTerm)
          );
        }

        // Apply type filter
        if (filters.filterType !== FILTER_OPTIONS.TYPE.ALL) {
          filteredTransactions = filteredTransactions.filter(transaction => transaction.type === filters.filterType);
        }

        // Apply sorting
        const sortedTransactions = [...filteredTransactions].sort((transactionA, transactionB) => {
          let valueA = filters.sortBy === FILTER_OPTIONS.SORT_BY.DATE ? new Date(transactionA.date) : transactionA.amount;
          let valueB = filters.sortBy === FILTER_OPTIONS.SORT_BY.DATE ? new Date(transactionB.date) : transactionB.amount;

          if (filters.sortOrder === FILTER_OPTIONS.SORT_ORDER.ASC) {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });

        return sortedTransactions;
      },

      getFinancialSummary: () => {
        const { transactions } = get();
        
        const totalIncome = transactions
          .filter(transaction => transaction.type === 'income')
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalExpenses = transactions
          .filter(transaction => transaction.type === 'expense')
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const netBalance = totalIncome - totalExpenses;
        const savingsRate = totalIncome > 0 ? (netBalance / totalIncome * 100) : 0;

        return {
          totalIncome,
          totalExpenses,
          netBalance,
          savingsRate
        };
      },

      getInsights: () => {
        const { transactions } = get();
        
        // Calculate spending by category
        const spendingByCategory = transactions
          .filter(transaction => transaction.type === 'expense')
          .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
          }, {});

        // Find highest spending category
        const highestSpendingCategory = Object.entries(spendingByCategory)
          .sort(([, amountA], [, amountB]) => amountB - amountA)[0];

        // Calculate monthly expenses
        const monthlyExpenses = transactions
          .filter(transaction => transaction.type === 'expense')
          .reduce((acc, transaction) => {
            const month = new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            acc[month] = (acc[month] || 0) + transaction.amount;
            return acc;
          }, {});

        const months = Object.keys(monthlyExpenses).sort();
        const currentMonth = months[months.length - 1];
        const previousMonth = months[months.length - 2];
        
        const monthlyComparison = currentMonth && previousMonth ? {
          current: monthlyExpenses[currentMonth],
          previous: monthlyExpenses[previousMonth],
          change: ((monthlyExpenses[currentMonth] - monthlyExpenses[previousMonth]) / monthlyExpenses[previousMonth] * 100).toFixed(1)
        } : null;

        // Calculate average transaction amount
        const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
        const averageExpense = expenseTransactions.length > 0 
          ? (expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0) / expenseTransactions.length).toFixed(2)
          : 0;

        const { totalIncome, totalExpenses } = get().getFinancialSummary();
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

        return {
          highestSpendingCategory: {
            category: highestSpendingCategory[0],
            amount: highestSpendingCategory[1],
            percentage: ((highestSpendingCategory[1] / totalExpenses) * 100).toFixed(1)
          },
          monthlyComparison,
          averageExpense: parseFloat(averageExpense),
          savingsRate: parseFloat(savingsRate),
          spendingByCategory
        };
      },

      // Chart Data
      getChartData: () => {
        const { transactions } = get();
        
        // Balance over time data
        const balanceData = transactions
          .reduce((acc, transaction) => {
            const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short' });
            if (!acc[month]) {
              acc[month] = { income: 0, expenses: 0 };
            }
            if (transaction.type === 'income') {
              acc[month].income += transaction.amount;
            } else {
              acc[month].expenses += transaction.amount;
            }
            return acc;
          }, {});

        const balanceChartData = Object.entries(balanceData).map(([month, data]) => ({
          date: month,
          balance: data.income - data.expenses
        }));

        // Spending by category data
        const spendingByCategory = transactions
          .filter(transaction => transaction.type === 'expense')
          .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
          }, {});

        const spendingData = Object.entries(spendingByCategory).map(([categoryName, amount]) => ({
          name: categoryName,
          value: amount,
          color: getCategoryColor(categoryName)
        }));

        return {
          balanceChartData,
          spendingData
        };
      }
    }),
    {
      name: STORAGE_KEYS.FINANCE_DATA,
      partialize: (state) => ({
        transactions: state.transactions,
        currentRole: state.currentRole,
        isDarkMode: state.isDarkMode
      })
    }
  )
);

// Helper function to get category color
const getCategoryColor = (category) => {
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

export default useFinanceStore;
