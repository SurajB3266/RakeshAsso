import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Login from './pages/Login';
import { Page } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.LOGIN);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.PROFILE:
        return <Profile />;
      case Page.SUPPORT:
        return <Support />;
      default:
        return <Dashboard />; // Default fallback
    }
  };

  if (!isAuthenticated || currentPage === Page.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout} 
        userName={MOCK_USER.name}
      />
      <main className="transition-all duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;