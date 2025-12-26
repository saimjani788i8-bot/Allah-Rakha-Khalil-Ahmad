
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Your Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <i className="fa-solid fa-cart-shopping text-6xl mb-4 opacity-20"></i>
              <p className="text-lg">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-emerald-600 font-semibold hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-slate-50" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-slate-400 mb-2">{item.unit}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Rs. {item.price * item.quantity}</span>
                    <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-emerald-600 transition-colors"
                      >
                        <i className="fa-solid fa-minus text-[10px]"></i>
                      </button>
                      <span className="text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-emerald-600 transition-colors"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold text-slate-900">Rs. {subtotal}</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500">Delivery Fee</span>
              <span className="text-emerald-600 font-semibold uppercase text-xs">Free</span>
            </div>
            <div className="flex items-center justify-between mb-6 text-lg">
              <span className="font-bold text-slate-800">Total</span>
              <span className="font-bold text-emerald-600 text-2xl">Rs. {subtotal}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform active:scale-[0.98]"
            >
              Confirm Wholesale Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
