/**
 * Protected Route Component
 * 
 * Supports both demo mode and Supabase authentication.
 * Admin status is verified through the user_roles table or demo session.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin, isDemoMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Allow demo mode for admin routes
      if (requireAdmin && isDemoMode) {
        return; // Allow access
      }

      // Check if user is authenticated
      if (!user && !isDemoMode) {
        if (requireAdmin) {
          navigate('/admin-login');
        } else {
          navigate('/auth');
        }
        return;
      }

      // For admin routes, verify admin role from database
      if (requireAdmin && !isAdmin && !isDemoMode) {
        navigate('/admin-login');
      }
    }
  }, [user, loading, isAdmin, isDemoMode, requireAdmin, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow demo mode for admin routes
  if (requireAdmin && isDemoMode) {
    return <>{children}</>;
  }

  // Not authenticated
  if (!user && !isDemoMode) {
    return null;
  }

  // For admin routes, user must have admin role
  if (requireAdmin && !isAdmin && !isDemoMode) {
    return null;
  }

  return <>{children}</>;
};
