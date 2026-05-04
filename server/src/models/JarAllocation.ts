import mongoose, { Schema, Document } from 'mongoose';

interface IJarDetail {
  percentage: number;
  amount: number;
  spent: number;
}

export interface IJarAllocation extends Document {
  userId: mongoose.Types.ObjectId;
  month: string; // YYYY-MM
  jars: {
    necessities: IJarDetail;
    education: IJarDetail;
    longTermSaving: IJarDetail;
    play: IJarDetail;
    financialFreedom: IJarDetail;
    give: IJarDetail;
  };
}

const JarDetailSchema = {
  percentage: { type: Number, required: true },
  amount: { type: Number, required: true, default: 0 },
  spent: { type: Number, required: true, default: 0 },
};

const JarAllocationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true },
    jars: {
      necessities: JarDetailSchema,
      education: JarDetailSchema,
      longTermSaving: JarDetailSchema,
      play: JarDetailSchema,
      financialFreedom: JarDetailSchema,
      give: JarDetailSchema,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IJarAllocation>('JarAllocation', JarAllocationSchema);
