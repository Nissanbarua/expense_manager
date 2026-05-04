import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  GraduationCap, 
  PiggyBank, 
  Gamepad2, 
  LineChart, 
  Heart 
} from 'lucide-react';

interface JarProps {
  name: string;
  amount: number;
  spent: number;
  color: string;
  icon: any;
}

const JarCard: React.FC<JarProps> = ({ name, amount, spent, color, icon: Icon }) => {
  const percentage = Math.min((spent / amount) * 100, 100) || 0;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${color}20`, color: color }}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{name}</p>
          <p className="text-lg font-mono font-bold text-slate-900">৳{amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm font-semibold">
          <span className="text-slate-500">Spent: ৳{spent.toLocaleString()}</span>
          <span className="text-slate-900">{Math.round(percentage)}%</span>
        </div>
        
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        
        <p className="text-xs text-slate-400 font-medium italic">
          ৳{(amount - spent).toLocaleString()} remaining
        </p>
      </div>
    </motion.div>
  );
};

const JarSummaryGrid: React.FC<{ jars: any }> = ({ jars }) => {
  const jarData = [
    { key: 'necessities', name: 'Necessities', icon: ShoppingBag, color: '#3498DB' },
    { key: 'education', name: 'Education', icon: GraduationCap, color: '#9B59B6' },
    { key: 'longTermSaving', name: 'Long-term Saving', icon: PiggyBank, color: '#27AE60' },
    { key: 'play', name: 'Play', icon: Gamepad2, color: '#E67E22' },
    { key: 'financialFreedom', name: 'Financial Freedom', icon: LineChart, color: '#F1C40F' },
    { key: 'give', name: 'Give', icon: Heart, color: '#E74C3C' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jarData.map((jar) => {
        const data = jars?.[jar.key] || { amount: 0, spent: 0 };
        return (
          <JarCard 
            key={jar.key}
            name={jar.name}
            amount={data.amount}
            spent={data.spent}
            color={jar.color}
            icon={jar.icon}
          />
        );
      })}
    </div>
  );
};

export default JarSummaryGrid;
