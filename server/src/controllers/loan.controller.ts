import { Response } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../middlewares/auth.middleware';
import Loan from '../models/Loan';

export const createLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const loan = await Loan.create({ ...req.body, userId: req.userId });
    res.status(201).json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const getLoans = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const loans = await Loan.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const updateLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid ID' });
      return;
    }
    const loan = await Loan.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!loan) {
      res.status(404).json({ success: false, message: 'Loan not found' });
      return;
    }
    res.json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const deleteLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid ID' });
      return;
    }
    await Loan.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ success: true, message: 'Loan deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const calculateEMI = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { principal, annualRate, tenureMonths } = req.body;
    const monthlyRate = annualRate / 12 / 100;
    const emi = monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;
    res.json({
      success: true,
      data: {
        emi:           Math.round(emi * 100) / 100,
        totalPayment:  Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
