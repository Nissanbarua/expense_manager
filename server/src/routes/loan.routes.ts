import express from 'express';
import { createLoan, getLoans, updateLoan, deleteLoan } from '../controllers/loan.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, createLoan);
router.get('/', protect, getLoans);
router.put('/:id', protect, updateLoan);
router.delete('/:id', protect, deleteLoan);

export default router;
