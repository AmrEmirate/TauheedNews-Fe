'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: 'public', label: 'Facebook', href: '#' },
    { icon: 'play_circle', label: 'YouTube', href: '#' },
    { icon: 'close', label: 'X / Twitter', href: '#' },
    { icon: 'photo_camera', label: 'Instagram', href: '#' },
    { icon: 'send', label: 'Telegram', href: '#' },
    { icon: 'mail', label: 'Email', href: '#' },
  ];

  return (
    <footer className="bg-deep-navy text-white mt-auto border-t-4 border-brass-gold mb-0 md:mb-0">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Desktop: 4 column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/logo-tauheed.png"
                  alt="Tauheed News Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-headline font-bold text-white tracking-wide">
                {t('siteTitle')}
              </h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {t('footerTagline')}
            </p>
            <div className="pt-2">
              <button
                aria-label={t('share')}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brass-gold hover:text-deep-navy transition-colors text-white"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
              </button>
            </div>
          </div>

          {/* Col 2: Menu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-brass-gold uppercase tracking-wider">
              MENU
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-brass-gold transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link href="/kategori/tuntunan-islam" className="hover:text-brass-gold transition-colors">
                  {t('navGuidance')}
                </Link>
              </li>
              <li>
                <Link href="/kategori/aqidah-tauhid" className="hover:text-brass-gold transition-colors">
                  {t('navAqidah')}
                </Link>
              </li>
              <li>
                <Link href="/kategori/ulama-warisan-ilmu" className="hover:text-brass-gold transition-colors">
                  {t('navUlama')}
                </Link>
              </li>
              <li>
                <Link href="/kategori/dunia-islam" className="hover:text-brass-gold transition-colors">
                  {t('navWorld')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Informasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-brass-gold uppercase tracking-wider">
              {t('information')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/tentang-kami" className="hover:text-brass-gold transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#redaksi" className="hover:text-brass-gold transition-colors">
                  {t('editorialBoard')}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#pedoman" className="hover:text-brass-gold transition-colors">
                  {t('navMediaGuidelines')}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#kontak" className="hover:text-brass-gold transition-colors">
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dukung Dakwah & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-brass-gold uppercase tracking-wider">
              {t('supportDakwah')}
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {t('supportDakwahDesc')}
            </p>
            <button className="w-full bg-brass-gold hover:bg-yellow-600 text-deep-navy font-bold text-xs py-2.5 rounded uppercase tracking-wider transition-colors">
              {t('donateNow')}
            </button>

            <div className="pt-2 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                {t('newsletter')}
              </h5>
              <p className="text-[11px] text-gray-300">
                {t('newsletterFooterDesc')}
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <input
                  suppressHydrationWarning
                  type="email"
                  placeholder={t('searchPlaceholder')}
                  className="w-full text-xs p-2.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-brass-gold"
                />
                <button
                  type="submit"
                  className="w-full bg-deep-green hover:bg-green-950 text-white text-xs font-bold py-2 rounded border border-brass-gold/50 transition-colors uppercase tracking-wider"
                >
                  {t('subscribeBtn')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ===== MOBILE FOOTER ===== */}
        <div className="md:hidden space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src="/logo-tauheed.png"
                alt="Tauheed News Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-headline font-bold text-white tracking-wide">
                {t('siteTitle')}
              </h3>
              <p className="text-[11px] text-gray-300">
                {t('footerTagline')}
              </p>
            </div>
          </div>

          {/* Social icons row */}
          <div className="flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brass-gold hover:text-deep-navy transition-colors text-white"
              >
                <span className="material-symbols-outlined text-[16px]">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Tauheed News. {t('allRightsReserved')}</p>
          <div className="hidden md:flex space-x-4 rtl:space-x-reverse">
            <Link href="/tentang-kami#privasi" className="hover:text-brass-gold">
              {t('privacyPolicy')}
            </Link>
            <span>|</span>
            <Link href="/tentang-kami#syarat" className="hover:text-brass-gold">
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
