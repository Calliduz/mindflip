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
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-violet-600 to-purple-600
      hover:from-violet-500 hover:to-purple-500
      text-white shadow-lg shadow-violet-500/30
      focus:ring-violet-500
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-600
      hover:from-gray-600 hover:to-gray-500
      text-white shadow-lg shadow-gray-700/30
      focus:ring-gray-500
    `,
    outline: `
      border-2 border-violet-500 text-violet-400
      hover:bg-violet-500/10
      focus:ring-violet-500
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-rose-600
      hover:from-red-500 hover:to-rose-500
      text-white shadow-lg shadow-red-500/30
      focus:ring-red-500
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
