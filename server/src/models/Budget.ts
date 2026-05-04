import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  userId: mongoose.Types.ObjectId;
  month: string; // YYYY-MM
  dailyLimit: number;
  weeklyLimit: number;
  categoryLimits: Map<string, number>;
  alertThresholds: {
    warning: number;
    critical: number;
  };
}

const BudgetSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true },
    dailyLimit: { type: Number, default: 0 },
    weeklyLimit: { type: Number, default: 0 },
    categoryLimits: {
      type: Map,
      of: Number,
      default: {},
    },
    alertThresholds: {
      warning: { type: Number, default: 80 },
      critical: { type: Number, default: 95 },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>('Budget', BudgetSchema);
