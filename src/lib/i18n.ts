export type Language = 'id' | 'en' | 'ar';

export interface Translations {
  [key: string]: {
    id: string;
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Brand & Tagline
  siteTitle: {
    id: 'TAUHEED NEWS',
    en: 'TAUHEED NEWS',
    ar: 'أخبار التوحيد',
  },
  taglineTruth: {
    id: 'Kebenaran',
    en: 'Truth',
    ar: 'الحق',
  },
  taglineSunnah: {
    id: 'Sunnah',
    en: 'Sunnah',
    ar: 'السنة',
  },
  taglineInsight: {
    id: 'Wawasan',
    en: 'Insight',
    ar: 'البصيرة',
  },
  heroBannerSub: {
    id: 'Portal Berita Islam Kontemporer & Ilmu Syar\'i Berdasarkan Al-Qur\'an dan Sunnah',
    en: 'Contemporary Islamic News Portal & Sharia Knowledge Based on the Quran and Sunnah',
    ar: 'بوابة الأخبار الإسلامية المعاصرة والعلوم الشرعية على ضوء الكتاب والسنة',
  },

  // Navigation
  navHome: {
    id: 'BERANDA',
    en: 'HOME',
    ar: 'الرئيسية',
  },
  navGuidance: {
    id: 'TUNTUNAN ISLAM',
    en: 'ISLAMIC GUIDANCE',
    ar: 'الهداية الإسلامية',
  },
  navAqidah: {
    id: 'AKIDAH & TAUHID',
    en: 'AQIDAH & TAUHEED',
    ar: 'العقيدة والتوحيد',
  },
  navUlama: {
    id: 'KAJIAN ULAMA',
    en: 'SCHOLARS\' LECTURES',
    ar: 'دروس العلماء',
  },
  navWorld: {
    id: 'DUNIA ISLAM',
    en: 'ISLAMIC WORLD',
    ar: 'العالم الإسلامي',
  },
  navMiddleEast: {
    id: 'TIMUR TENGAH',
    en: 'MIDDLE EAST',
    ar: 'الشرق الأوسط',
  },
  navHistory: {
    id: 'SEJARAH ISLAM',
    en: 'ISLAMIC HISTORY',
    ar: 'التاريخ الإسلامي',
  },
  navOpinion: {
    id: 'OPINI & ANALISIS',
    en: 'OPINION & ANALYSIS',
    ar: 'آراء وتحليلات',
  },
  navSchedule: {
    id: 'JADWAL KAJIAN',
    en: 'LECTURE SCHEDULE',
    ar: 'جدول المحاضرات',
  },
  navMultimedia: {
    id: 'MULTIMEDIA',
    en: 'MULTIMEDIA',
    ar: 'الوسائط المتعددة',
  },
  navCategories: {
    id: 'KATEGORI',
    en: 'CATEGORIES',
    ar: 'التصنيفات',
  },
  navBookmarks: {
    id: 'BOOKMARK',
    en: 'BOOKMARKS',
    ar: 'المحفوظات',
  },
  navAbout: {
    id: 'Tentang Kami',
    en: 'About Us',
    ar: 'من نحن',
  },
  navMediaGuidelines: {
    id: 'Pedoman Media',
    en: 'Media Guidelines',
    ar: 'إرشادات الإعلام',
  },
  navContact: {
    id: 'Kontak',
    en: 'Contact Us',
    ar: 'اتصل بنا',
  },
  navAdmin: {
    id: 'Admin Portal',
    en: 'Admin Portal',
    ar: 'بوابة الإدارة',
  },

  // Actions & Buttons
  searchPlaceholder: {
    id: 'Cari kata kunci, topik, atau penulis...',
    en: 'Search keywords, topics, or authors...',
    ar: 'ابحث عن الكلمات المفتاحية، الموضوعات، أو الكُتّاب...',
  },
  searchBtn: {
    id: 'Cari Artikel',
    en: 'Search Articles',
    ar: 'البحث عن المقالات',
  },
  readMore: {
    id: 'Baca Selengkapnya',
    en: 'Read More',
    ar: 'اقرأ المزيد',
  },
  readArticle: {
    id: 'Baca Artikel',
    en: 'Read Article',
    ar: 'قراءة المقال',
  },
  loadMore: {
    id: 'Muat Lebih Banyak Artikel',
    en: 'Load More Articles',
    ar: 'تحميل المزيد من المقالات',
  },
  save: {
    id: 'Simpan',
    en: 'Save',
    ar: 'حفظ',
  },
  saved: {
    id: 'Tersimpan',
    en: 'Saved',
    ar: 'محفوظ',
  },
  share: {
    id: 'Bagikan',
    en: 'Share',
    ar: 'مشاركة',
  },
  back: {
    id: 'Kembali',
    en: 'Back',
    ar: 'رجوع',
  },
  close: {
    id: 'Tutup',
    en: 'Close',
    ar: 'إغلاق',
  },

  // Language & Translation Badges
  selectLanguage: {
    id: 'Pilih Bahasa',
    en: 'Select Language',
    ar: 'اختر اللغة',
  },
  autoTranslated: {
    id: 'Terjemahan Otomatis',
    en: 'Auto-Translated',
    ar: 'ترجمة آلية',
  },
  showOriginal: {
    id: 'Tampilkan Teks Asli (ID)',
    en: 'Show Original (ID)',
    ar: 'عرض النص الأصلي (ID)',
  },
  showTranslated: {
    id: 'Tampilkan Terjemahan',
    en: 'Show Translation',
    ar: 'عرض الترجمة',
  },

  // Sections & Headers
  headline: {
    id: 'Berita Utama',
    en: 'Headline News',
    ar: 'الأخبار الرئيسية',
  },
  latestArticles: {
    id: 'Artikel Terbaru',
    en: 'Latest Articles',
    ar: 'أحدث المقالات',
  },
  editorsPick: {
    id: 'Pilihan Redaksi',
    en: 'Editor\'s Pick',
    ar: 'مختارات المحرر',
  },
  fixedAdvice: {
    id: 'Nasihat Hari Ini',
    en: 'Advice of the Day',
    ar: 'نصيحة اليوم',
  },
  kajianVideo: {
    id: 'Kajian & Video Sunnah',
    en: 'Sunnah Lectures & Videos',
    ar: 'محاضرات وفيديوهات السنة',
  },
  hikmah: {
    id: 'Mutu Manikam Hikmah',
    en: 'Pearls of Wisdom',
    ar: 'درر من الحكم',
  },
  islamicWorldSection: {
    id: 'Dunia Islam & Haramain',
    en: 'Islamic World & Haramain',
    ar: 'العالم الإسلامي والحرمان',
  },
  popularArticles: {
    id: 'Artikel Populer',
    en: 'Popular Articles',
    ar: 'المقالات الأكثر قراءة',
  },
  readAlso: {
    id: 'Baca Juga',
    en: 'Read Also',
    ar: 'اقرأ أيضاً',
  },
  exploreCategories: {
    id: 'Jelajahi Kategori',
    en: 'Explore Categories',
    ar: 'استكشف التصنيفات',
  },

  // Article Details
  byAuthor: {
    id: 'Ditulis oleh',
    en: 'Written by',
    ar: 'بقلم',
  },
  publishedDate: {
    id: 'Diterbitkan',
    en: 'Published',
    ar: 'نُشر بتاريخ',
  },
  readTime: {
    id: 'Waktu Baca',
    en: 'Read Time',
    ar: 'وقت القراءة',
  },
  minutes: {
    id: 'menit',
    en: 'mins',
    ar: 'دقائق',
  },
  views: {
    id: 'dibaca',
    en: 'views',
    ar: 'مشاهدة',
  },
  relatedArticles: {
    id: 'Artikel Terkait',
    en: 'Related Articles',
    ar: 'مقالات ذات صلة',
  },

  // Search Modal
  searchTitle: {
    id: 'Pencarian Artikel Tauheed News',
    en: 'Tauheed News Article Search',
    ar: 'البحث في مقالات أخبار التوحيد',
  },
  searchResults: {
    id: 'Hasil Pencarian',
    en: 'Search Results',
    ar: 'نتائج البحث',
  },
  noResults: {
    id: 'Tidak ada artikel yang cocok dengan pencarian Anda.',
    en: 'No articles match your search.',
    ar: 'لم يتم العثور على مقالات تطابق بحثك.',
  },

  // Footer & Misc
  footerTagline: {
    id: 'Portal Berita & Edukasi Islam Berbasis Al-Qur\'an dan As-Sunnah sesuai Pemahaman Salafus Shalih.',
    en: 'Islamic News & Education Portal Based on the Quran and Sunnah according to the understanding of Salafus Salih.',
    ar: 'بوابة الإخبار والتعليم الإسلامي على ضوء الكتاب والسنة بفهم السلف الصالح.',
  },
  allRightsReserved: {
    id: 'Hak Cipta Dilindungi Undang-Undang.',
    en: 'All Rights Reserved.',
    ar: 'جميع الحقوق محفوظة.',
  },
  privacyPolicy: {
    id: 'Kebijakan Privasi',
    en: 'Privacy Policy',
    ar: 'سياسة الخصوصية',
  },
  termsOfService: {
    id: 'Syarat & Ketentuan',
    en: 'Terms of Service',
    ar: 'الشروط والأحكام',
  },
  sitemap: {
    id: 'Peta Situs',
    en: 'Sitemap',
    ar: 'خريطة الموقع',
  },
  menuTitle: {
    id: 'Menu Utama Tauheed News',
    en: 'Main Menu Tauheed News',
    ar: 'القائمة الرئيسية',
  },
};
