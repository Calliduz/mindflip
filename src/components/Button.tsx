import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    comic-btn inline-flex items-center justify-center
    transition-all duration-150 uppercase tracking-wide
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f1a]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-yellow-400 to-orange-500
      text-black focus:ring-yellow-400
    `,
    secondary: `
      bg-gradient-to-r from-purple-500 to-pink-500
      text-white focus:ring-purple-400
    `,
    outline: `
      bg-transparent border-cyan-400 text-cyan-400
      hover:bg-cyan-400/10 focus:ring-cyan-400
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-500
      text-white focus:ring-red-400
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
