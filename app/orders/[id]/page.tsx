'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { subscribeToOrder } from '@/lib/firestoreServices';
import { OrderTimeline } from '@/components/store/OrderTimeline';
import { Order } from '@/types/ecommerce';
import { PackageCheck, ArrowLeft, ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || orderId === 'sample') {
      // Fallback sample order for quick manual route testing
      setOrder({
        id: 'ORD-SAMPLE-789',
        customerDetails: {
          name: 'Alex Mercer',
          email: 'alex.mercer@example.com',
          phone: '+1 (555) 234-5678',
          address: '742 Evergreen Terrace',
          city: 'Springfield',
          zipCode: '97477'
        },
        items: [
          {
            productId: 'p1',
            title: 'Aura Studio Pro Wireless Headphones',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
          }
        ],
        subtotal: 249.99,
        discountApplied: 50.00,
        totalAmount: 199.99,
        status: 'shipped',
        courierName: 'FedEx Express',
        trackingNumber: 'TRK-8849201948',
        trackingUrl: 'https://www.fedex.com/tracking',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setLoading(false);
      return;
    }

    // Subscribe to Firestore doc in real-time using onSnapshot
    const unsubscribe = subscribeToOrder(orderId, (updatedOrder) => {
      setOrder(updatedOrder);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return (
      <div className="py-16 space-y-6 max-w-4xl mx-auto">
        <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <PackageCheck className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Order Not Found</h2>
        <p className="text-xs text-slate-500">We couldn't locate an order with ID: #{orderId}</p>
        <Link href="/products" className="inline-block px-5 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-full">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      {/* Real-Time Firestore Step Timeline */}
      <OrderTimeline order={order} isRealtime={orderId !== 'sample'} />

      {/* Order Details & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shipping Address */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Delivery Destination</span>
          </h3>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customerDetails.name}</p>
          <p className="text-xs text-slate-500">{order.customerDetails.address}, {order.customerDetails.city}</p>
          <p className="text-xs text-slate-500">{order.customerDetails.phone}</p>
        </div>

        {/* Customer Email */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-brand-600" />
            <span>Notifications Email</span>
          </h3>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customerDetails.email}</p>
          <p className="text-[11px] text-slate-500">Live shipping updates & receipt dispatched to this address.</p>
        </div>

        {/* Total Cost */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Order Value</span>
          </h3>
          <div className="text-2xl font-extrabold text-brand-600">${order.totalAmount.toFixed(2)}</div>
          {order.discountApplied > 0 && (
            <p className="text-[11px] text-emerald-600 font-semibold">Includes ${order.discountApplied.toFixed(2)} discount</p>
          )}
        </div>
      </div>

      {/* Items Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Purchased Items ({order.items.length})
        </h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                  <Image src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'} alt="" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-400">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
