import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  category: string;
  jar: string;
  description: string;
  date: Date;
  isRecurring: boolean;
  recurringFrequency: 'daily' | 'weekly' | 'monthly';
  paymentMethod: 'cash' | 'bkash' | 'bank' | 'card' | 'nagad';
  tags: string[];
}

const ExpenseSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        'food', 'transport', 'rent', 'utilities', 'healthcare',
        'education', 'entertainment', 'clothing', 'savings',
        'investment', 'loan_payment', 'gifts', 'other'
      ],
      required: true,
    },
    jar: {
      type: String,
      enum: ['necessities', 'education', 'longTermSaving', 'play', 'financialFreedom', 'give'],
      required: true,
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
    isRecurring: { type: Boolean, default: false },
    recurringFrequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
    paymentMethod: { type: String, enum: ['cash', 'bkash', 'bank', 'card', 'nagad'], default: 'cash' },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
