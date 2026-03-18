import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function DashboardRouter() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Redirect based on user role
  if (user.role === 'super_admin') {
    return <Navigate to="/dashboard/super-admin" replace />;
  }
  
  if (user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // Default to overview for employees and office heads
  return <Navigate to="/dashboard/overview" replace />;
}