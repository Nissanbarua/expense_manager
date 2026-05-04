import express from 'express';
import { addSalary, getCurrentSalary } from '../controllers/salary.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, addSalary);
router.get('/current', protect, getCurrentSalary);

export default router;
