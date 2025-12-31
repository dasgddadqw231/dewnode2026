import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface WireframePlaceholderProps {
  text?: string;
  label?: string;
}

export function WireframePlaceholder({ text, label }: WireframePlaceholderProps) {
  return (
    <div className="w-full h-full bg-brand-gray flex flex-col items-center justify-center border border-brand-light/10 relative group">
      {/* Diagonals for wireframe feel - Corner to Corner */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-brand-light" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" className="text-brand-light" />
      </svg>
      
      <div className="flex flex-col items-center justify-center z-10 text-center px-4">
        <ImageIcon size={24} strokeWidth={1} className="text-brand-light/40 mb-2" />
        <div className="flex flex-col gap-1">
          {text && (
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-light/40 font-light leading-tight">
              {text}
            </span>
          )}
          {label && (
            <span className="text-[9px] uppercase tracking-widest text-brand-light/30 leading-tight">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}