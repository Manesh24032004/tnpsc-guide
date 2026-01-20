/**
 * Admin Login Page
 * 
 * Supports both demo mode and secure Supabase authentication.
 * Demo mode: Use admin@demo.com / admin123 for testing
 * Production: Uses Supabase auth with user_roles table
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Shield, Mail, Lock, Eye, EyeOff, PlayCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, isAdmin, loading, demoLogin, isDemoMode } = useAuth();
  
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!loading && (user && isAdmin) || isDemoMode) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, isDemoMode, navigate]);

  // Handle demo login
  const handleDemoLogin = () => {
    demoLogin();
    toast({
      title: "Demo Mode Activated",
      description: "Welcome to the Admin Dashboard demo!",
    });
    navigate('/admin');
  };

  // Handle regular login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Check for demo credentials
    if (form.email === 'admin@demo.com' && form.password === 'admin123') {
      handleDemoLogin();
      return;
    }

    try {
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

      toast({
        title: "Checking admin privileges...",
        description: "Please wait while we verify your access.",
      });

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
    if (user && !loading && !isDemoMode) {
      if (isAdmin) {
        toast({
          title: "Login Successful!",
          description: "Welcome, Admin! Redirecting to dashboard...",
        });
        navigate('/admin');
      } else if (user && !isAdmin && !isSubmitting) {
        setError('You do not have admin privileges. Please contact an administrator.');
        toast({
          title: "Access Denied",
          description: "This account does not have admin privileges.",
          variant: "destructive",
        });
      }
    }
  }, [user, isAdmin, loading, navigate, isSubmitting, isDemoMode]);

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

        {/* Demo Login Button */}
        <div className="mb-6">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5"
            onClick={handleDemoLogin}
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            Try Demo Mode (No Login Required)
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Click to explore the admin dashboard with sample data
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or login with credentials</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="admin@demo.com"
              className="h-11"
              required
            />
          </div>
          
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
                placeholder="admin123"
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

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}
          
          <Button type="submit" className="w-full h-11" disabled={isSubmitting || loading}>
            {isSubmitting ? 'Authenticating...' : 'Login as Admin'}
          </Button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-xs text-center text-muted-foreground">
            <strong>Demo Credentials:</strong><br />
            Email: admin@demo.com | Password: admin123
          </p>
        </div>

        {/* Link to User Login */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Are you a user?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth')}>
              Login here
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
