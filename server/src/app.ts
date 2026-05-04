import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import connectDB from './config/db';
import { env } from './config/env';
import { seedSuperAdmin } from './utils/seedAdmin';

// Route imports
import authRoutes from './routes/auth.routes';
import salaryRoutes from './routes/salary.routes';
import expenseRoutes from './routes/expense.routes';
import loanRoutes from './routes/loan.routes';

const app = express();

// Connect to Database
connectDB().then(() => {
  seedSuperAdmin();
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/loans', loanRoutes);

// Serve static assets in production
if (env.NODE_ENV === 'production') {
  // Check common locations for client/dist
  const clientPath = path.resolve(process.cwd(), 'client/dist');
  app.use(express.static(clientPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientPath, 'index.html'));
    }
  });
}
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

export default app;
