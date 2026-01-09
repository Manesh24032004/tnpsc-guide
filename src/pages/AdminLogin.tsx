import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';

// Hardcoded admin credentials (frontend only - no database)
const ADMIN_ID = 'admin';
const ADMIN_PASSWORD = 'admin123';

const AdminLogin = () => {
  const navigate = useNavigate();
  
  // Form state for admin ID and password
  const [form, setForm] = useState({ adminId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate credentials against hardcoded values
    if (form.adminId === ADMIN_ID && form.password === ADMIN_PASSWORD) {
      // Success: Store admin session in localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      toast({
        title: "Login Successful!",
        description: "Welcome, Admin! Redirecting to dashboard...",
      });

      // Redirect to admin dashboard after short delay
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin');
      }, 1000);
    } else {
      // Error: Invalid credentials
      setIsSubmitting(false);
      setError('Invalid Admin ID or Password. Please try again.');
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
  };

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
          {/* Admin ID Input */}
          <div className="space-y-2">
            <Label htmlFor="admin-id" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Admin ID
            </Label>
            <Input
              id="admin-id"
              type="text"
              value={form.adminId}
              onChange={(e) => setForm({ ...form, adminId: e.target.value })}
              placeholder="Enter admin ID"
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
                placeholder="Enter password"
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
          <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
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

        {/* Demo Credentials Hint */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo:</strong> Admin ID: <code className="bg-muted px-1 rounded">admin</code> | 
            Password: <code className="bg-muted px-1 rounded">admin123</code>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;