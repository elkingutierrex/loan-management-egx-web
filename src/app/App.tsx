import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import LoanRequestPage from '../pages/LoanRequestPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: JSX.Element; role?: string }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/request" 
        element={
          <ProtectedRoute role="USER">
            <LoanRequestPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          user 
            ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'} replace />
            : <Navigate to="/login" replace />
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-primary-500/30">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
