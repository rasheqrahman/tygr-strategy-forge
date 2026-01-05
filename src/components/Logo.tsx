
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 'md'
}) => {
  const navigate = useNavigate();

  const sizeConfig = {
    sm: { icon: 24, fontSize: '1rem', gap: '0.5rem' },
    md: { icon: 32, fontSize: '1.25rem', gap: '0.625rem' },
    lg: { icon: 48, fontSize: '1.75rem', gap: '0.75rem' },
    xl: { icon: 64, fontSize: '2.25rem', gap: '1rem' },
    xxl: { icon: 80, fontSize: '2.75rem', gap: '1.25rem' }
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`flex items-center cursor-pointer ${className}`}
      style={{ gap: config.gap }}
      onClick={() => navigate('/')}
    >
      <img
        src="/logo.svg"
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
          color: '#121418'
        }}
      >
        TYGR Ventures
      </span>
    </div>
  );
};

export default Logo;
