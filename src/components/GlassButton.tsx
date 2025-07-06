"use client";

import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function GlassButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}: GlassButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`glass-button ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
} 