import User from '../models/User';
import { env } from '../config/env';

export const seedSuperAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: env.ADMIN_EMAIL });

    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
        currency: 'BDT',
        monthlyIncomeDay: 1,
      });
      console.log('✅ Super Admin created successfully');
    } else {
      console.log('ℹ️ Super Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding Super Admin:', error);
  }
};
