import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, Clock } from 'lucide-react';

interface Props {
  dailyLimit: number;
  spentToday: number;
  daysLeft: number;
}

const DailyBudgetWidget: React.FC<Props> = ({ dailyLimit, spentToday, daysLeft }) => {
  const remaining = dailyLimit - spentToday;
  const percentage = Math.min((spentToday / dailyLimit) * 100, 100) || 0;
  
  const getStatusColor = () => {
    if (percentage > 90) return 'text-danger bg-danger/10 border-danger/20';
    if (percentage > 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-success bg-success/10 border-success/20';
  };

  return (
    <div className="card p-8 bg-gradient-to-br from-primary to-primary-dark text-white border-none shadow-2xl shadow-primary/30">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-primary-100 font-semibold mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Daily Spending Limit
          </h3>
          <p className="text-4xl font-display font-black">৳{dailyLimit.toLocaleString()}</p>
        </div>
        <div className={`px-4 py-2 rounded-full border text-sm font-bold backdrop-blur-md ${getStatusColor()}`}>
          {Math.round(100 - percentage)}% Safe
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="space-y-1">
          <p className="text-primary-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <TrendingDown className="w-3 h-3" />
            Spent Today
          </p>
          <p className="text-2xl font-mono font-bold">৳{spentToday.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-primary-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Remaining
          </p>
          <p className="text-2xl font-mono font-bold">৳{remaining.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`h-full rounded-full ${percentage > 90 ? 'bg-danger' : percentage > 70 ? 'bg-warning' : 'bg-success'}`}
          />
        </div>
        <div className="flex justify-between text-xs font-bold text-primary-200">
          <span>0%</span>
          <span>{daysLeft} days left this month</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default DailyBudgetWidget;
