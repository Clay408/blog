'use client';

import React from 'react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div className="group relative">
      <pre
        className={className}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
