
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Listen for hash in URL, triggers supabase's reset flow
  useEffect(() => {
    const { hash } = window.location;
    // Supabase will process the token automatically on this route,
    // but for a better UX, let's check the session.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!hash && !session) {
        setError(
          "Invalid or expired password reset link. Please try requesting a new reset email."
        );
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      // Update the user's password
      const { error: updateErr } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateErr) {
        setError(updateErr.message || "Failed to reset password.");
        setSubmitting(false);
        return;
      }

      toast({
        title: "Password Reset Successful",
        description: "You can now log in with your new password.",
      });
      setTimeout(() => {
        navigate("/admin/login");
      }, 500);
    } catch (err: any) {
      setError("Unexpected error resetting password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="max-w-md w-full border-2">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center gap-2 justify-center text-lg">
            <Lock className="h-5 w-5 text-orange-500" />
            Reset Password
          </CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                minLength={8}
                required
                disabled={submitting}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Re-enter new password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                minLength={8}
                required
                disabled={submitting}
                autoComplete="new-password"
              />
            </div>
            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
            <Button
              type="button"
              className="w-full mt-2"
              variant="ghost"
              onClick={() => navigate("/admin/login")}
              disabled={submitting}
            >
              Back to Login
            </Button>
            <p className="text-xs text-gray-400 text-center">
              If you did not request a password reset, you can safely ignore this page.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
