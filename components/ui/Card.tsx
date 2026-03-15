import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = true, blur = true, onClick, style }: CardProps) {
  const hoverStyles = hover
    ? "hover:translate-y-[-5px] hover:scale-[1.02] hover:shadow-[0_8px_24px_var(--shadow-color)] hover:z-10 cursor-pointer"
    : "";

  const blurClasses = blur
    ? "bg-[var(--glass-bg)] backdrop-blur-[25px] saturate-[180%] [-webkit-backdrop-filter:blur(25px)_saturate(180%)]"
    : "bg-[var(--bg-color)]/90";

  const baseClasses = `
    ${blurClasses}
    rounded-[var(--radius-2xl)]
    shadow-[var(--shadow-md)]
    border
    border-[var(--glass-border)]
    p-4 md:p-6
    relative
    transition-all duration-[0.4s] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]
    ${hoverStyles}
    ${className}
  `;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} text-left w-full`}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={baseClasses} style={style}>
      {children}
    </div>
  );
}
