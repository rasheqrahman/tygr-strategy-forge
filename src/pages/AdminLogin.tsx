
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import SecureLoginForm from '@/components/SecureLoginForm';

const AdminLogin = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />
      <div className="py-12 px-6 flex-1">
        <div className="max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-orange-500" />
                Admin Access
              </CardTitle>
              <CardDescription>
                Sign in to access admin features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecureLoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLogin;
