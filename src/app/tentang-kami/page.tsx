'use client';

import React from 'react';
import Image from 'next/image';
import AutoTranslate from '@/components/AutoTranslate';


export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 space-y-10">
      {/* Centered Page Header matching blueprint */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-headline font-bold text-3xl md:text-5xl text-primary dark:text-white tracking-tight">
          <AutoTranslate text="Menyebarkan Tauheed & Sunnah" />
        </h1>
        <p className="text-xs md:text-sm text-on-surface-variant dark:text-gray-300 leading-relaxed">
          <AutoTranslate text="Menjadi mercusuar keilmuan Islam yang shahih, menyajikan informasi aktual dengan bingkai pemahaman salafush shalih untuk umat Islam di Nusantara dan dunia." />
        </p>
      </div>

      {/* Row 1: Profil Redaksi & Visi Misi matching blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Profil Redaksi (7 Cols) */}
        <div className="lg:col-span-7 bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="font-headline font-bold text-2xl text-primary dark:text-white">
            <AutoTranslate text="Profil Redaksi" />
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-full sm:w-48 h-48 relative rounded-md overflow-hidden bg-news-gray flex-shrink-0">
              <Image
                src="/logo-tauheed.png"
                alt="Tim Redaksi Tauheed News"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-3 flex-grow text-xs text-on-surface-variant dark:text-gray-300 leading-relaxed">
              <p>
                <AutoTranslate text="Tauheed News didirikan pada tahun 2020 oleh sekumpulan jurnalis muslim dan asatidzah yang peduli terhadap literasi informasi umat. Kami berkomitmen menyajikan berita yang tidak hanya akurat secara jurnalistik, namun juga selaras dengan nilai-nilai syariat." />
              </p>

              {/* Italic verse quote box matching blueprint */}
              <div className="p-4 rounded-md bg-news-gray dark:bg-slate-800 border-l-4 border-brass-gold italic text-primary dark:text-white leading-relaxed">
                <AutoTranslate text="&ldquo;Wahai orang-orang yang beriman, jika datang kepadamu orang fasik membawa suatu berita, maka periksalah dengan teliti...&rdquo; (QS. Al-Hujurat: 6)" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visi & Misi Dark Card (5 Cols) matching blueprint */}
        <div className="lg:col-span-5 bg-deep-navy text-white rounded-lg p-6 shadow-md border border-brass-gold/30 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-brass-gold/20 flex items-center justify-center text-brass-gold">
              <span className="material-symbols-outlined text-2xl">explore</span>
            </div>
            <h2 className="font-headline font-bold text-2xl text-white">
              <AutoTranslate text="Visi & Misi" />
            </h2>
            <ul className="space-y-3 text-xs text-gray-200">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-brass-gold text-base mt-0.5">check_circle</span>
                <span><AutoTranslate text="Menyajikan berita dunia Islam yang valid dan terpercaya." /></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-brass-gold text-base mt-0.5">check_circle</span>
                <span><AutoTranslate text="Mendakwahkan tauhid dan sunnah melalui jurnalistik." /></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-brass-gold text-base mt-0.5">check_circle</span>
                <span><AutoTranslate text="Menjadi referensi utama umat dalam menimbang informasi." /></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Row 2: Pedoman Media Siber & Hubungi Kami matching blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Pedoman Media Siber (6 Cols) */}
        <div id="pedoman" className="lg:col-span-6 bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h2 className="font-headline font-bold text-2xl text-primary dark:text-white">
              <AutoTranslate text="Pedoman Media Siber" />
            </h2>
            <p className="text-xs text-on-surface-variant dark:text-gray-300 leading-relaxed">
              <AutoTranslate text="Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB." />
            </p>
            <p className="text-xs text-on-surface-variant dark:text-gray-300 leading-relaxed">
              <AutoTranslate text="Dalam menjalankan operasionalnya, Tauheed News memegang teguh Kode Etik Jurnalistik dan Pedoman Pemberitaan Media Siber yang ditetapkan oleh Dewan Pers, serta menyelaraskannya dengan adab-adab komunikasi dalam Islam (Tabayyun)." />
            </p>
          </div>
          <div className="pt-2">
            <button className="px-5 py-2.5 rounded-md border border-primary dark:border-white text-xs font-bold text-primary dark:text-white hover:bg-news-gray transition-colors">
              <AutoTranslate text="Baca Pedoman Lengkap" />
            </button>
          </div>
        </div>

        {/* Right: Hubungi Kami (6 Cols) matching blueprint */}
        <div id="kontak" className="lg:col-span-6 bg-paper-white dark:bg-slate-900 border border-outline-variant/40 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="font-headline font-bold text-2xl text-primary dark:text-white">
            <AutoTranslate text="Hubungi Kami" />
          </h2>
          <form className="space-y-4 text-xs" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="block font-semibold text-on-surface-variant dark:text-gray-300">
                <AutoTranslate text="Nama Lengkap" />
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full p-2.5 rounded border border-outline-variant/50 dark:border-slate-700 bg-white dark:bg-slate-800 text-primary dark:text-white outline-none focus:border-brass-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-on-surface-variant dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="email@contoh.com"
                className="w-full p-2.5 rounded border border-outline-variant/50 dark:border-slate-700 bg-white dark:bg-slate-800 text-primary dark:text-white outline-none focus:border-brass-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-on-surface-variant dark:text-gray-300">
                <AutoTranslate text="Pesan" />
              </label>
              <textarea
                rows={4}
                placeholder="Tuliskan pesan Anda di sini..."
                className="w-full p-2.5 rounded border border-outline-variant/50 dark:border-slate-700 bg-white dark:bg-slate-800 text-primary dark:text-white outline-none focus:border-brass-gold"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-deep-navy hover:bg-black text-white font-bold py-3 rounded text-xs uppercase tracking-wider transition-colors"
            >
              <AutoTranslate text="Kirim Pesan" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

