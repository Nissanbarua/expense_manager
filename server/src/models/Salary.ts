import mongoose, { Schema, Document } from 'mongoose';

export interface ISalary extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  month: string; // YYYY-MM
  source: string;
  creditedAt: Date;
}

const SalarySchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    source: { type: String, default: 'Job' },
    creditedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ISalary>('Salary', SalarySchema);
