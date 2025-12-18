
import React from 'react';
const FEATURES = {
  NAV_ITEMS: false,
  COMMAND_CENTER: false,
};

const navItems = [
  { label: 'Journal', href: '#/', enabled: false },
  { label: 'Orbitals', href: '#/projects', enabled: false },
  { label: 'Intelligence', href: '#/about', enabled: false },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#FF791B] selection:text-white">
      {/* Space Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF791B]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#FF791B]/10 rounded-full blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF791B] flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
               <div className="w-2 h-2 bg-[#FF791B] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter orbit-font">
              37<span className="text-[#FF791B]">ORBIT</span>
            </span>
          </a>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
  {navItems
    .filter(item => item.enabled)
    .map(item => (
      <a
        key={item.label}
        href={item.href}
        className="hover:text-[#FF791B] transition-colors"
      >
        {item.label}
      </a>
    ))}
</div>
          {FEATURES.COMMAND_CENTER && (
  <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold hover:border-[#FF791B] hover:text-[#FF791B] transition-all">
    COMMAND CENTER
  </button>
)}
        </nav>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {children}
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 37ORBIT. Do Something.
          </div>
          <div className="flex gap-6">
             <div className="w-1.5 h-1.5 bg-[#FF791B] rounded-full animate-pulse"></div>
             <span className="text-xs tracking-widest text-gray-400 uppercase">System Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
