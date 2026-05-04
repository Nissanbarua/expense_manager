import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosClient from '../../api/axiosClient';

const schema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  category: z.string().min(1, 'Please select a category'),
  jar: z.string().min(1, 'Please select a jar'),
  description: z.string().optional(),
  date: z.string(),
  paymentMethod: z.string(),
});

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const ExpenseForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
    }
  });

  const onSubmit = async (values: any) => {
    try {
      await axiosClient.post('/expenses', values);
      toast.success('Expense recorded successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to record expense');
    }
  };

  const categories = [
    { value: 'food', label: 'খাবার (Food)' },
    { value: 'transport', label: 'যাতায়াত (Transport)' },
    { value: 'rent', label: 'বাড়িভাড়া (Rent)' },
    { value: 'utilities', label: 'বিদ্যুৎ/গ্যাস (Utilities)' },
    { value: 'healthcare', label: 'স্বাস্থ্য (Healthcare)' },
    { value: 'education', label: 'শিক্ষা (Education)' },
    { value: 'entertainment', label: 'বিনোদন (Entertainment)' },
    { value: 'clothing', label: 'পোশাক (Clothing)' },
    { value: 'other', label: 'অন্যান্য (Other)' },
  ];

  const jars = [
    { value: 'necessities', label: 'Necessities' },
    { value: 'education', label: 'Education' },
    { value: 'longTermSaving', label: 'Long-term Saving' },
    { value: 'play', label: 'Play' },
    { value: 'financialFreedom', label: 'Financial Freedom' },
    { value: 'give', label: 'Give' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="bg-primary p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Tag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-bold">New Expense</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Amount (৳)</label>
              <input
                type="number"
                {...register('amount', { valueAsNumber: true })}
                className={`input-field text-2xl font-mono font-bold ${errors.amount ? 'border-danger' : ''}`}
                placeholder="0.00"
              />
              {errors.amount && <p className="text-danger text-xs mt-1 font-bold">{errors.amount.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select {...register('category')} className="input-field">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Jar Allocation</label>
              <select {...register('jar')} className="input-field">
                <option value="">Select Jar</option>
                {jars.map(j => <option key={j.value} value={j.value}>{j.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
              <input type="date" {...register('date')} className="input-field" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
              <select {...register('paymentMethod')} className="input-field">
                <option value="cash">Cash (নগদ)</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="bank">Bank Transfer</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description (Optional)</label>
            <textarea
              {...register('description')}
              className="input-field min-h-[100px] resize-none"
              placeholder="What was this for?"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex-1 py-4 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? 'Saving...' : <><Save className="w-5 h-5" /> Save Expense</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
