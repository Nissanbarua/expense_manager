import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient();
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jars from './pages/Jars';
import Expenses from './pages/Expenses';
import Loans from './pages/Loans';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" />
        <div className="flex min-h-screen bg-slate-50">
          {isAuthenticated && <Sidebar />}
          <div className="flex-1 flex flex-col min-w-0">
            {isAuthenticated && <Topbar />}
            <main className={isAuthenticated ? "p-4 md:p-8 flex-1" : "flex-1"}>
              <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/jars" element={isAuthenticated ? <Jars /> : <Navigate to="/login" />} />
                <Route path="/expenses" element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />} />
                <Route path="/loans" element={isAuthenticated ? <Loans /> : <Navigate to="/login" />} />
                <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
                <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
