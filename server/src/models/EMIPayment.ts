import mongoose, { Schema, Document } from 'mongoose';

export interface IEMIPayment extends Document {
  userId: mongoose.Types.ObjectId;
  loanId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  status: 'paid' | 'pending' | 'overdue';
}

const EMIPaymentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loanId: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['paid', 'pending', 'overdue'],
      default: 'paid',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEMIPayment>('EMIPayment', EMIPaymentSchema);
