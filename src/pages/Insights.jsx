import React, { useMemo } from 'react';
import useFinanceStore from '../store/financeStore';

const Insights = () => {
  const { getInsights, getFinancialSummary } = useFinanceStore();
  const insights = getInsights();
  const { totalIncome, totalExpenses } = getFinancialSummary();

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestSpendingCategory.category,
      description: `$${insights.highestSpendingCategory.amount.toFixed(2)} (${insights.highestSpendingCategory.percentage}% of total expenses)`,
      type: 'warning',
      icon: '📊'
    },
    {
      title: 'Monthly Expense Trend',
      value: insights.monthlyComparison ? 
        (insights.monthlyComparison.change > 0 ? '↑' : '↓') + ' ' + Math.abs(insights.monthlyComparison.change) + '%' : 'No data',
      description: insights.monthlyComparison ? 
        `Compared to previous month (${insights.monthlyComparison.previous > insights.monthlyComparison.current ? 'decrease' : 'increase'})` : 
        'Need more data for comparison',
      type: insights.monthlyComparison && insights.monthlyComparison.change > 0 ? 'warning' : 'positive',
      icon: insights.monthlyComparison && insights.monthlyComparison.change > 0 ? '📈' : '📉'
    },
    {
      title: 'Average Expense',
      value: `$${insights.averageExpense.toFixed(2)}`,
      description: 'Per transaction average',
      type: 'neutral',
      icon: '💳'
    },
    {
      title: 'Savings Rate',
      value: insights.savingsRate + '%',
      description: `${insights.savingsRate > 20 ? 'Excellent' : insights.savingsRate > 10 ? 'Good' : 'Needs improvement'} savings habit`,
      type: insights.savingsRate > 20 ? 'positive' : insights.savingsRate > 10 ? 'neutral' : 'warning',
      icon: insights.savingsRate > 20 ? '🎯' : '💡'
    }
  ];

  const categories = Object.entries(insights.spendingByCategory).map(([name, amount]) => ({
    name,
    amount,
    percentage: ((amount / totalExpenses) * 100).toFixed(1),
    color: 
      name === 'Food' ? 'bg-blue-500' :
      name === 'Transport' ? 'bg-green-500' :
      name === 'Shopping' ? 'bg-yellow-500' :
      name === 'Utilities' ? 'bg-red-500' :
      name === 'Health' ? 'bg-purple-500' : 'bg-gray-500'
  }));

  return (
    <div className="space-y-8">
      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <span className="text-2xl">{insight.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{insight.title}</h3>
                <p className="text-lg font-bold text-gray-900 mb-1">{insight.value}</p>
                <p className="text-xs text-gray-600">{insight.description}</p>
                <div className={`mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  insight.type === 'positive' ? 'bg-green-100 text-green-800' : 
                  insight.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {insight.type === 'positive' ? 'Good' : insight.type === 'warning' ? 'Attention' : 'Neutral'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spending by Category */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-600">${category.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Income</span>
              <span className="font-semibold text-green-600">+${totalIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Expenses</span>
              <span className="font-semibold text-red-600">-${totalExpenses.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-900">Net Balance</span>
              <span className={`font-bold text-lg ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(totalIncome - totalExpenses).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Comparison</h3>
          <div className="space-y-4">
            {insights.monthlyComparison ? (
              <>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Current Month</span>
                  <span className="font-semibold text-gray-900">${insights.monthlyComparison.current.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Previous Month</span>
                  <span className="font-semibold text-gray-900">${insights.monthlyComparison.previous.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-900">Change</span>
                  <span className={`font-bold text-lg ${insights.monthlyComparison.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {insights.monthlyComparison.change > 0 ? '+' : ''}{insights.monthlyComparison.change}%
                  </span>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">Need more months of data for comparison</p>
            )}
          </div>
        </div>
      </div>

      {/* Financial Tips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            insights.highestSpendingCategory.percentage > 40 ? 
              `Consider reducing ${insights.highestSpendingCategory.category} expenses (${insights.highestSpendingCategory.percentage}% of spending)` :
              'Your spending is well-distributed across categories',
            insights.savingsRate < 10 ? 
              'Try to save at least 10% of your income for better financial health' :
              insights.savingsRate > 20 ? 
              'Excellent savings rate! Consider investing your surplus' :
              'Good savings habit. Consider increasing it gradually',
            insights.monthlyComparison && insights.monthlyComparison.change > 15 ? 
              'Your expenses increased significantly this month. Review your spending.' :
              'Your monthly expenses are relatively stable',
            `Your average expense is $${insights.averageExpense.toFixed(2)}. Track larger purchases carefully.`
          ].map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">💡</span>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
