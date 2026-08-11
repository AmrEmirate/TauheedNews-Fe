'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getArticles, createArticle } from '@/lib/api';

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  isHeadline: boolean;
  isFeature: boolean;
  isFixedAdvice: boolean;
  status: string;
  category: { id: number; name: string };
  author: { name: string };
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'LIST' | 'CREATE' | 'PREVIEW'>('LIST');
  const [previewMode, setPreviewMode] = useState<'DESKTOP' | 'MOBILE'>('DESKTOP');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '1',
    coverImage: '',
    isHeadline: false,
    isFeature: false,
    isFixedAdvice: false,
    status: 'PUBLISHED',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getArticles({ status: 'ALL', limit: 50 });
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await createArticle(formData);
      if (res) {
        alert('Artikel berhasil disimpan ke Express Backend DB!');
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          categoryId: '1',
          coverImage: '',
          isHeadline: false,
          isFeature: false,
          isFixedAdvice: false,
          status: 'PUBLISHED',
        });
        fetchData();
        setActiveTab('LIST');
      } else {
        alert('Gagal menyimpan artikel.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setSaving(false);
    }
  };

  const publishedCount = articles.filter((a) => a.status === 'PUBLISHED').length;
  const draftCount = articles.filter((a) => a.status === 'DRAFT').length;
  const headlineCount = articles.filter((a) => a.isHeadline).length;

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <div className="bg-deep-navy text-white p-6 rounded-lg mb-8 border-b-4 border-brass-gold flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
        <div>
          <span className="text-xs font-bold uppercase text-brass-gold tracking-widest block">
            Panel Kontrol Redaksi (CMS) - Terhubung ke Express API (Port 5000)
          </span>
          <h1 className="font-headline font-bold text-2xl md:text-3xl text-white">
            Dashboard Manajemen Tauheed News
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('LIST')}
            className={`px-3 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === 'LIST' ? 'bg-brass-gold text-deep-navy' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Daftar Artikel ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('CREATE')}
            className={`px-3 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === 'CREATE' ? 'bg-brass-gold text-deep-navy' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            + Buat Artikel Baru
          </button>
          <button
            onClick={() => setActiveTab('PREVIEW')}
            className={`px-3 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === 'PREVIEW' ? 'bg-brass-gold text-deep-navy' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Live Preview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 p-5 rounded-lg shadow-sm">
          <span className="text-xs text-outline dark:text-gray-400 font-bold uppercase">Terbit Hari Ini</span>
          <p className="text-3xl font-extrabold text-brass-gold mt-1">{publishedCount}</p>
        </div>
        <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 p-5 rounded-lg shadow-sm">
          <span className="text-xs text-outline dark:text-gray-400 font-bold uppercase">Draf Masuk</span>
          <p className="text-3xl font-extrabold text-amber-600 mt-1">{draftCount}</p>
        </div>
        <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 p-5 rounded-lg shadow-sm">
          <span className="text-xs text-outline dark:text-gray-400 font-bold uppercase">Headline Aktif</span>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">{headlineCount}</p>
        </div>
      </div>

      {activeTab === 'LIST' && (
        <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-headline font-bold text-lg text-primary dark:text-white uppercase">
              Daftar Artikel Redaksi (Express Backend API)
            </h3>
          </div>
          {loading ? (
            <div className="p-8 text-center text-outline">Memuat data artikel dari backend...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-news-gray dark:bg-slate-800 text-outline uppercase font-bold border-b border-outline-variant/40">
                    <th className="p-3">Judul Artikel</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Penulis</th>
                    <th className="p-3">Posisi Flagging</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-news-gray/50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-primary dark:text-white max-w-xs truncate">
                        <Link href={`/artikel/${art.slug}`} className="hover:text-brass-gold">
                          {art.title}
                        </Link>
                      </td>
                      <td className="p-3 text-brass-gold font-semibold">{art.category?.name}</td>
                      <td className="p-3">{art.author?.name}</td>
                      <td className="p-3 space-x-1">
                        {art.isHeadline && (
                          <span className="bg-brass-gold text-deep-navy text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Headline
                          </span>
                        )}
                        {art.isFeature && (
                          <span className="bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Feature
                          </span>
                        )}
                        {art.isFixedAdvice && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Pinned
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            art.status === 'PUBLISHED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {art.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link
                          href={`/artikel/${art.slug}`}
                          className="text-brass-gold font-bold hover:underline"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'CREATE' && (
        <div className="bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg p-6 shadow-sm">
          <h3 className="font-headline font-bold text-xl text-primary dark:text-white uppercase mb-6 border-l-4 border-brass-gold pl-3">
            Tulis & Terbitkan Artikel Baru ke Backend API
          </h3>
          <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Judul Artikel *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan judul berita atau kajian..."
                className="w-full p-3 rounded border border-outline-variant/50 dark:bg-slate-800 text-sm outline-none focus:border-brass-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Rubrik Kategori *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full p-3 rounded border border-outline-variant/50 dark:bg-slate-800 text-xs outline-none focus:border-brass-gold"
                >
                  <option value="1">Aqidah & Tauhid</option>
                  <option value="2">Tuntunan Islam</option>
                  <option value="3">Ulama & Warisan Ilmu</option>
                  <option value="4">Kajian Kitab</option>
                  <option value="5">Fatwa & Fikih</option>
                  <option value="6">Haramain News</option>
                  <option value="7">Dunia Islam</option>
                  <option value="8">Analisis & Klarifikasi</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">URL Gambar Utama (Cover Image)</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-3 rounded border border-outline-variant/50 dark:bg-slate-800 text-xs outline-none focus:border-brass-gold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Ringkasan (Excerpt) *</label>
              <textarea
                required
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Ringkasan singkat 1-2 kalimat untuk kartu berita..."
                className="w-full p-3 rounded border border-outline-variant/50 dark:bg-slate-800 text-xs outline-none focus:border-brass-gold"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold mb-1">Isi Lengkap Artikel (HTML / Teks Arab) *</label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tuliskan isi artikel. Gunakan <div class='arabic-block font-arabic text-2xl'>...</div> untuk teks Arab ber-harakat."
                className="w-full p-3 rounded border border-outline-variant/50 dark:bg-slate-800 text-xs font-mono outline-none focus:border-brass-gold"
              ></textarea>
            </div>

            <div className="p-4 bg-news-gray dark:bg-slate-800 rounded border border-outline-variant/40 space-y-2">
              <span className="font-bold block uppercase text-[11px] text-brass-gold">
                Penempatan & Flagging Beranda
              </span>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isHeadline}
                    onChange={(e) => setFormData({ ...formData, isHeadline: e.target.checked })}
                    className="text-brass-gold rounded"
                  />
                  Tampilkan di Hero Headline Utama
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isFeature}
                    onChange={(e) => setFormData({ ...formData, isFeature: e.target.checked })}
                    className="text-brass-gold rounded"
                  />
                  Tampilkan di Sub-Headline Card
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isFixedAdvice}
                    onChange={(e) => setFormData({ ...formData, isFixedAdvice: e.target.checked })}
                    className="text-brass-gold rounded"
                  />
                  Sematkan sebagai Artikel Tetap (Ilmu Syar&apos;i)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-brass-gold hover:bg-yellow-600 text-deep-navy font-bold px-6 py-2.5 rounded text-xs transition-colors uppercase tracking-wider"
              >
                {saving ? 'Menyimpan...' : 'Terbitkan Artikel ke Backend'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'PREVIEW' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-news-gray dark:bg-slate-900 p-4 rounded-lg border border-outline-variant/40">
            <span className="font-bold text-xs uppercase text-brass-gold">
              Simulasi Pratinjau Tampilan Multi-Perangkat
            </span>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setPreviewMode('DESKTOP')}
                className={`px-3 py-1.5 rounded font-bold ${
                  previewMode === 'DESKTOP' ? 'bg-deep-navy text-white' : 'bg-white text-black'
                }`}
              >
                Desktop View (1280px)
              </button>
              <button
                onClick={() => setPreviewMode('MOBILE')}
                className={`px-3 py-1.5 rounded font-bold ${
                  previewMode === 'MOBILE' ? 'bg-deep-navy text-white' : 'bg-white text-black'
                }`}
              >
                Mobile View (375px)
              </button>
            </div>
          </div>

          <div className="flex justify-center bg-slate-800 p-6 rounded-lg">
            <div
              className={`bg-white transition-all overflow-hidden rounded shadow-2xl border-4 border-slate-700 ${
                previewMode === 'MOBILE' ? 'w-[375px] h-[667px] overflow-y-auto' : 'w-full max-w-[1280px]'
              }`}
            >
              <iframe src="/" className="w-full h-[600px] border-none" title="Live Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
