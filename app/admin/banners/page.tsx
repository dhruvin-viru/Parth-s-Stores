'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Banner } from '@/types/ecommerce';
import { getActiveBanners, createBanner } from '@/lib/firestoreServices';
import { Image as ImageIcon, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('/products');
  const [tag, setTag] = useState('NEW ARRIVAL');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getActiveBanners();
    setBanners(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    try {
      await createBanner({
        title: title.trim(),
        subtitle: subtitle.trim(),
        imageUrl: imageUrl.trim(),
        linkUrl: linkUrl.trim(),
        active: true,
        tag: tag.trim()
      });
      toast.success(`Banner "${title}" created!`);
      setIsModalOpen(false);
      setTitle('');
      setSubtitle('');
      setImageUrl('');
      fetchData();
    } catch (error) {
      toast.error('Failed to create banner.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-brand-600" />
            <span>Hero Banner Carousel Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Control active promotional hero slides on the main homepage</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hero Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b: Banner) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm space-y-3 relative overflow-hidden">
            <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-900">
              <Image src={b.imageUrl} alt={b.title} fill className="object-cover opacity-75" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-slate-950/80 to-transparent">
                {b.tag && <span className="text-[10px] font-bold text-amber-400 uppercase">{b.tag}</span>}
                <h3 className="text-base font-extrabold text-white">{b.title}</h3>
                <p className="text-xs text-slate-300">{b.subtitle}</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 flex justify-between font-mono">
              <span>Link: {b.linkUrl}</span>
              <span className="text-emerald-600 font-bold">Active</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-4">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Hero Banner Slide</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Banner Headline Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Gen Noise Cancellation"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Subheadline Description</label>
                <input
                  type="text"
                  placeholder="e.g. 40h Battery life with fast charge"
                  value={subtitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Tag / Promo Label</label>
                <input
                  type="text"
                  placeholder="e.g. 20% OFF TODAY"
                  value={tag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTag(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Background Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Destination Target Link</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-100 text-xs font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl">
                  Add Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
