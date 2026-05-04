import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Wallet, label: '6 Jars', path: '/jars' },
    { icon: Receipt, label: 'Expenses', path: '/expenses' },
    { icon: CreditCard, label: 'Loans & EMIs', path: '/loans' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 min-h-screen sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-display font-extrabold text-primary tracking-tight">Expense Manager</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-danger hover:bg-danger/5 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
