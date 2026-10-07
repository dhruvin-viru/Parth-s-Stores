'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ShoppingBag, PackageCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-2">
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center text-[10px] font-medium py-1 px-3 rounded-xl transition-all ${
            isActive('/') ? 'text-brand-600 font-bold bg-brand-50' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Shop Catalog */}
        <Link 
          href="/products" 
          className={`flex flex-col items-center justify-center text-[10px] font-medium py-1 px-3 rounded-xl transition-all ${
            isActive('/products') ? 'text-brand-600 font-bold bg-brand-50' : 'text-slate-500'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Catalog</span>
        </Link>

        {/* Cart Drawer Trigger */}
        <button 
          onClick={openCart}
          className="relative flex flex-col items-center justify-center text-[10px] font-medium py-1 px-3 rounded-xl text-slate-500 hover:text-brand-600"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-accent-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* Track Orders */}
        <Link 
          href="/orders/sample" 
          className={`flex flex-col items-center justify-center text-[10px] font-medium py-1 px-3 rounded-xl transition-all ${
            pathname.startsWith('/orders') ? 'text-brand-600 font-bold bg-brand-50' : 'text-slate-500'
          }`}
        >
          <PackageCheck className="w-5 h-5 mb-0.5" />
          <span>Track</span>
        </Link>
      </div>
    </nav>
  );
};
