
import React, { useState } from 'react';
import { LogOut, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FloatingAdminButtonProps {
  onLogout?: () => void;
}

const FloatingAdminButton: React.FC<FloatingAdminButtonProps> = ({ onLogout }) => {
  const { isAuthenticated, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return null;
  }

  const handleLoginClick = () => {
    navigate('/admin/login');
  };

  const handleLogout = async () => {
    await signOut();
    setIsExpanded(false);
    if (onLogout) {
      onLogout();
    }
  };

  // Show login button when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleLoginClick}
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Shield className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Show user menu when authenticated
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded ? (
        <div className="flex flex-col items-end space-y-2 mb-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white border-orange-300 text-orange-700 hover:bg-orange-50 shadow-lg"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      ) : null}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="icon"
        className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingAdminButton;
