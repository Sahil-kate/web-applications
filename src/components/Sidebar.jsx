import React from 'react';

const Sidebar = ({ activePage, onPageChange, isDarkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'insights', label: 'Insights', icon: '💡' }
  ];

  return (
    <div className={`w-64 h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
      <div className="p-4 sm:p-6">
        <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FinanceHub</h1>
      </div>
      
      <nav className="mt-4 sm:mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center px-4 sm:px-6 py-3 text-left transition-all duration-200 group ${
              activePage === item.id
                ? isDarkMode 
                  ? 'bg-blue-900 text-blue-200 border-r-4 border-blue-400' 
                  : 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg sm:text-xl mr-3 transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
            <span className="font-medium text-sm sm:text-base">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
