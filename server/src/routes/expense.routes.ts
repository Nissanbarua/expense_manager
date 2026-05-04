import express from 'express';
import { createExpense, getExpenses, deleteExpense } from '../controllers/expense.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.delete('/:id', protect, deleteExpense);

export default router;
