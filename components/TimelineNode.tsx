
import React, { useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TimelineNodeProps } from '../types';

const TimelineNode: React.FC<TimelineNodeProps> = ({ article, isActive, onExpand, isExpanded }) => {
  const ref = useRef(null);
  
  // Smooth scroll to element when it becomes expanded
  useEffect(() => {
    if (isExpanded && ref.current) {
      const yOffset = -200; // Offset to account for the fixed header
      const element = ref.current as HTMLElement;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [isExpanded]);

  const displayDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      ref={ref}
      className={`relative min-h-[100vh] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20 hover:opacity-40'} z-10`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-start pt-[25vh] pb-[25vh] h-full">
        
        {/* Left: Date (Desktop) - Sticky and Subtle */}
        <div className="hidden md:flex justify-end items-start pr-12 pt-1">
          <motion.span
          initial={false}
          animate={{
            color: isActive ? '#FF791B' : 'rgba(255,255,255,0.1)',
          }}
          className="font-medium tracking-[0.4em] uppercase text-[10px] sticky top-1/2"
          >
            {displayDate}
          </motion.span>
        </div>

        {/* Middle: Dot Anchor - Sits on the line, but below content conceptually */}
        <div className="flex justify-center relative">
          <div className="sticky top-1/2 -translate-y-1/2 z-0">
            <motion.div
            initial={false}
            animate={{
              scale: isActive ? 1.4 : 1,
              backgroundColor: isActive ? '#FF791B' : '#333',
              boxShadow: isActive ? '0 0 30px rgba(255,121,27,0.4)' : 'none',
            }}
  className="w-4 h-4 rounded-full cursor-pointer transition-colors duration-500 border-2 border-black"
  onClick={onExpand}
/>

          </div>
        </div>

        {/* Right: Content Area - Positioned ABOVE the line via grid spacing/z-index */}
        <div className="px-8 md:px-0 md:pl-8 z-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            {/* Mobile Only Date */}
            <span className="md:hidden text-[#FF791B] font-medium tracking-widest uppercase text-xs mb-4 block">
              {displayDate}
            </span>

            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              {article.title}
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl font-light mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <button 
              onClick={onExpand}
              className="group flex items-center gap-3 text-white/40 hover:text-[#FF791B] transition-all duration-300 mb-8"
            >
              <span className="text-xs tracking-[0.3em] uppercase">{isExpanded ? 'Collapse' : 'Explore Deeply'}</span>
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="w-8 h-[1px] bg-current relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-current rotate-45" />
              </motion.div>
            </button>

            {/* Expanded Content: Layered above the timeline */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden bg-black/40 backdrop-blur-[1px] rounded-sm p-4 -ml-4"
                >
                  <div className="prose prose-invert max-w-none text-white/70 leading-relaxed space-y-8 pb-12 text-lg font-light border-l border-[#FF791B]/20 pl-6">
                    <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TimelineNode;
