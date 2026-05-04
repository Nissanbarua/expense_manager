import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  Edit3, 
  PieChart, 
  Info,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';

const Jars: React.FC = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);

  // const { data: jarData, isLoading } = useQuery({
  //   queryKey: ['jars', currentMonth],
  //   queryFn: async () => {
  //     const { data } = await axiosClient.get(`/salary/current?month=${currentMonth}`);
  //     return data;
  //   }
  // });

  const jars = [
    { key: 'necessities', name: 'Necessities', color: 'text-blue-500', bg: 'bg-blue-500', icon: Wallet, pct: 55 },
    { key: 'education', name: 'Education', color: 'text-purple-500', bg: 'bg-purple-500', icon: Info, pct: 10 },
    { key: 'longTermSaving', name: 'Long-term Saving', color: 'text-green-500', bg: 'bg-green-500', icon: TrendingUp, pct: 10 },
    { key: 'play', name: 'Play', color: 'text-orange-500', bg: 'bg-orange-500', icon: Droplets, pct: 10 },
    { key: 'financialFreedom', name: 'Financial Freedom', color: 'text-yellow-500', bg: 'bg-yellow-500', icon: PieChart, pct: 10 },
    { key: 'give', name: 'Give', color: 'text-red-500', bg: 'bg-red-500', icon: ArrowUpRight, pct: 5 },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900">My 6 Jars</h2>
          <p className="text-slate-500 font-medium">Manage your {currentMonth} allocations and spending limits</p>
        </div>
        <button className="btn btn-primary px-8 shadow-xl shadow-primary/20">
          <Edit3 className="w-5 h-5" />
          Edit Percentages
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jars.map((jar) => (
          <motion.div 
            key={jar.key}
            whileHover={{ scale: 1.01 }}
            className="card p-8 group relative overflow-hidden"
          >
            {/* Background Water Animation Placeholder */}
            <div className={`absolute bottom-0 left-0 w-full bg-slate-50 transition-all duration-1000 ease-in-out z-0`} style={{ height: '30%' }}></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${jar.bg} bg-opacity-10 ${jar.color}`}>
                  <jar.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{jar.name}</h3>
                  <span className="text-sm font-black uppercase tracking-widest text-slate-400">{jar.pct}% Allocation</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                <p className="text-3xl font-mono font-black text-slate-900">৳{(55000 * jar.pct / 100).toLocaleString()}</p>
              </div>
            </div>

            <div className="relative z-10 mt-10 space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase">Spent so far</p>
                  <p className="text-xl font-mono font-bold text-danger">৳{(1200 * jar.pct / 10).toLocaleString()}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase">Usage</p>
                  <p className="text-xl font-bold text-slate-900">24%</p>
                </div>
              </div>

              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '24%' }}
                  className={`h-full rounded-full ${jar.bg}`}
                />
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {i}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  +12
                </div>
              </div>
              <p className="text-sm font-bold text-slate-500">Last expense 2 hours ago</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Jars;
