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
  navVideo: {
    id: 'VIDEO',
    en: 'VIDEO',
    ar: 'فيديو',
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
  headerVerseTranslation: {
    id: '"Dan ini adalah jalan-Ku yang lurus, maka ikutilah dia." (QS. Al-An\'am: 153)',
    en: '"And [moreover], this is My path, which is straight, so follow it." (QS. Al-An\'am: 153)',
    ar: '"وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ" (سورة الأنعام: ١٥٣)',
  },
  textSize: {
    id: 'Ukuran Teks:',
    en: 'Text Size:',
    ar: 'حجم النص:',
  },
  tags: {
    id: 'TAGAR',
    en: 'TAGS',
    ar: 'الوسوم',
  },
  linkCopied: {
    id: 'Link disalin!',
    en: 'Link copied!',
    ar: 'تم نسخ الرابط!',
  },
  freeEbookTitle: {
    id: 'E-Book Gratis',
    en: 'Free E-Book',
    ar: 'كتب إلكترونية مجانية',
  },
  freeEbookDesc: {
    id: 'Dapatkan berbagai e-book bermanfaat untuk memperkuat ilmu dan keimanan Anda.',
    en: 'Get various beneficial e-books to strengthen your knowledge and faith.',
    ar: 'احصل على كتب إلكترونية مفيدة لتعزيز علمك وإيمانك.',
  },
  downloadNow: {
    id: 'Unduh Sekarang',
    en: 'Download Now',
    ar: 'تحميل الآن',
  },
  newsletterTitle: {
    id: 'Langganan Buletin Tauheed News',
    en: 'Subscribe to Tauheed News Bulletin',
    ar: 'النشرة الإخبارية لأخبار التوحيد',
  },
  newsletterDesc: {
    id: 'Dapatkan rangkuman artikel terbaru & faedah ilmu syar\'i langsung ke email Anda.',
    en: 'Get summaries of latest articles & sharia knowledge straight to your email.',
    ar: 'احصل على ملخص أحدث المقالات والفوائد الشرعية مباشرة إلى بريدك.',
  },
  subscribeFree: {
    id: 'Daftar Gratis',
    en: 'Subscribe Free',
    ar: 'اشترك مجاناً',
  },
  information: {
    id: 'INFORMASI',
    en: 'INFORMATION',
    ar: 'معلومات',
  },
  editorialBoard: {
    id: 'Dewan Redaksi',
    en: 'Editorial Board',
    ar: 'هيئة التحرير',
  },
  supportDakwah: {
    id: 'DUKUNG DAKWAH',
    en: 'SUPPORT DAKWAH',
    ar: 'دعم الدعوة',
  },
  supportDakwahDesc: {
    id: 'Mari bersama mendukung dakwah Tauhid dan Sunnah. Setiap kontribusi Anda sangat berarti bagi umat.',
    en: 'Let us support the call of Tauheed and Sunnah together. Every contribution matters.',
    ar: 'دعونا ندعم دعوة التوحيد والسنة معا. كل مساهمة لها قيمة كبيرة.',
  },
  donateNow: {
    id: 'DONASI SEKARANG',
    en: 'DONATE NOW',
    ar: 'تبرع الآن',
  },
  newsletter: {
    id: 'Newsletter',
    en: 'Newsletter',
    ar: 'النشرة الإخبارية',
  },
  newsletterFooterDesc: {
    id: 'Dapatkan update artikel terbaru langsung ke email Anda.',
    en: 'Get the latest article updates directly to your email.',
    ar: 'احصل على آخر تحديثات المقالات مباشرة إلى بريدك الإلكتروني.',
  },
  subscribeBtn: {
    id: 'BERLANGGANAN',
    en: 'SUBSCRIBE',
    ar: 'اشتراك',
  },
  prevSlide: {
    id: 'Slide sebelumnya',
    en: 'Previous slide',
    ar: 'الشريحة السابقة',
  },
  nextSlide: {
    id: 'Slide selanjutnya',
    en: 'Next slide',
    ar: 'الشريحة التالية',
  },
  menu: {
    id: 'MENU',
    en: 'MENU',
    ar: 'القائمة',
  },
  emailInputPlaceholder: {
    id: 'Masukkan email Anda...',
    en: 'Enter your email address...',
    ar: 'أدخل بريدك الإلكتروني...',
  },
};

export function translateCategory(
  category: { name: string; slug?: string } | string | null | undefined,
  lang: Language = 'id'
): string {
  if (!category) return '';
  const catName = typeof category === 'string' ? category : category.name;
  const catSlug = typeof category === 'object' && category.slug ? category.slug : '';

  const categoryMap: Record<string, { id: string; en: string; ar: string }> = {
    'tuntunan-islam': { id: 'Tuntunan Islam', en: 'Islamic Guidance', ar: 'الهداية الإسلامية' },
    'aqidah-tauhid': { id: 'Aqidah & Tauhid', en: 'Aqidah & Tauheed', ar: 'العقيدة والتوحيد' },
    'ulama-warisan-ilmu': { id: 'Ulama & Warisan Ilmu', en: 'Scholars & Knowledge', ar: 'دروس العلماء' },
    'dunia-islam': { id: 'Dunia Islam', en: 'Islamic World', ar: 'العالم الإسلامي' },
    'haramain-news': { id: 'Haramain & Umrah', en: 'Haramain & Umrah', ar: 'الحرمين والعمرة' },
    'kajian-kitab': { id: 'Sejarah Islam & Kitab', en: 'Islamic History & Books', ar: 'التاريخ الإسلامي' },
    'fatwa-fikih': { id: 'Opini & Fatwa Fikih', en: 'Opinion & Fiqh Fatwa', ar: 'آراء وتحليلات' },
    'analisis-klarifikasi': { id: 'Analisis & Klarifikasi', en: 'Analysis & Clarification', ar: 'تحليل وتوضيح' },
    'saudi-arabia-terkini': { id: 'Saudi Arabia Terkini', en: 'Saudi Arabia News', ar: 'أخبار المملكة العربية السعودية' },
    'diplomasi-kerja-sama': { id: 'Diplomasi & Kerja Sama', en: 'Diplomacy & Cooperation', ar: 'الدبلوماسية والتعاون' },
    'bantuan-kemanusiaan': { id: 'Bantuan Kemanusiaan', en: 'Humanitarian Aid', ar: 'المساعدات الإنسانية' },
    'vision-2030-proyek': { id: 'Vision 2030 & Proyek', en: 'Vision 2030 & Projects', ar: 'رؤية 2030 والمشاريع' },
  };

  if (catSlug && categoryMap[catSlug]) {
    return categoryMap[catSlug][lang] || categoryMap[catSlug].id;
  }

  const nameLower = catName.toLowerCase();
  for (const key of Object.keys(categoryMap)) {
    const item = categoryMap[key];
    if (
      item.id.toLowerCase() === nameLower ||
      item.en.toLowerCase() === nameLower ||
      item.ar === catName
    ) {
      return item[lang] || item.id;
    }
  }

  return catName;
}
