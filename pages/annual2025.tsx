// src/pages/Annual2025.tsx
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { annual2025, type AnnualArticle } from '../data/annual2025';
import MarkdownRenderer from '../components/MarkdownRenderer';


type NodeProps = {
  article: AnnualArticle;
  isActive: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  onBecomeActive: () => void;
};

const AnnualTimelineNode: React.FC<NodeProps> = ({
  article,
  isActive,
  isExpanded,
  onExpand,
  onBecomeActive,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-80% 0px -80% 0px' });

  // 进入视口就把它设为 active（用于高亮、淡入）
  useEffect(() => {
    if (inView) onBecomeActive();
  }, [inView, onBecomeActive]);

  // 展开时平滑滚动到合适位置
  useEffect(() => {
    if (!isExpanded || !ref.current) return;
    const yOffset = -160; // 顶部导航/留白偏移
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [isExpanded]);

  const displayDate = useMemo(() => {
    const d = new Date(article.date);
    // 只展示月日，你也可以改成 year-month-day
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, [article.date]);

  return (
    <div
      ref={ref}
      className={`relative min-h-[60vh] transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-100 hover:opacity-100'
        }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[200px_80px_1fr] items-start pt-[10vh] pb-[10vh] h-full max-w-[1600px] mx-auto">
        {/* Left: Date (Desktop) */}
        <div className="hidden md:flex justify-end items-start pr-12 pt-1">
          <motion.span
            initial={false}
            animate={{ color: isActive ? '#FF791B' : 'rgba(255,255,255,0.12)' }}
            className="font-medium tracking-[0.4em] uppercase text-[10px] sticky top-1/2"
          >
            {displayDate}
          </motion.span>
        </div>

        {/* Middle: Dot */}
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
              role="button"
              aria-label={`Toggle ${article.title}`}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="px-8 md:px-0 md:pl-8 z-20">
          <motion.div
            layout
            initial={false}
            animate={{ opacity: 1, x: 0 }} // 关键：不要把非 active 动画到 0，否则会“看起来没渲染”
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-xl"
          >
            {/* Mobile date */}
            <span className="md:hidden text-[#FF791B] font-medium tracking-widest uppercase text-xs mb-4 block">
              {displayDate}
            </span>

            <h2 className="text-2xl md:text-3xl font-serif text-white/50 mb-4 leading-tight">
              {article.title}
            </h2>

            {article.excerpt && (
              <p className="text-white/60 text-lg md:text-xl font-light mb-8 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <button
              onClick={onExpand}
              className="group flex items-center gap-3 text-white/40 hover:text-[#FF791B] transition-all duration-300 mb-8"
            >
              <span className="text-xs tracking-[0.3em] uppercase">
                {isExpanded ? 'Collapse' : 'Explore Deeply'}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="w-8 h-[1px] bg-current relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-current rotate-45" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden bg-black/40 backdrop-blur-[1px] rounded-sm p-4 -ml-4"
                >
                  <div className="prose prose-invert max-w-none text-white/70 leading-relaxed space-y-8 pb-12 text-lg font-light border-l border-[#FF791B]/20 pl-6">
                    <MarkdownRenderer content={article.content} />
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

const Annual2025: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(annual2025[0]?.id ?? 0);
  const [expandedId, setExpandedId] = useState<number | null>(null);



  return (
    <div className="relative bg-black min-h-[100svh] overflow-hidden">

      {/* ===== 顶部区域：返回按钮 + 年度标题条 ===== */}
      <section className="relative pt-24 pb-24 flex flex-col items-center gap-8">
        {/* 返回主页按钮 */}
        <button
          onClick={() => {
            window.location.hash = '#/';
          }}
          className="
                text-xs
                tracking-[0.35em]
                uppercase
                text-white/40
                hover:text-[#FF791B]
                transition-colors
                "
        >
          ← Back to Home
        </button>
      </section>

      {/* ===== 年度标题条 ===== */}
      <section className="relative pt-5 pb-20 flex justify-center">
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border
            border-white/10
            rounded-2xl
            px-12
            py-12
            max-w-[720px]
            w-[90%]
            ">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-4xl 
                font-mono text-white tracking-tight">
              Year <span className="text-[#FF791B]">2025</span>
            </h1>

            <span className="text-xs tracking-[0.35em] uppercase text-white/40">
              Annual Timeline
            </span>
          </div>
        </div>
      </section>

      {/* 中轴线 */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          -translate-x-1/2
          w-px
          h-full
          z-10
          bg-gradient-to-b
          from-transparent
          via-white/20
          to-transparent
        "
      />

      {annual2025.map((article) => (
        <AnnualTimelineNode
          key={article.id}
          article={article}
          isActive={article.id === activeId}
          isExpanded={article.id === expandedId}
          onBecomeActive={() => setActiveId(article.id)}
          onExpand={() =>
            setExpandedId(prev =>
              prev === article.id ? null : article.id
            )
          }
        />
      ))}
    </div>
  );
};

export default Annual2025;
