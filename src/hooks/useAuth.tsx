import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Demo credentials for testing purposes
const DEMO_ADMIN = {
  id: 'demo-admin',
  email: 'admin@demo.com',
  password: 'admin123'
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isDemoMode: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      return !!data;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  // Check for demo mode on mount
  useEffect(() => {
    const demoSession = sessionStorage.getItem('demo_admin_session');
    if (demoSession === 'true') {
      setIsDemoMode(true);
      setIsAdmin(true);
      setUser({ id: DEMO_ADMIN.id, email: DEMO_ADMIN.email } as User);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Skip supabase auth if in demo mode
    if (isDemoMode) return;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer admin check with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id).then(setIsAdmin);
          }, 0);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id).then(setIsAdmin);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isDemoMode]);

  const signUp = async (email: string, password: string, name: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    if (isDemoMode) {
      sessionStorage.removeItem('demo_admin_session');
      setIsDemoMode(false);
      setIsAdmin(false);
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  // Demo login function for testing
  const demoLogin = () => {
    sessionStorage.setItem('demo_admin_session', 'true');
    setIsDemoMode(true);
    setIsAdmin(true);
    setUser({ id: DEMO_ADMIN.id, email: DEMO_ADMIN.email } as User);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, isDemoMode, signUp, signIn, signOut, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
