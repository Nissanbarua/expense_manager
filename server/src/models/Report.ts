import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpense: number;
  jarBreakdown: Map<string, { allocated: number; spent: number }>;
  categoryBreakdown: Map<string, number>;
  pdfUrl?: string;
}

const ReportSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['weekly', 'monthly'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalIncome: { type: Number, default: 0 },
    totalExpense: { type: Number, default: 0 },
    jarBreakdown: {
      type: Map,
      of: {
        allocated: Number,
        spent: Number,
      },
    },
    categoryBreakdown: {
      type: Map,
      of: Number,
    },
    pdfUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IReport>('Report', ReportSchema);
