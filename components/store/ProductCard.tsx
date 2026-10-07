'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const price = product.discountPrice || product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added "${product.title}" to your cart!`);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Container */}
      <Link href={`/products/${product.id}`} className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden block">
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-accent-600 text-white shadow-sm uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-brand-600 text-white shadow-sm uppercase tracking-wider">
              FEATURED
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.stock > 0 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3" /> In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-600/90 text-white backdrop-blur-md">
              <AlertCircle className="w-3 h-3" /> Sold Out
            </span>
          )}
        </div>
      </Link>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400 font-medium">
            <span>{product.categoryName || 'General'}</span>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-brand-600 transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 ml-1">
                {product.rating ? product.rating.toFixed(1) : '5.0'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Price & Add Button */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                ${price.toFixed(2)}
              </div>
              {hasDiscount && (
                <div className="text-xs text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 transition-all transform active:scale-95 shadow-sm"
              aria-label="Add product to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
