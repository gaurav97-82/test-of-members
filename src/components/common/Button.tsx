// Create a reusable green button component for Prashikshan
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const PrashikshanButton: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  const baseClasses = "px-4 py-2 font-semibold rounded-lg transition duration-300";
  const primaryClasses = "bg-prashikshan-primary text-white hover:bg-green-700 shadow-md";
  const secondaryClasses = "bg-white text-prashikshan-primary border-2 border-prashikshan-primary hover:bg-prashikshan-light shadow-md";

  const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default PrashikshanButton;
