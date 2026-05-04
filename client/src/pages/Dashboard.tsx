import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axiosClient from '../api/axiosClient';
import DailyBudgetWidget from '../components/dashboard/DailyBudgetWidget';
import JarSummaryGrid from '../components/dashboard/JarSummaryGrid';
import { Plus, Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  // const currentMonth = new Date().toISOString().slice(0, 7);

  // In a real app, you'd fetch the jar allocation specifically
  // const { data: jarAllocation, isLoading: jarsLoading } = useQuery({
  //   queryKey: ['jars', currentMonth],
  //   queryFn: async () => {
  //     const res = await axiosClient.get(`/salary/current?month=${currentMonth}`);
  //     return res.data;
  //   }
  // });

  // Mock data for initial UI check until backend is fully integrated
  const mockJars = {
    necessities: { amount: 55000, spent: 12000 },
    education: { amount: 10000, spent: 2000 },
    longTermSaving: { amount: 10000, spent: 0 },
    play: { amount: 10000, spent: 4500 },
    financialFreedom: { amount: 10000, spent: 1000 },
    give: { amount: 5000, spent: 500 },
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900">Financial Overview</h2>
          <p className="text-slate-500 font-medium">Tracking your 6-Jar system for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DailyBudgetWidget 
            dailyLimit={1833} 
            spentToday={450} 
            daysLeft={26} 
          />
        </div>
        <div className="lg:col-span-2">
          <div className="card h-full p-8 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Monthly Spending Trend</h3>
              <select className="bg-slate-50 border-none rounded-lg text-sm font-bold p-2 outline-none cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="w-full bg-primary/10 rounded-t-lg relative group"
                >
                  <div className="absolute inset-x-0 bottom-full mb-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    ৳{h * 20}
                  </div>
                  <div className={`absolute inset-x-0 bottom-0 h-1/3 ${h > 80 ? 'bg-danger' : 'bg-primary'} rounded-t-lg opacity-20`}></div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-extrabold text-slate-900">My 6 Jars</h3>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline">
            <Filter className="w-4 h-4" />
            Manage Allocations
          </button>
        </div>
        <JarSummaryGrid jars={mockJars} />
      </section>
    </div>
  );
};

export default Dashboard;
