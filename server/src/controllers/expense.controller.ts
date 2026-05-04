import { Response } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../middlewares/auth.middleware';
import Expense from '../models/Expense';

export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, category, jar, description, date, paymentMethod, tags } = req.body;
    const expense = await Expense.create({
      userId: req.userId,
      amount, category, jar, description,
      date: date || new Date(),
      paymentMethod, tags,
    });
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { jar, category, startDate, endDate } = req.query;
    const filter: Record<string, unknown> = { userId: req.userId };
    if (jar)      filter.jar = jar;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {
        ...(startDate && { $gte: new Date(startDate as string) }),
        ...(endDate   && { $lte: new Date(endDate as string) }),
      };
    }
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid ID' });
      return;
    }
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) {
      res.status(404).json({ success: false, message: 'Expense not found' });
      return;
    }
    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid ID' });
      return;
    }
    await Expense.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const getTodayExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end   = new Date(); end.setHours(23, 59, 59, 999);
    const expenses = await Expense.find({
      userId: req.userId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    res.json({ success: true, data: expenses, totalSpent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
