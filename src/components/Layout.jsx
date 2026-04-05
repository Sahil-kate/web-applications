import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, activePage, onPageChange, currentRole, onRoleChange, isDarkMode, onToggleDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar 
          activePage={activePage} 
          onPageChange={(page) => {
            onPageChange(page);
            setIsSidebarOpen(false);
          }} 
          isDarkMode={isDarkMode}
        />
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block">
        <Sidebar activePage={activePage} onPageChange={onPageChange} isDarkMode={isDarkMode} />
      </div>
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-64`}>
        <Header 
          title={activePage.charAt(0).toUpperCase() + activePage.slice(1)} 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton={true}
          currentRole={currentRole}
          onRoleChange={onRoleChange}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
        <main className="p-4 sm:p-6 lg:p-8 animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
