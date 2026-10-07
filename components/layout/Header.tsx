'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  PackageCheck
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';

export const Header: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getItemCount, openCart } = useCartStore();
  const { user, logout } = useAuth();
  const itemCount = getItemCount();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-200/80 dark:border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-brand-900 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                  PARTH<span className="text-brand-500">'S</span> STORE
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Premium Commerce
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search products, gear & gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-slate-100/90 focus:bg-white border border-slate-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <button type="submit" className="sr-only">Search</button>
          </form>

          {/* Desktop Links & Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <Link href="/products" className="hover:text-brand-600 transition-colors">Shop All</Link>
              <Link href="/orders/sample" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-brand-500" />
                Track Order
              </Link>
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-slate-700 hover:text-brand-600 hover:bg-slate-100/80 rounded-full transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600 max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="text-xs text-rose-600 hover:underline font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-semibold rounded-full bg-slate-900 text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Cart & Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={openCart}
              className="relative p-2 text-slate-700 rounded-lg"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-100 border border-slate-200"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </form>
            <nav className="flex flex-col gap-2 font-medium text-slate-700">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:bg-slate-100 rounded-lg">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:bg-slate-100 rounded-lg">Shop All</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
