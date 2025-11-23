import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['app_role'];

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isStudent: boolean;
  isRecruiter: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });

          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (roleData) {
            setRole(roleData.role);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });

          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (roleData) {
            setRole(roleData.role);
          }
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        if (userData.role === 'student') {
          await supabase.from('students').insert({
            student_id: data.user.id,
            user_id: data.user.id,
            first_name: userData.fullName?.split(' ')[0] || '',
            last_name: userData.fullName?.split(' ')[1] || '',
            email: data.user.email,
            phone_number: userData.phone,
            major: userData.program,
            graduation_year: parseInt(userData.year) || new Date().getFullYear(),
          });
        }

        await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: userData.role || 'student',
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signUp,
        signIn,
        signOut,
        isStudent: role === 'student',
        isRecruiter: role === 'recruiter',
        isAdmin: role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
