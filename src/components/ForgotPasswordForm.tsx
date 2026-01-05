
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminEmail } from "@/hooks/useAdminEmail";
import { validateEmail } from "@/utils/authUtils";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const { toast } = useToast();
  const { fetchAdminEmail } = useAdminEmail();

  // Handles sending reset link, restricted to admin only
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(forgotEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsForgotLoading(true);

    try {
      const adminEmail = await fetchAdminEmail();
      if (!adminEmail) {
        toast({
          title: "No Admin Configured",
          description: "No admin email is configured in the system. Please contact support.",
          variant: "destructive",
        });
        setIsForgotLoading(false);
        return;
      }
      if (forgotEmail.toLowerCase() !== adminEmail.toLowerCase()) {
        toast({
          title: "Unauthorized",
          description: "Password reset is only available for the admin user.",
          variant: "destructive",
        });
        setIsForgotLoading(false);
        return;
      }

      // Initiate Supabase password reset
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Unable to send reset email",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Email Sent",
          description: "Check your email for instructions to reset your password",
        });
        setForgotEmail("");
        onBackToLogin();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to process reset request",
        variant: "destructive",
      });
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Admin Email</Label>
        <Input
          id="forgot-email"
          type="email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="Enter your admin email"
          required
          disabled={isForgotLoading}
          autoComplete="username"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700"
        disabled={isForgotLoading}
      >
        {isForgotLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending reset link...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Reset Link
          </>
        )}
      </Button>
      <Button
        variant="ghost"
        className="w-full text-gray-500"
        type="button"
        onClick={onBackToLogin}
        disabled={isForgotLoading}
      >
        Back to Login
      </Button>
      <p className="text-xs text-gray-400 text-center">
        Only the admin can reset their password. If you no longer have access to your admin email, contact support.
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
