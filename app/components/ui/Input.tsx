"use client";

import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  suffix?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  suffix
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full ${suffix ? 'pl-16 pr-4' : 'px-4'} py-2 border border-border rounded-lg bg-card-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      />
      {suffix && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
          {suffix}
        </span>
      )}
    </div>
  );
};
