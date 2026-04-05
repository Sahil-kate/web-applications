import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFinanceStore from '../store/financeStore';

const Dashboard = () => {
  const { getFinancialSummary, getChartData, isDarkMode } = useFinanceStore();
  const { totalIncome, totalExpenses, netBalance } = getFinancialSummary();
  const { balanceChartData, spendingData } = getChartData();

  const summaryCards = [
    {
      title: 'Total Balance',
      value: `$${netBalance.toFixed(2)}`,
      change: netBalance >= 0 ? '+2.5%' : '-1.2%',
      changeType: netBalance >= 0 ? 'positive' : 'negative',
      icon: '💰'
    },
    {
      title: 'Income',
      value: `$${totalIncome.toFixed(2)}`,
      change: '+12.3%',
      changeType: 'positive',
      icon: '📈'
    },
    {
      title: 'Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      change: '-5.2%',
      changeType: 'negative',
      icon: '📉'
    }
  ];

  const chartColors = {
    grid: isDarkMode ? '#374151' : '#f0f0f0',
    text: isDarkMode ? '#9ca3af' : '#6b7280',
    tooltip: {
      background: isDarkMode ? '#1f2937' : '#fff',
      border: isDarkMode ? '#374151' : '#e5e7eb',
      text: isDarkMode ? '#f3f4f6' : '#111827'
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {summaryCards.map((card, index) => (
          <div 
            key={index} 
            className={`p-4 sm:p-6 rounded-xl border transition-all duration-200 card-hover ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl sm:text-2xl animate-slideIn">{card.icon}</span>
              <span className={`text-sm font-medium transition-colors duration-200 ${
                card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {card.change}
              </span>
            </div>
            <h3 className={`text-sm font-medium mb-1 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {card.title}
            </h3>
            <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className={`p-4 sm:p-6 rounded-xl border transition-all duration-200 card-hover ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-base sm:text-lg font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Balance Over Time
          </h3>
          {balanceChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={balanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke={chartColors.text}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke={chartColors.text}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                  contentStyle={{ 
                    backgroundColor: chartColors.tooltip.background,
                    border: `1px solid ${chartColors.tooltip.border}`,
                    borderRadius: '8px',
                    color: chartColors.tooltip.text
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
        
        <div className={`p-4 sm:p-6 rounded-xl border transition-all duration-200 card-hover ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-base sm:text-lg font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Spending by Category
          </h3>
          {spendingData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: chartColors.tooltip.background,
                    border: `1px solid ${chartColors.tooltip.border}`,
                    borderRadius: '8px',
                    color: chartColors.tooltip.text
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <p className="text-sm">No spending data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`p-4 sm:p-6 rounded-xl border transition-all duration-200 card-hover ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-base sm:text-lg font-semibold mb-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="flex items-center justify-between py-3 border-b transition-colors duration-200 table-row-hover last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-xs sm:text-sm">📊</span>
                </div>
                <div>
                  <p className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Transaction {item}
                  </p>
                  <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    2 hours ago
                  </p>
                </div>
              </div>
              <span className={`font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                $250.00
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
