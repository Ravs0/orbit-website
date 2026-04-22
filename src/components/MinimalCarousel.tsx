import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreHorizontal, ExternalLink, Bookmark } from "lucide-react";

/* --- Types --- */
export interface CarouselCard {
  id: string;
  title: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

interface MinimalCarouselProps {
  cards: CarouselCard[];
}

export const MinimalCarousel: React.FC<MinimalCarouselProps> = ({
  cards,
}) => {
  // Start with the first card active to draw immediate attention
  const [activeId, setActiveId] = useState<string | null>(cards[0]?.id || null);

  const activeCard = cards.find((c) => c.id === activeId);
  const secondaryCards = cards.filter((c) => c.id !== activeId);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setActiveId(null);
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center bg-transparent">
      <div
        className="w-full flex flex-col items-center justify-center px-2 sm:px-4 select-none font-sans cursor-default"
        onClick={handleBackgroundClick}
      >
        {/* Container  */}
        <div className="w-full max-w-[600px]">
          <motion.div layout className="flex flex-col gap-3">

            {/* Expanded Card */}
            <AnimatePresence mode="popLayout">
              {activeCard && (
                <motion.div
                  key={activeCard.id}
                  layoutId={activeCard.id}
                  className={`relative flex w-full flex-col justify-between
                             rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 text-white shadow-xl ring-1 ring-white/10
                             ${activeCard.color}
                             min-h-[200px] sm:h-52 z-10`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shrink-0 bg-white/10 shadow-inner">
                      <activeCard.icon size={28} className="sm:w-8 sm:h-8" />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex items-center gap-2 rounded-full bg-white text-brand-950 font-bold 
                                 px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg
                                 text-[13px] sm:text-[15px] whitespace-nowrap
                                 hover:bg-brand-50 transition-colors"
                    >
                      Apply Now <ExternalLink size={16} className="text-brand-600" />
                    </motion.button>
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    <div className="overflow-hidden mr-2">
                      <h3 className="text-2xl sm:text-[28px] font-bold opacity-100 leading-tight truncate mb-1">
                        {activeCard.title}
                      </h3>
                      <p className="text-[17px] sm:text-[19px] font-semibold tracking-tight opacity-75 truncate">
                        {activeCard.value}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="rounded-full bg-white/10 p-2 sm:p-3
                                 backdrop-blur-md hover:bg-white/20 transition-colors shrink-0"
                    >
                      <Bookmark size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid Layout */}
            <motion.div
              layout
              className={`grid gap-2 sm:gap-3 transition-all duration-500 ${activeId ? "grid-cols-3" : "grid-cols-2"
                }`}
            >
              {(activeId ? secondaryCards : cards).map((card) => (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(card.id);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className={`relative flex flex-col justify-between cursor-pointer
                             rounded-[22px] sm:rounded-[28px] p-4 sm:p-5 text-white shadow-md ring-1 ring-white/10
                             ${card.color} hover:brightness-110 transition-all
                             ${activeId ? "h-[110px] sm:h-[120px]" : "h-32 sm:h-40"}`}
                >
                  <div className="flex justify-between items-start">
                    <card.icon size={activeId ? 22 : 28} className="shrink-0 opacity-80" />
                    <div className="rounded-full bg-white/10 p-1.5 transition-colors">
                      <MoreHorizontal size={14} />
                    </div>
                  </div>

                  <div className="mt-2 overflow-hidden">
                    <h4 className={`${activeId ? "text-[11px] sm:text-[13px]" : "text-[15px] sm:text-[17px]"} 
                                   font-bold opacity-100 truncate leading-tight mb-0.5`}>
                      {card.title}
                    </h4>
                    <p className={`${activeId ? "text-[10px] sm:text-[11px]" : "text-[13px] sm:text-[14px]"} 
                                   font-semibold text-white/60 truncate`}>
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
