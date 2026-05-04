import express from 'express';
import { saveSalary, getCurrentSalary } from '../controllers/salary.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, saveSalary);
router.get('/current', protect, getCurrentSalary);

export default router;
