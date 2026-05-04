import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== '/register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const { data } = await axiosClient.post(endpoint, payload);
      setAuth(data);
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h2 className="text-3xl font-display font-extrabold text-center text-primary mb-2">
          {isLogin ? 'Welcome Back' : 'Join Expense Manager'}
        </h2>
        <p className="text-slate-500 text-center mb-8">
          {isLogin ? 'Manage your expenses with the 6 Jar system' : 'Start your journey to financial freedom'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-4 mt-4 shadow-lg shadow-primary/20"
          >
            {loading ? 'Processing...' : (isLogin ? <><LogIn className="w-5 h-5" /> Sign In</> : <><UserPlus className="w-5 h-5" /> Create Account</>)}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-semibold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
