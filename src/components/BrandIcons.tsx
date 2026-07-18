import React from 'react';

export const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 32 32" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.74 5.483 2.031 7.781L0 32l8.441-2.188C10.706 31.18 13.284 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0z" 
      fill="#25D366"
    />
    <path 
      d="M25.438 21.666c-0.391-0.197-2.316-1.144-2.675-1.275-0.359-0.131-0.622-0.197-0.884 0.197-0.262 0.394-1.016 1.275-1.247 1.537-0.23 0.262-0.46 0.295-0.853 0.098-0.393-0.197-1.659-0.612-3.161-1.954-1.169-1.045-1.957-2.334-2.187-2.728-0.23-0.393-0.024-0.607 0.173-0.803 0.177-0.177 0.393-0.459 0.59-0.689 0.197-0.23 0.262-0.393 0.393-0.656 0.131-0.262 0.066-0.492-0.033-0.689-0.098-0.197-0.885-2.131-1.213-2.918-0.32-0.766-0.645-0.662-0.885-0.674-0.23-0.012-0.492-0.015-0.754-0.015-0.262 0-0.689 0.098-1.049 0.492-0.361 0.393-1.377 1.344-1.377 3.279 0 1.934 1.41 3.803 1.607 4.066 0.197 0.262 2.77 4.23 6.711 5.934 0.938 0.405 1.67 0.648 2.241 0.829 0.943 0.3 1.802 0.257 2.479 0.156 0.758-0.113 2.316-0.947 2.644-1.862 0.328-0.915 0.328-1.699 0.23-1.862-0.098-0.164-0.361-0.262-0.754-0.459z" 
      fill="#FFFFFF"
    />
  </svg>
);

export const PhoneCallLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 32 32" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="url(#phoneGrad)" />
    <defs>
      <linearGradient id="phoneGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path 
      d="M23.2 20.3c-0.8-0.4-2.5-1.2-2.9-1.3-0.4-0.1-0.7-0.2-1 0.2-0.3 0.4-1.1 1.3-1.3 1.6-0.2 0.3-0.5 0.3-0.9 0.1-0.4-0.2-1.8-0.7-3.4-2.1-1.2-1.1-2-2.4-2.2-2.8-0.2-0.4 0-0.6 0.2-0.8 0.2-0.2 0.4-0.5 0.6-0.7 0.2-0.2 0.3-0.4 0.4-0.7 0.1-0.3 0.1-0.5-0.1-0.7-0.1-0.2-0.9-2.2-1.3-3-0.3-0.8-0.7-0.7-1-0.7h-0.8c-0.3 0-0.7 0.1-1.1 0.5-0.4 0.4-1.4 1.4-1.4 3.4 0 2 1.4 3.9 1.6 4.2 0.2 0.3 2.8 4.3 6.9 6 1 0.4 1.7 0.7 2.3 0.9 1 0.3 1.8 0.3 2.5 0.2 0.8-0.1 2.5-1 2.8-2 0.3-1 0.3-1.8 0.2-2-0.1-0.2-0.4-0.3-0.8-0.5z" 
      fill="#FFFFFF"
    />
  </svg>
);

export const BrandLogoSW: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: "w-9 h-9 text-base",
    md: "w-11 h-11 text-xl",
    lg: "w-14 h-14 text-2xl"
  }[size];

  return (
    <div className={`${sizeClasses} relative rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-0.5 shadow-xl shadow-amber-500/25 group-hover:scale-105 transition-all duration-300 flex items-center justify-center`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute -right-2 -top-2 w-6 h-6 bg-amber-500/20 rounded-full blur-sm" />
        <span className="font-serif font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
          SW
        </span>
      </div>
    </div>
  );
};
