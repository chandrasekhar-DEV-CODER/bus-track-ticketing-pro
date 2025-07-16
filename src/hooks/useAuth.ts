import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { supabaseApi, Profile } from '@/lib/supabase-api';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile when user signs in
          setTimeout(async () => {
            try {
              const userProfile = await supabaseApi.profiles.getByUserId(session.user.id);
              setProfile(userProfile as Profile);
            } catch (error: any) {
              console.error('Error fetching profile:', error);
              // If profile doesn't exist, create one
              if (error.code === 'PGRST116') {
                try {
                  const newProfile = await supabaseApi.profiles.create({
                    user_id: session.user.id,
                    full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
                    role: 'student',
                    phone: session.user.user_metadata?.phone,
                    student_id: session.user.user_metadata?.student_id,
                    college_id: session.user.user_metadata?.college_id
                  });
                  setProfile(newProfile as Profile);
                } catch (createError) {
                  console.error('Error creating profile:', createError);
                }
              }
            }
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await supabaseApi.auth.signIn(email, password);
      toast.success('Signed in successfully!');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: { 
      full_name: string; 
      phone?: string; 
      student_id?: string; 
      college_id?: string;
    }
  ) => {
    try {
      setLoading(true);
      const result = await supabaseApi.auth.signUp(email, password, userData);
      toast.success('Account created successfully! Please check your email to verify your account.');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabaseApi.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      toast.success('Signed out successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const updatedProfile = await supabaseApi.profiles.update(user.id, updates);
      setProfile(updatedProfile as Profile);
      toast.success('Profile updated successfully!');
      return updatedProfile;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isOrganization: profile?.role === 'organization'
  };
};