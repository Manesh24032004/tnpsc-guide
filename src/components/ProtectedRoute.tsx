import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = true }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for admin login status
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (requireAdmin) {
        // For admin routes, check localStorage admin status
        if (!isAdminLoggedIn) {
          navigate('/admin-login');
        }
      } else {
        // For user routes, check regular auth
        if (!user) {
          navigate('/auth');
        }
      }
    }
  }, [user, loading, isAdminLoggedIn, requireAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireAdmin && !isAdminLoggedIn) {
    return null;
  }

  if (!requireAdmin && !user) {
    return null;
  }

  return <>{children}</>;
};
