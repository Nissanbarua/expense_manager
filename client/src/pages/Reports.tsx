import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

const Reports: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900">Financial Reports</h2>
          <p className="text-slate-500 font-medium">Deep dive into your spending habits and savings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="btn btn-primary">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="card p-8">
            <h3 className="text-xl font-bold mb-8">Income vs Expenses</h3>
            <div className="h-64 flex items-end justify-between gap-4">
              {[60, 40, 70, 30, 80, 50, 90, 45, 65, 35, 75, 55].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                  <div className="w-full bg-slate-100 rounded-t-lg h-full relative group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className={`absolute bottom-0 w-full rounded-t-lg ${i % 2 === 0 ? 'bg-primary' : 'bg-slate-300'}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">M{i+1}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-success/10 rounded-lg text-success">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold">Top Saving Jar</h4>
              </div>
              <p className="text-2xl font-display font-black">Long-term Savings</p>
              <p className="text-sm text-slate-500 mt-1">৳25,000 saved this month</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-danger/10 rounded-lg text-danger">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h4 className="font-bold">Highest Spending</h4>
              </div>
              <p className="text-2xl font-display font-black">Necessities</p>
              <p className="text-sm text-slate-500 mt-1">85% of allocation used</p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="card p-8">
            <h3 className="text-lg font-bold mb-6">Recent Reports</h3>
            <div className="space-y-4">
              {[
                { name: 'Monthly Report - April 2026', date: 'April 30, 2026' },
                { name: 'Weekly Summary - Week 17', date: 'April 26, 2026' },
                { name: 'Weekly Summary - Week 16', date: 'April 19, 2026' },
                { name: 'Monthly Report - March 2026', date: 'March 31, 2026' },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{report.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{report.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:underline">
              View All History
            </button>
          </section>

          <section className="card p-8 bg-slate-900 text-white border-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold">Spending Efficiency</h4>
            </div>
            <div className="text-4xl font-display font-black mb-2">92%</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              You are spending within your daily limits for 26 out of 30 days. Great job!
            </p>
            <div className="mt-6 h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-success w-[92%]"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Reports;
