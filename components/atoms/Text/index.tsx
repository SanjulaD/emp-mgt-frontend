import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className = '' }): JSX.Element => {
  return <span className={`text-base ${className}`}>{children}</span>;
};

export default Text;
