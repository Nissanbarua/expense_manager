import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT:        process.env.PORT        || '5000',
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET:  process.env.JWT_SECRET  || 'fallback_secret_change_in_prod',
  JWT_EXPIRE:  process.env.JWT_EXPIRE  || '7d',
  REDIS_URL:   process.env.REDIS_URL   || 'redis://localhost:6379',
  NODE_ENV:    process.env.NODE_ENV    || 'development',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@expensemanager.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123456',
};
