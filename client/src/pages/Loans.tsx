import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';
import { 
  Plus, 
  CreditCard, 
  Calendar, 
  TrendingDown, 
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import LoanForm from '../components/loans/LoanForm';

const Loans: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/loans');
      return data;
    }
  });

  const totalDebt = loans?.reduce((sum: number, loan: any) => sum + loan.remainingAmount, 0) || 0;
  const totalMonthlyEMI = loans?.reduce((sum: number, loan: any) => sum + loan.emiAmount, 0) || 0;

  const handleSuccess = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['loans'] });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900">Loan Manager</h2>
          <p className="text-slate-500 font-medium">Keep track of your debts and EMI schedules</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary px-8 shadow-xl shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add New Loan
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-slate-900 text-white border-none">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Outstanding Debt</p>
          <p className="text-3xl font-display font-black">৳{totalDebt.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-danger font-bold">
            <TrendingDown className="w-3 h-3" />
            Active across {loans?.length || 0} loans
          </div>
        </div>
        
        <div className="card p-6 border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Monthly EMI Load</p>
          <p className="text-3xl font-display font-black text-primary">৳{totalMonthlyEMI.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-bold">
            <Calendar className="w-3 h-3" />
            Deducted from Necessities Jar
          </div>
        </div>

        <div className="card p-6 border-slate-100 bg-warning/5 border-warning/20">
          <p className="text-warning-700 text-xs font-bold uppercase tracking-wider mb-1">Next Payment Due</p>
          <p className="text-3xl font-display font-black text-warning">15 May</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-warning-700 font-bold">
            <AlertCircle className="w-3 h-3" />
            ৳12,500 due in 11 days
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-6">Active Loans</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium">Loading loans...</div>
          ) : loans?.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium">No active loans found</div>
          ) : (
            loans?.map((loan: any) => (
              <motion.div 
                key={loan._id}
                whileHover={{ scale: 1.01 }}
                className="card p-6 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{loan.lenderName}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase">{loan.loanType} Loan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-400">Interest Rate</p>
                    <p className="text-lg font-mono font-black text-slate-900">{loan.interestRate}%</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Remaining Balance</p>
                      <p className="text-2xl font-mono font-bold text-slate-900">৳{loan.remainingAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase">Monthly EMI</p>
                      <p className="text-xl font-mono font-bold text-primary">৳{loan.emiAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${((loan.principalAmount - loan.remainingAmount) / loan.principalAmount) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{Math.round(((loan.principalAmount - loan.remainingAmount) / loan.principalAmount) * 100)}% Paid</span>
                    <span>৳{loan.principalAmount.toLocaleString()} Principal</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                    <Info className="w-4 h-4" />
                    Due on day {loan.emiDay} each month
                  </div>
                  <button className="flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {isModalOpen && (
        <LoanForm 
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default Loans;
