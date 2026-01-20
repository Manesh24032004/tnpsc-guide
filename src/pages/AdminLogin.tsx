/**
 * Admin Login Page
 * 
 * This admin login uses secure Supabase authentication.
 * Admin privileges are determined by the user_roles table in the database.
 * RLS policies ensure only admins can perform administrative actions.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, isAdmin, loading } = useAuth();
  
  // Form state for email and password
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  // Handle login form submission using Supabase authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Authenticate with Supabase
      const { error: signInError } = await signIn(form.email, form.password);
      
      if (signInError) {
        setIsSubmitting(false);
        setError('Invalid email or password. Please try again.');
        toast({
          title: "Login Failed",
          description: signInError.message || "Invalid credentials",
          variant: "destructive",
        });
        return;
      }

      // Wait a moment for the auth state to update and check admin role
      toast({
        title: "Checking admin privileges...",
        description: "Please wait while we verify your access.",
      });

      // The useAuth hook will automatically check admin status
      // We need to wait for it to update
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);

    } catch (err) {
      setIsSubmitting(false);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Watch for admin status changes after login
  useEffect(() => {
    if (user && !loading) {
      if (isAdmin) {
        toast({
          title: "Login Successful!",
          description: "Welcome, Admin! Redirecting to dashboard...",
        });
        navigate('/admin');
      } else if (user && !isAdmin && !isSubmitting) {
        // User is logged in but not an admin
        setError('You do not have admin privileges. Please contact an administrator.');
        toast({
          title: "Access Denied",
          description: "This account does not have admin privileges.",
          variant: "destructive",
        });
      }
    }
  }, [user, isAdmin, loading, navigate, isSubmitting]);

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-elegant">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-sm text-muted-foreground">TNPSC Wizard Administrator Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="admin-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your admin email"
              className="h-11"
              required
            />
          </div>
          
          {/* Password Input with Toggle */}
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="h-11 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-11 w-11"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}
          
          {/* Submit Button */}
          <Button type="submit" className="w-full h-11" disabled={isSubmitting || loading}>
            {isSubmitting ? 'Authenticating...' : 'Login as Admin'}
          </Button>
        </form>

        {/* Link to User Login */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Are you a user?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth')}>
              Login here
            </Button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Note:</strong> Admin access requires an account with admin privileges in the system.
            Contact the system administrator if you need access.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
