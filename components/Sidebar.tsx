
import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-64 flex-shrink-0 hidden lg:block bg-white border-r border-slate-200 h-[calc(100vh-64px)] overflow-y-auto p-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === null 
            ? 'bg-emerald-50 text-emerald-700' 
            : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <i className="fa-solid fa-border-all w-5 text-center"></i>
          All Products
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <i className={`fa-solid ${getIcon(cat)} w-5 text-center`}></i>
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Business Tools</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <i className="fa-solid fa-chart-line w-5 text-center"></i>
            Insights
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <i className="fa-solid fa-receipt w-5 text-center"></i>
            Order History
          </button>
        </div>
      </div>
    </div>
  );
};

const getIcon = (cat: Category) => {
  switch(cat) {
    case Category.BEVERAGES: return 'fa-bottle-water';
    case Category.SNACKS: return 'fa-cookie';
    case Category.PERSONAL_CARE: return 'fa-sparkles';
    case Category.HOUSEHOLD: return 'fa-house-chimney';
    case Category.DAIRY: return 'fa-egg';
    case Category.PULSES: return 'fa-wheat-awn';
    case Category.FROZEN: return 'fa-ice-cream';
    case Category.PHARMACY: return 'fa-pills';
    case Category.MENS_FASHION: return 'fa-shirt';
    case Category.WOMENS_FASHION: return 'fa-person-dress';
    case Category.KIDS_CLOTHING: return 'fa-child';
    case Category.FOOTWEAR: return 'fa-shoe-prints';
    case Category.ACCESSORIES: return 'fa-hat-wizard'; // Generic for accessories
    default: return 'fa-tag';
  }
};

export default Sidebar;
