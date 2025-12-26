
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onSearch, onHomeClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-truck-fast text-slate-900 text-lg"></i>
          </div>
          <span className="text-xl font-black tracking-tighter hidden sm:block">
            SADDAR<span className="text-emerald-500">B2B</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative group">
          <input
            type="text"
            placeholder="Search clothes, grocery or ask AI: 'I want to buy unstitched lawn'..."
            className="w-full bg-slate-800 border-none rounded-lg py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all text-sm text-slate-100 placeholder:text-slate-500"
            onChange={(e) => onSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500"></i>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-700 px-2 py-0.5 rounded text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <i className="fa-solid fa-wand-magic-sparkles text-emerald-500 mr-1"></i>
            AI Powered
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800">
            <i className="fa-solid fa-store text-lg"></i>
            <span className="font-semibold text-xs uppercase tracking-wider">My Shop</span>
          </button>
          
          <div className="w-px h-6 bg-slate-800 hidden md:block"></div>

          <button 
            onClick={onCartClick}
            className="relative p-2 text-slate-300 hover:text-emerald-500 transition-colors bg-slate-800 rounded-lg"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-900 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
