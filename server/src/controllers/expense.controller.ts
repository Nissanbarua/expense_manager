import { Response } from 'express';
import Expense from '../models/Expense';
import JarAllocation from '../models/JarAllocation';
import { AuthRequest } from '../middlewares/auth.middleware';
import mongoose from 'mongoose';

export const createExpense = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, category, jar, description, date, paymentMethod, tags } = req.body;
    const userId = req.user?._id;
    const month = new Date(date || Date.now()).toISOString().slice(0, 7);

    const expense = await Expense.create([{
      userId,
      amount,
      category,
      jar,
      description,
      date,
      paymentMethod,
      tags,
    }], { session });

    // Update jar spent amount
    const jarAlloc = await JarAllocation.findOne({ userId, month }).session(session);
    if (jarAlloc) {
      // @ts-ignore
      jarAlloc.jars[jar].spent += amount;
      await jarAlloc.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(expense[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, jar, category } = req.query;
    const userId = req.user?._id;

    let query: any = { userId };

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
    }
    if (jar) query.jar = jar;
    if (category) query.category = category;

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const expense = await Expense.findOne({ _id: id, userId }).session(session);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    const month = new Date(expense.date).toISOString().slice(0, 7);
    const jarAlloc = await JarAllocation.findOne({ userId, month }).session(session);
    
    if (jarAlloc) {
      // @ts-ignore
      jarAlloc.jars[expense.jar].spent -= expense.amount;
      await jarAlloc.save({ session });
    }

    await Expense.deleteOne({ _id: id }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Expense removed' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Server error' });
  }
};
