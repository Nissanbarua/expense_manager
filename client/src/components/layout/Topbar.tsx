import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Topbar: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wider">Premium Plan</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
