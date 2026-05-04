import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosClient from '../../api/axiosClient';

const loanSchema = z.object({
  lenderName: z.string().min(2, 'Lender name is required'),
  principalAmount: z.number().min(1, 'Amount must be positive'),
  interestRate: z.number().min(0, 'Interest rate cannot be negative'),
  emiAmount: z.number().min(1, 'EMI must be positive'),
  emiDay: z.number().min(1).max(31, 'Day must be between 1 and 31'),
  startDate: z.string().min(1, 'Start date is required'),
  loanType: z.enum(['personal', 'home', 'car', 'education', 'other']),
  notes: z.string().optional(),
});

type LoanFormData = z.infer<typeof loanSchema>;

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const LoanForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loanType: 'personal',
      emiDay: 1,
      startDate: new Date().toISOString().split('T')[0],
    }
  });

  const onSubmit = async (data: LoanFormData) => {
    try {
      await axiosClient.post('/loans', data);
      toast.success('Loan added successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to add loan');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Add New Loan</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Lender Name</label>
              <input {...register('lenderName')} className="input-field" placeholder="e.g. City Bank" />
              {errors.lenderName && <p className="text-xs text-danger font-bold mt-1">{errors.lenderName.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Principal Amount</label>
              <input {...register('principalAmount', { valueAsNumber: true })} type="number" className="input-field" placeholder="0.00" />
              {errors.principalAmount && <p className="text-xs text-danger font-bold mt-1">{errors.principalAmount.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Interest Rate (%)</label>
              <input {...register('interestRate', { valueAsNumber: true })} type="number" step="0.1" className="input-field" placeholder="9.5" />
              {errors.interestRate && <p className="text-xs text-danger font-bold mt-1">{errors.interestRate.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly EMI</label>
              <input {...register('emiAmount', { valueAsNumber: true })} type="number" className="input-field" placeholder="0.00" />
              {errors.emiAmount && <p className="text-xs text-danger font-bold mt-1">{errors.emiAmount.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">EMI Day (1-31)</label>
              <input {...register('emiDay', { valueAsNumber: true })} type="number" min="1" max="31" className="input-field" />
              {errors.emiDay && <p className="text-xs text-danger font-bold mt-1">{errors.emiDay.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Start Date</label>
              <input {...register('startDate')} type="date" className="input-field" />
              {errors.startDate && <p className="text-xs text-danger font-bold mt-1">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Loan Type</label>
              <select {...register('loanType')} className="input-field">
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="car">Car</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Notes (Optional)</label>
            <textarea {...register('notes')} className="input-field min-h-[80px]" placeholder="Add any details..."></textarea>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 btn btn-secondary py-4">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn btn-primary py-4">
              <Save className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Loan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
