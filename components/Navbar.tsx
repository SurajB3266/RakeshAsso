import React, { useState } from 'react';
import { Page } from '../types';
import { COMPANY_DETAILS } from '../constants';
import { LayoutDashboard, User, LifeBuoy, LogOut, Menu, X, TrendingUp } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onLogout, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ page, icon: Icon, label }: { page: Page; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 w-full md:w-auto
        ${currentPage === page 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100'
        }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Page.DASHBOARD)}>
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <TrendingUp className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-none">{COMPANY_DETAILS.name}</h1>
              <p className="text-xs text-slate-500 mt-1">{COMPANY_DETAILS.tagline}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem page={Page.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem page={Page.PROFILE} icon={User} label="Profile" />
            <NavItem page={Page.SUPPORT} icon={LifeBuoy} label="Help & Support" />
            
            <div className="h-6 w-px bg-slate-200 mx-4"></div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-700">{userName}</span>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <NavItem page={Page.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
          <NavItem page={Page.PROFILE} icon={User} label="Profile" />
          <NavItem page={Page.SUPPORT} icon={LifeBuoy} label="Support" />
          <div className="border-t border-slate-100 my-2 pt-2">
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;