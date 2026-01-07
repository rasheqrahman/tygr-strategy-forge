
import React, { useEffect } from 'react';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Enhanced security headers with CSP
    const securityMeta = [
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
      { httpEquiv: 'X-Frame-Options', content: 'DENY' },
      { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' },
      { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { 
        httpEquiv: 'Content-Security-Policy', 
        content: import.meta.env.PROD 
          ? "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://tygrventures.com;"
          : "default-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' ws: wss: http: https:;"
      },
      { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' }
    ];

    securityMeta.forEach(({ httpEquiv, content }) => {
      const existingMeta = document.querySelector(`meta[http-equiv="${httpEquiv}"]`);
      if (!existingMeta) {
        const meta = document.createElement('meta');
        meta.httpEquiv = httpEquiv;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });

    // Remove the invasive developer tools blocking and focus on legitimate security
    // This was security through obscurity and not effective
    
    return () => {
      // Cleanup function - no event listeners to remove now
    };
  }, []);

  return <>{children}</>;
};

export default SecurityWrapper;
