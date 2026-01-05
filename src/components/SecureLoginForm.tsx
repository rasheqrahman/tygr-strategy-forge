
// Split imports for improved clarity after refactor.
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAdminEmail } from "@/hooks/useAdminEmail";
import { validateEmail, validatePassword } from "@/utils/authUtils";
import ForgotPasswordForm from "./ForgotPasswordForm";

const SecureLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { fetchAdminEmail } = useAdminEmail();

  // Sign in (password only - no magic link)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 8 characters long',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const adminEmail = await fetchAdminEmail();
      if (!adminEmail) {
        toast({
          title: 'No Admin Configured',
          description: 'No admin email is configured in the system. Please contact support.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      if (email.toLowerCase() !== adminEmail.toLowerCase()) {
        toast({
          title: 'Access Denied',
          description: 'Only the admin user can sign in.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: 'Sign In Failed',
          description: error.message || 'Invalid credentials',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Signed in successfully',
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {!isForgotPasswordMode ? (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your admin email"
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <Input
              id="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              minLength={8}
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          <div className="w-full flex justify-end">
            <button
              className="text-xs text-gray-500 hover:underline"
              type="button"
              onClick={() => setIsForgotPasswordMode(true)}
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>
        </form>
      ) : (
        <ForgotPasswordForm onBackToLogin={() => setIsForgotPasswordMode(false)} />
      )}
    </div>
  );
};

export default SecureLoginForm;
