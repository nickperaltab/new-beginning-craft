'use client';

import { cn } from "@/lib/utils";
import { TooltipContent, TooltipContentProps } from "@/components/ui/tooltip";

const styles = `
  .tooltip-glow {
    position: relative;
    background: white;
    border-radius: 0.75rem;
  }

  .tooltip-glow::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 0.75rem;
    background: linear-gradient(
      var(--angle, 0deg),
      #3B82F6,
      #A855F7,
      #2DD4BF
    );
    opacity: 1;
    transition: all 0.15s ease-in-out;
    animation: rotate 8s linear infinite;
  }

  .tooltip-glow::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 0.5rem;
    background: white;
    z-index: 0;
  }

  .tooltip-glow:hover::before {
    animation: rotate 3s linear infinite;
  }

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate {
    to {
      --angle: 360deg;
    }
  }

  .tooltip-content {
    position: relative;
    z-index: 1;
    padding: 1rem;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document?.head?.appendChild(styleSheet);
}

interface TooltipWithGlowProps extends TooltipContentProps {
  children: React.ReactNode;
}

export function TooltipWithGlow({ children, className, ...props }: TooltipWithGlowProps) {
  return (
    <TooltipContent className={cn("tooltip-glow", className)} {...props}>
      <div className="tooltip-content">
        {children}
      </div>
    </TooltipContent>
  );
} 