import React from 'react';
import SiteLogo from '../assets/logo/Lumkfs-Logo.png';

const iconClass =
  'w-5 h-5 text-white/50 group-hover:text-[#FF791B] transition-colors';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4">
      {/* X / Twitter */}
      <a
        href="https://x.com/yidatuo37"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-3 bg-white/5 rounded-full hover:bg-[#FF791B]/20 transition-all"
        aria-label="X"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconClass}
        >
          <path d="M18.244 2H21l-6.52 7.455L22 22h-6.82l-5.35-7.06L4.2 22H1l7.01-8.02L2 2h6.82l4.82 6.36L18.244 2z" />
        </svg>
      </a>

      {/* Bilibili */}
      <a
        href="https://space.bilibili.com/108402088"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-3 bg-white/5 rounded-full hover:bg-[#FF791B]/20 transition-all"
        aria-label="Bilibili"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconClass}
        >
          <path d="M17.813 4.653h-1.978l1.052-1.058a.993.993 0 0 0-1.406-1.405l-2.47 2.478H10.99L8.52 2.19a.993.993 0 1 0-1.406 1.405l1.052 1.058H6.188C3.875 4.653 2 6.542 2 8.875v8.25C2 19.458 3.875 21.347 6.188 21.347h11.625C20.125 21.347 22 19.458 22 17.125v-8.25c0-2.333-1.875-4.222-4.187-4.222zM8.5 15.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </a>

      {/* Personal Website */}
      <a
        href="https://lumkfs.cn"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-3 bg-white/5 rounded-full hover:bg-[#FF791B]/20 transition-all"
        aria-label="Website"
      >
        <img
          src={SiteLogo}
          alt="Website"
          className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
