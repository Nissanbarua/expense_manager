import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Palette, 
  Save,
  RefreshCcw,
  Shield
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [percentages, setPercentages] = useState({
    necessities: 55,
    education: 10,
    longTermSaving: 10,
    play: 10,
    financialFreedom: 10,
    give: 5,
  });

  const total = Object.values(percentages).reduce((a, b) => a + b, 0);

  const handleUpdate = () => {
    if (total !== 100) {
      toast.error('Total percentage must equal 100%');
      return;
    }
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h2 className="text-3xl font-display font-black text-slate-900">Preferences</h2>
        <p className="text-slate-500 font-medium">Customize your financial assistant's behavior</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">6-Jar Allocation Split</h3>
            </div>

            <div className="space-y-6">
              {Object.entries(percentages).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <span className="text-sm font-mono font-bold text-primary bg-primary/5 px-2 py-1 rounded">{value}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={value}
                    onChange={(e) => setPercentages({...percentages, [key]: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              ))}

              <div className={`mt-8 p-4 rounded-xl flex items-center justify-between ${total === 100 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                <div className="flex items-center gap-2 font-bold">
                  <Shield className="w-5 h-5" />
                  Total Allocation
                </div>
                <span className="text-xl font-black">{total}%</span>
              </div>
            </div>
          </section>

          <section className="card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary/10 p-2 rounded-lg">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Account Profile</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input type="text" value={user?.name} className="input-field" disabled />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input type="email" value={user?.email} className="input-field" disabled />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Primary Currency</label>
                <select className="input-field">
                  <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="INR">INR (₹) - Indian Rupee</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Salary Credit Day</label>
                <input type="number" min="1" max="31" defaultValue="1" className="input-field" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="card p-8 bg-primary text-white border-none">
            <h4 className="text-xl font-bold mb-4">Quick Actions</h4>
            <div className="space-y-4">
              <button onClick={handleUpdate} className="w-full btn bg-white text-primary hover:bg-slate-100 py-4">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button className="w-full btn bg-primary-dark text-white border border-white/20 hover:bg-slate-900 py-4">
                <RefreshCcw className="w-5 h-5" />
                Reset Defaults
              </button>
            </div>
          </div>

          <div className="card p-8">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-warning" />
              Notifications
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">Daily Budget Reminders</span>
                <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">EMI Alerts (3 days before)</span>
                <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">Weekly Summary Reports</span>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
