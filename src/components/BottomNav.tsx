'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function BottomNav() {
  const pathname = usePathname();
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { t } = useLanguage();

  const navItems = [
    { label: t('navHome'), icon: 'home', href: '/' },
    { label: t('navCategories'), icon: 'grid_view', href: '/kategori' },
    { label: t('navVideo'), icon: 'play_circle', href: '/multimedia' },
    { label: t('navSchedule'), icon: 'menu_book', href: '/jadwal-kajian' },
    { label: t('menu'), icon: 'menu', href: '#menu' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#menu') return isMenuDrawerOpen;
    return pathname.startsWith(href);
  };

  const handleItemClick = (href: string, e: React.MouseEvent) => {
    if (href === '#menu') {
      e.preventDefault();
      setIsMenuDrawerOpen(!isMenuDrawerOpen);
    } else {
      setIsMenuDrawerOpen(false);
    }
  };

  const quickLinks = [
    { name: t('saudiNews'), href: '/kategori/saudi-arabia-terkini', icon: 'flag' },
    { name: t('islamicWorld'), href: '/kategori/dunia-islam', icon: 'public' },
    { name: t('haramainNews'), href: '/kategori/haramain-news', icon: 'mosque' },
    { name: t('fatwaLajnah'), href: '/kategori/fatwa-fikih', icon: 'gavel' },
    { name: t('islamicGuidance'), href: '/kategori/tuntunan-islam', icon: 'menu_book' },
    { name: t('sunnahLecturesVideos'), href: '/multimedia', icon: 'play_circle' },
    { name: t('aqidahTauhid'), href: '/kategori/aqidah-tauhid', icon: 'auto_stories' },
    { name: t('opinionSection'), href: '/kategori/opini', icon: 'rate_review' },
    { name: t('navBookmarks'), href: '/bookmark', icon: 'bookmark' },
    { name: t('navAbout'), href: '/tentang-kami', icon: 'info' },
    { name: t('navAdmin'), href: '/admin', icon: 'admin_panel_settings' },
  ];

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c3125] text-white border-t border-[#134635] flex items-center justify-around h-[60px] shadow-lg"
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={(e) => handleItemClick(item.href, e)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1.5 transition-colors ${
                active ? 'text-brass-gold font-bold' : 'text-gray-300 hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {isMenuDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div
            className="bg-deep-navy text-white rounded-t-2xl p-5 border-t border-brass-gold/30 shadow-2xl max-h-[85vh] overflow-y-auto space-y-5 animate-fadeInUp"
            style={{ paddingBottom: '80px' }}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-headline font-bold text-lg text-brass-gold uppercase tracking-wide">
                {t('menuTitle')}
              </h3>
              <button
                onClick={() => setIsMenuDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={t('close')}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <LanguageSelector variant="full" />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsMenuDrawerOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex-1 bg-white/10 hover:bg-brass-gold hover:text-deep-navy text-white font-bold text-xs p-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/20"
              >
                <span className="material-symbols-outlined text-base">search</span>
                {t('searchBtn')}
              </button>
              <Link
                href="/bookmark"
                onClick={() => setIsMenuDrawerOpen(false)}
                className="flex-1 bg-white/10 hover:bg-brass-gold hover:text-deep-navy text-white font-bold text-xs p-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/20"
              >
                <span className="material-symbols-outlined text-base">bookmark</span>
                {t('saved')}
              </Link>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href + link.name}
                  href={link.href}
                  onClick={() => setIsMenuDrawerOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 hover:bg-brass-gold/20 text-xs font-semibold text-gray-200 hover:text-white transition-colors border border-white/10"
                >
                  <span className="material-symbols-outlined text-brass-gold text-base">
                    {link.icon}
                  </span>
                  <span className="line-clamp-1">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
