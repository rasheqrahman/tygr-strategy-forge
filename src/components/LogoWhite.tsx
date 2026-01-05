
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoWhiteProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const LogoWhite: React.FC<LogoWhiteProps> = ({
  className = "",
  size = 'md'
}) => {
  const navigate = useNavigate();

  const sizeConfig = {
    sm: { icon: 28, fontSize: '1.125rem', gap: '0.5rem' },
    md: { icon: 36, fontSize: '1.5rem', gap: '0.75rem' },
    lg: { icon: 52, fontSize: '2rem', gap: '0.875rem' },
    xl: { icon: 68, fontSize: '2.5rem', gap: '1rem' },
    xxl: { icon: 84, fontSize: '3rem', gap: '1.25rem' }
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`flex items-center cursor-pointer ${className}`}
      style={{ gap: config.gap }}
      onClick={() => navigate('/')}
    >
      <img
        src="/logo-dark.svg"
        alt=""
        width={config.icon}
        height={config.icon}
        style={{ display: 'block' }}
      />
      <span
        className="font-semibold tracking-tight"
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: config.fontSize,
          color: '#f2f2f2'
        }}
      >
        TYGR Ventures
      </span>
    </div>
  );
};

export default LogoWhite;
