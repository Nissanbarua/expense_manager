import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Salary from '../models/Salary';
import JarAllocation from '../models/JarAllocation';
import Loan from '../models/Loan';
import { distributeJars, DEFAULT_JAR_PERCENTAGES } from '../services/jarDistribution.service';

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

export const saveSalary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, source, creditedAt } = req.body;
    const now = creditedAt ? new Date(creditedAt) : new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const salary = await Salary.findOneAndUpdate(
      { userId: req.userId, month },
      { amount, source, creditedAt: now },
      { upsert: true, new: true }
    );

    // Get total active loan EMIs
    const activeLoans = await Loan.find({ userId: req.userId, status: 'active' });
    const totalEMI = activeLoans.reduce((sum: number, loan: { emiAmount: number }) => sum + loan.emiAmount, 0);

    // Distribute into 6 jars
    const days = getDaysInMonth(now.getFullYear(), now.getMonth());
    const distribution = distributeJars(amount, DEFAULT_JAR_PERCENTAGES, totalEMI, days);

    await JarAllocation.findOneAndUpdate(
      { userId: req.userId, month },
      {
        userId: req.userId,
        month,
        jars: {
          necessities:      { percentage: 55, amount: distribution.necessities,      spent: 0 },
          education:        { percentage: 10, amount: distribution.education,        spent: 0 },
          longTermSaving:   { percentage: 10, amount: distribution.longTermSaving,   spent: 0 },
          play:             { percentage: 10, amount: distribution.play,             spent: 0 },
          financialFreedom: { percentage: 10, amount: distribution.financialFreedom, spent: 0 },
          give:             { percentage:  5, amount: distribution.give,             spent: 0 },
        },
        dailyBudget: distribution.dailyBudget,
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: { salary, distribution } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const getCurrentSalary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { month } = req.query;
    const targetMonth = (month as string) ||
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

    const salary = await Salary.findOne({ userId: req.userId, month: targetMonth });
    const jars   = await JarAllocation.findOne({ userId: req.userId, month: targetMonth });

    res.json({ success: true, data: { salary, jars } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
