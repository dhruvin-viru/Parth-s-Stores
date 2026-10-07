'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Express Delivery</h4>
              <p className="text-[11px] text-slate-400">On all orders over $99</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">2-Year Warranty</h4>
              <p className="text-[11px] text-slate-400">100% genuine product guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">30-Day Easy Return</h4>
              <p className="text-[11px] text-slate-400">No hassle money-back policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">24/7 Priority Support</h4>
              <p className="text-[11px] text-slate-400">Dedicated customer care</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">PARTH'S STORE</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-sm">
              Your premier destination for high-grade technology, wearables, active footwear, and minimalist gear. Built with Next.js App Router and real-time Firebase syncing.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/products?category=electronics" className="hover:text-white transition-colors">Electronics & Audio</Link></li>
              <li><Link href="/products?category=wearables" className="hover:text-white transition-colors">Smart Wearables</Link></li>
              <li><Link href="/products?category=footwear" className="hover:text-white transition-colors">Sneakers & Shoes</Link></li>
              <li><Link href="/products?category=bags" className="hover:text-white transition-colors">Travel & Backpacks</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Checkout</Link></li>
              <li><Link href="/orders/sample" className="hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-3">Subscribe for exclusive flash coupon codes and deal alerts.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-500 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Parth's Store. Built with Next.js, Tailwind CSS & Firebase.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for high performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
