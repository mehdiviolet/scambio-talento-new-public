import React from "react";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-gradient-primary text-white",
    secondary:
      "bg-glass-bg border border-glass-border text-text-primary hover:bg-glass-bg-light",
    warning: "bg-gradient-warning text-white",
    success: "bg-gradient-success text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-6 py-3 text-lg h-12",
  };

  return (
    <button
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-lg font-medium transition-all duration-200
        hover:scale-105 active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
