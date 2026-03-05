import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

export const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} {...props} />);

TooltipTrigger.displayName = 'TooltipTrigger';

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} {...props} />);

TooltipContent.displayName = 'TooltipContent';
