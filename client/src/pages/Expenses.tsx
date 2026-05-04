import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { motion, AnimatePresence } from 'framer-motion';

const Expenses: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/expenses');
      return data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axiosClient.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense deleted');
    }
  });

  const filteredExpenses = expenses?.filter((e: any) => 
    e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getJarColor = (jar: string) => {
    const colors: any = {
      necessities: 'bg-blue-500',
      education: 'bg-purple-500',
      longTermSaving: 'bg-green-500',
      play: 'bg-orange-500',
      financialFreedom: 'bg-yellow-500',
      give: 'bg-red-500'
    };
    return colors[jar] || 'bg-slate-500';
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900">Expenses History</h2>
          <p className="text-slate-500 font-medium">Manage and track all your transactions</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary px-8 shadow-xl shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add New Expense
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by description or category..." 
            className="input-field pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary px-6">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Jar</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                      Loading expenses...
                    </td>
                  </tr>
                ) : filteredExpenses?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  filteredExpenses?.map((expense: any) => (
                    <motion.tr 
                      key={expense._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{format(new Date(expense.date), 'dd MMM')}</span>
                          <span className="text-xs text-slate-400 font-semibold uppercase">{format(new Date(expense.date), 'yyyy')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{expense.description || 'No description'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-wider">
                            {expense.paymentMethod}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                          <span className="text-sm font-bold text-slate-600 capitalize">{expense.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-full text-white uppercase tracking-tighter ${getJarColor(expense.jar)}`}>
                          {expense.jar}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-mono font-bold text-slate-900">৳{expense.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => deleteMutation.mutate(expense._id)}
                            className="p-2 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ExpenseForm 
          onClose={() => setShowForm(false)} 
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['expenses'] })}
        />
      )}
    </div>
  );
};

export default Expenses;
