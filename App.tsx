
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { Product, Category, CartItem } from './types';
import { PRODUCTS, BRANDS, CATEGORIES } from './constants';
import { getSmartSearchRecommendations, getBusinessInsight } from './services/geminiService';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MOCK_CHART_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 3890 },
  { name: 'Sat', sales: 6390 },
  { name: 'Sun', sales: 4490 },
];

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [smartResults, setSmartResults] = useState<Product[] | null>(null);
  const [insight, setInsight] = useState<string>('Crunching numbers to find your next profit boost...');
  const [isSearching, setIsSearching] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let result = smartResults || PRODUCTS;
    
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery && !smartResults) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery, smartResults]);

  // Handle smart AI search
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length > 5) {
        setIsSearching(true);
        const recommendations = await getSmartSearchRecommendations(searchQuery, PRODUCTS);
        setSmartResults(recommendations);
        setIsSearching(false);
        mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSmartResults(null);
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Get AI Insight on mount
  useEffect(() => {
    const fetchInsight = async () => {
      const result = await getBusinessInsight(MOCK_CHART_DATA);
      setInsight(result || 'Pro-tip: Stock up on snacks! They are trending 15% higher this weekend.');
    };
    fetchInsight();
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // We don't necessarily open the cart on every add to prevent friction
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }, []);

  const handleCheckout = () => {
    alert("Wholesale order submitted! Our representative will call your shop for delivery timing.");
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onHomeClick={() => {
          setSelectedCategory(null);
          setSearchQuery('');
          setSmartResults(null);
        }}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <main ref={mainRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Show Home Sections Only if Not Searching/Filtering */}
            {!selectedCategory && !searchQuery && !smartResults && (
              <>
                {/* Hero Banner Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 relative h-64 md:h-80 rounded-3xl overflow-hidden bg-slate-900 group">
                    <img 
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                      alt="Marketplace Banner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent p-8 md:p-12 flex flex-col justify-center">
                      <span className="inline-block bg-emerald-500 text-slate-900 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest mb-4">
                        Free Delivery
                      </span>
                      <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                        Smart Inventory <br/>for Your Shop.
                      </h1>
                      <p className="text-slate-300 text-sm md:text-base max-w-md mb-8">
                        Join 10,000+ retailers getting wholesale prices delivered within 24 hours.
                      </p>
                      <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold text-sm w-fit hover:bg-emerald-500 transition-colors">
                        Restock Now
                      </button>
                    </div>
                  </div>

                  <div className="bg-emerald-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                      <i className="fa-solid fa-brain text-9xl"></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <i className="fa-solid fa-wand-magic-sparkles text-white text-sm"></i>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-100">Market Insight</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 leading-tight italic">
                        "{insight}"
                      </h3>
                    </div>
                    <button className="bg-slate-900/30 backdrop-blur-md text-white border border-white/20 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Mobile Categories Bubble List */}
                <div className="lg:hidden flex overflow-x-auto gap-4 py-2 no-scrollbar">
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${!selectedCategory ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    All
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Top Brands Grid */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Partner Brands</h2>
                    <button className="text-sm font-bold text-emerald-600 hover:underline">View All</button>
                  </div>
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    {BRANDS.map(brand => (
                      <div key={brand.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center p-3 group-hover:border-emerald-500 group-hover:shadow-md transition-all">
                          <img src={brand.logo} alt={brand.name} className="max-w-full grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{brand.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Product Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                  {isSearching ? 'Thinking...' : (selectedCategory || (smartResults ? 'AI Curated Selection' : 'Inventory Picks'))}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isSearching ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {filteredProducts.length} Wholesale Units Ready
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                  <i className="fa-solid fa-arrow-down-wide-short"></i>
                  Sort
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-box-open text-4xl text-slate-200"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Inventory item not found</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Try asking AI for "popular beverages" instead or check your spelling.</p>
              </div>
            )}

            {/* Analytics Dashboard (Visible at bottom for admin feel) */}
            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-12">
               <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Your Business Pulse</h2>
                    <p className="text-sm text-slate-500">Real-time market activity for your area</p>
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }} 
                      />
                      <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </section>
          </div>
          
          {/* Footer space */}
          <div className="h-24 md:h-12"></div>
        </main>
      </div>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      
      {/* Mobile App Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-8 py-3 flex items-center justify-between z-40">
        <button 
          onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
          className={`flex flex-col items-center gap-1 ${!selectedCategory ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[10px] font-black uppercase">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <i className="fa-solid fa-layer-group text-lg"></i>
          <span className="text-[10px] font-black uppercase">Orders</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 relative"
        >
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center -mt-8 shadow-lg border-4 border-white">
            <i className="fa-solid fa-cart-shopping text-white text-lg"></i>
          </div>
          <span className="text-[10px] font-black uppercase">Cart</span>
          {cart.length > 0 && <span className="absolute top-[-36px] right-2 w-5 h-5 bg-emerald-500 text-slate-900 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <i className="fa-solid fa-chart-pie text-lg"></i>
          <span className="text-[10px] font-black uppercase">Insights</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <i className="fa-solid fa-circle-user text-lg"></i>
          <span className="text-[10px] font-black uppercase">Me</span>
        </button>
      </div>
    </div>
  );
};

export default App;
