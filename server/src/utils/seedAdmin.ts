import User from '../models/User';
import { config } from '../config/env';

export const seedSuperAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: config.ADMIN_EMAIL });

    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
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
