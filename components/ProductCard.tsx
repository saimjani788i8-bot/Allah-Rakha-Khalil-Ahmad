
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isPopular && (
            <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase shadow-sm">
              Trending
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase shadow-sm">
              New
            </span>
          )}
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
          {product.brand}
        </div>
        <h3 className="font-bold text-slate-800 text-sm line-clamp-2 min-h-[40px] leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          {product.bulkDiscount && (
            <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded mb-3 flex items-center gap-1">
              <i className="fa-solid fa-tags"></i>
              {product.bulkDiscount}
            </div>
          )}
          
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-slate-400 font-medium leading-none">Rs.</span>
                <span className="text-xl font-black text-slate-900 leading-none">
                  {product.price.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                Per {product.unit}
              </span>
            </div>
            
            <div className="text-right">
               <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                 product.stock > 20 
                 ? 'bg-emerald-100 text-emerald-700' 
                 : 'bg-rose-100 text-rose-700'
               }`}>
                {product.stock <= 0 ? 'Out of Stock' : `${product.stock} left`}
              </span>
            </div>
          </div>

          <button 
            disabled={product.stock <= 0}
            onClick={() => onAddToCart(product)}
            className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-cart-plus text-xs"></i>
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
