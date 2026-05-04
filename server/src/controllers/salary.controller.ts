import { Response } from 'express';
import Salary from '../models/Salary';
import { AuthRequest } from '../middlewares/auth.middleware';
import { calculateJarDistribution } from '../services/jarDistribution.service';

export const addSalary = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, month, source } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ message: 'User not found' });

    const salary = await Salary.create({
      userId,
      amount,
      month,
      source,
    });

    // Trigger jar distribution
    const jarAllocation = await calculateJarDistribution(userId as string, amount, month);

    res.status(201).json({ salary, jarAllocation });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCurrentSalary = async (req: AuthRequest, res: Response) => {
  try {
    const { month } = req.query;
    const userId = req.user?._id;

    const salary = await Salary.findOne({ userId, month });
    res.json(salary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
