import mongoose, { Schema, Document } from 'mongoose';

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  lenderName: string;
  principalAmount: number;
  remainingAmount: number;
  interestRate: number;
  emiAmount: number;
  emiDay: number;
  startDate: Date;
  endDate: Date;
  loanType: 'personal' | 'home' | 'car' | 'education' | 'other';
  status: 'active' | 'completed' | 'defaulted';
  notes: string;
}

const LoanSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lenderName: { type: String, required: true },
    principalAmount: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    emiAmount: { type: Number, required: true },
    emiDay: { type: Number, min: 1, max: 31, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    loanType: {
      type: String,
      enum: ['personal', 'home', 'car', 'education', 'other'],
      default: 'personal',
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'defaulted'],
      default: 'active',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ILoan>('Loan', LoanSchema);
