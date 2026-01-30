/**
 * Authentication Service
 * 
 * Handles all authentication operations.
 * Currently uses Supabase, can be swapped to MongoDB backend.
 */

import { supabase } from '@/integrations/supabase/client';
import { USE_MONGODB_BACKEND, MONGODB_API_URL, API_ENDPOINTS } from './config';
import type { AuthResponse, LoginRequest, RegisterRequest, User, ApiResponse } from './types';

class AuthService {
  private token: string | null = null;

  // Get stored token
  getToken(): string | null {
    if (USE_MONGODB_BACKEND) {
      return localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Set token
  setToken(token: string | null): void {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  // Login
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.LOGIN}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        
        if (data.success && data.data?.token) {
          this.setToken(data.data.token);
        }
        return data;
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        user: {
          _id: data.user?.id || '',
          email: data.user?.email || '',
          name: data.user?.user_metadata?.name || '',
          createdAt: data.user?.created_at || '',
          updatedAt: data.user?.updated_at || '',
        },
        token: data.session?.access_token || '',
      },
    };
  }

  // Register
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.REGISTER}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        
        if (data.success && data.data?.token) {
          this.setToken(data.data.token);
        }
        return data;
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: { name: userData.name },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        user: {
          _id: data.user?.id || '',
          email: data.user?.email || '',
          name: userData.name,
          createdAt: data.user?.created_at || '',
          updatedAt: data.user?.updated_at || '',
        },
        token: data.session?.access_token || '',
      },
    };
  }

  // Logout
  async logout(): Promise<ApiResponse<null>> {
    if (USE_MONGODB_BACKEND) {
      this.setToken(null);
      return { success: true };
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    if (USE_MONGODB_BACKEND) {
      const token = this.getToken();
      if (!token) {
        return { success: false, error: 'Not authenticated' };
      }

      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.ME}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return { success: false, error: error?.message || 'Not authenticated' };
    }

    return {
      success: true,
      data: {
        _id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || '',
        createdAt: user.created_at,
        updatedAt: user.updated_at || user.created_at,
      },
    };
  }

  // Check if user is admin
  async isAdmin(userId: string): Promise<boolean> {
    if (USE_MONGODB_BACKEND) {
      const token = this.getToken();
      if (!token) return false;

      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.USER_ROLES}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        return data.success && data.data?.role === 'admin';
      } catch {
        return false;
      }
    }

    // Supabase implementation
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    return !error && !!data;
  }
}

export const authService = new AuthService();
