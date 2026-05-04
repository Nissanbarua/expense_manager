import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/expense_manager',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@expensemanager.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123456',
};
