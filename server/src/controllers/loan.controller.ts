import { Response } from 'express';
import Loan from '../models/Loan';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { 
      lenderName, principalAmount, interestRate, emiAmount, emiDay, startDate, loanType, notes 
    } = req.body;
    const userId = req.user?._id;

    const loan = await Loan.create({
      userId,
      lenderName,
      principalAmount,
      remainingAmount: principalAmount,
      interestRate,
      emiAmount,
      emiDay,
      startDate,
      loanType,
      notes,
    });

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLoans = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const loans = await Loan.find({ userId });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const updates = req.body;

    const loan = await Loan.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const loan = await Loan.findOneAndDelete({ _id: id, userId });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    res.json({ message: 'Loan removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
