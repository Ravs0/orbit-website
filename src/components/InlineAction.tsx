import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Check, Loader2 } from 'lucide-react';

interface InlineActionProps {
  actionText: string;
  icon?: React.ReactNode;
  href?: string;
  isPrimary?: boolean;
  className?: string;
  label?: string; // Kept to avoid breaking props elsewhere, even if unused visually
  theme?: string; // Kept to avoid breaking props elsewhere
}

export const InlineAction: React.FC<InlineActionProps> = ({
  actionText,
  icon,
  href,
  isPrimary = false,
  className,
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleTrigger = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('loading');
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
    
    setTimeout(() => {
      if (href) {
        window.open(href, '_blank', 'noreferrer');
      }
      setStatus('idle');
    }, 1200);
  };

  return (
    <button
      onClick={handleTrigger}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-[14px] px-6 py-4 transition-all duration-300 font-semibold text-[15px]",
        isPrimary 
          ? "bg-brand-600 text-white hover:bg-brand-700 shadow-sm" 
          : "bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 shadow-sm",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center gap-2"
          >
            {actionText} {icon}
          </motion.div>
        )}
        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center w-full"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center w-full"
          >
            <Check className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
