
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkAdminStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    if (!user?.email) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', user.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Always update state first
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Handle admin status check after state update
        if (session?.user) {
          // Use setTimeout to avoid blocking the auth state change callback
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('admin_users')
                .select('id')
                .eq('email', session.user.email)
                .single();

              if (error && error.code !== 'PGRST116') {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
                return;
              }

              setIsAdmin(!!data);
            } catch (error) {
              console.error('Error checking admin status:', error);
              setIsAdmin(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signOut = async () => {
    try {
      // Clear local state first
      setIsAdmin(false);
      setUser(null);
      setSession(null);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    isAdmin,
    signIn,
    signUp,
    signOut,
    checkAdminStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
