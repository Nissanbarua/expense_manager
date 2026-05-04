import { DEFAULT_JAR_PERCENTAGES } from '../utils/jarCalculator';
import JarAllocation from '../models/JarAllocation';
import Loan from '../models/Loan';

export const calculateJarDistribution = async (userId: string, salaryAmount: number, month: string) => {
  // Get active loans to deduct EMI from necessities
  const activeLoans = await Loan.find({ userId, status: 'active' });
  const totalLoanEMI = activeLoans.reduce((sum, loan) => sum + loan.emiAmount, 0);

  const percentages = DEFAULT_JAR_PERCENTAGES;

  const distributed = Object.entries(percentages).reduce((acc, [jar, pct]) => {
    // @ts-ignore
    acc[jar] = (salaryAmount * pct) / 100;
    return acc;
  }, {} as Record<string, number>);

  // Deduct EMI from necessities
  distributed.necessities -= totalLoanEMI;

  // Create or update jar allocation for the month
  const jarAllocation = await JarAllocation.findOneAndUpdate(
    { userId, month },
    {
      userId,
      month,
      jars: {
        necessities: { percentage: percentages.necessities, amount: distributed.necessities, spent: 0 },
        education: { percentage: percentages.education, amount: distributed.education, spent: 0 },
        longTermSaving: { percentage: percentages.longTermSaving, amount: distributed.longTermSaving, spent: 0 },
        play: { percentage: percentages.play, amount: distributed.play, spent: 0 },
        financialFreedom: { percentage: percentages.financialFreedom, amount: distributed.financialFreedom, spent: 0 },
        give: { percentage: percentages.give, amount: distributed.give, spent: 0 },
      },
    },
    { upsert: true, new: true }
  );

  return jarAllocation;
};
