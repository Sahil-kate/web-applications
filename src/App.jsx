import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/Transactions';
import Insights from './pages/Insights';
import useFinanceStore from './store/financeStore';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { currentRole, setCurrentRole, isDarkMode, toggleDarkMode } = useFinanceStore();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionsPage />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activePage={activePage} 
      onPageChange={setActivePage}
      currentRole={currentRole}
      onRoleChange={setCurrentRole}
      isDarkMode={isDarkMode}
      onToggleDarkMode={toggleDarkMode}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
