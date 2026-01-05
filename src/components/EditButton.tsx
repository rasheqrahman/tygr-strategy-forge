
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface EditButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const EditButton: React.FC<EditButtonProps> = ({ 
  children, 
  onClick, 
  href, 
  className,
  variant = "outline",
  size = "sm",
  ...props 
}) => {
  const { isAdmin, isLoading } = useAuth();

  console.log('EditButton - isAdmin:', isAdmin, 'isLoading:', isLoading);

  if (isLoading) {
    console.log('EditButton - Still loading, not rendering button');
    return null;
  }

  if (!isAdmin) {
    console.log('EditButton - Not admin, not rendering button');
    return null;
  }

  console.log('EditButton - Admin authenticated, rendering button');

  if (href) {
    return (
      <a href={href}>
        <Button variant={variant} size={size} className={className} {...props}>
          {children}
        </Button>
      </a>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default EditButton;
