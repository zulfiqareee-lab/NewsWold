import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  formatNumber: (n: number) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    siteName: 'NEWS WORLD',
    siteTagline: 'International AI-Automated Bilingual News Portal',
    home: 'Home',
    latestNews: 'Latest News',
    breakingNews: 'Breaking News',
    trendingNews: 'Trending News',
    mostRead: 'Most Read',
    categories: 'Categories',
    search: 'Search',
    searchPlaceholder: 'Search international news, topics, keywords...',
    adminDashboard: 'Admin Dashboard',
    adminLogin: 'Admin Portal',
    readMore: 'Read Full Report',
    readingTime: 'min read',
    publishedOn: 'Published',
    source: 'Original Source',
    verifiedSource: 'Verified International Source',
    unverifiedSource: 'Unverified Source - Pending Review',
    share: 'Share',
    listenArticle: 'Listen to Article',
    pauseAudio: 'Pause Audio',
    resumeAudio: 'Resume Audio',
    stopAudio: 'Stop Audio',
    fontSize: 'Font Size',
    relatedNews: 'Related News',
    weatherTitle: 'Global Weather',
    currencyTitle: 'Forex Rates',
    aiGeneratedImage: 'AI Generated Illustration',
    aiImagePrompt: 'AI Generation Prompt',
    aiModel: 'Model',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    copyrightPolicy: 'Copyright Policy',
    copyrightComplaint: 'Content Removal & DMCA',
    sitemap: 'Sitemap XML',
    allCategories: 'All 16 Categories',
    featuredStory: 'Lead Investigation',
    quickUpdates: 'Quick Updates',
    topStories: 'Top International Stories',
    disclaimerHealth: 'Health articles are for educational purposes only and do not substitute medical advice.',
    disclaimerIslamic: 'Islamic knowledge content is referenced from verified Quranic verses and authentic Hadith.',
    disclaimerJobs: 'Job circulars are sourced from verified official employers. Always verify deadlines at the official portal.',
    copyrightNotice: '© 2026 NEWS WORLD. All rights reserved. Original bilingual synthesis and AI editorial illustrations.',
    switchLanguage: 'বাংলায় পড়ুন',
    facebookPostLimit: 'Daily Facebook Posts',
    remainingSlots: 'Remaining Slots Today'
  },
  bn: {
    siteName: 'নিউজ ওয়ার্ল্ড',
    siteTagline: 'আন্তর্জাতিক কৃত্রিম বুদ্ধিমত্তা চালিত দ্বিভাষিক সংবাদ মাধ্যম',
    home: 'হোম',
    latestNews: 'তাজা সংবাদ',
    breakingNews: 'ব্রেকিং নিউজ',
    trendingNews: 'আলোচিত সংবাদ',
    mostRead: 'সর্বাধিক পঠিত',
    categories: 'বিভাগসমূহ',
    search: 'অনুসন্ধান',
    searchPlaceholder: 'আন্তর্জাতিক সংবাদ, বিষয় বা কীওয়ার্ড খুঁজুন...',
    adminDashboard: 'অ্যাডমিন ড্যাশবোর্ড',
    adminLogin: 'অ্যাডমিন পোর্টাল',
    readMore: 'সম্পূর্ণ পড়ুন',
    readingTime: 'মিনিট পাঠ',
    publishedOn: 'প্রকাশিত',
    source: 'মূল উৎস',
    verifiedSource: 'যাচাইকৃত আন্তর্জাতিক উৎস',
    unverifiedSource: 'অযাচাইকৃত উৎস - পর্যালোচনাধীন',
    share: 'শেয়ার করুন',
    listenArticle: 'সংবাদ শুনুন',
    pauseAudio: 'পজ করুন',
    resumeAudio: 'চালিয়ে যান',
    stopAudio: 'থামুন',
    fontSize: 'ফন্টের আকার',
    relatedNews: 'সম্পর্কিত সংবাদ',
    weatherTitle: 'বিশ্ব আবহাওয়া',
    currencyTitle: 'মুদ্রা বিনিময় হার',
    aiGeneratedImage: 'এআই নির্মিত চিত্রায়ণ',
    aiImagePrompt: 'এআই প্রম্পট বিবরণ',
    aiModel: 'মডেল',
    aboutUs: 'আমাদের সম্পর্কে',
    contactUs: 'যোগাযোগ',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsConditions: 'শর্তাবলী ও নিয়মাবলী',
    copyrightPolicy: 'কপিরাইট নীতিমালা',
    copyrightComplaint: 'কপিরাইট অভিযোগ ও অপসারণ',
    sitemap: 'সাইটম্যাপ এক্সএমএল',
    allCategories: 'সকল ১৬টি বিভাগ',
    featuredStory: 'প্রধান আন্তর্জাতিক খবর',
    quickUpdates: 'সংক্ষিপ্ত খবর',
    topStories: 'শীর্ষ আন্তর্জাতিক সংবাদ',
    disclaimerHealth: 'স্বাস্থ্য বিষয়ক সকল তথ্য কেবলমাত্র শিক্ষামূলক এবং কোনো বিশেষজ্ঞ চিকিৎসার বিকল্প নয়।',
    disclaimerIslamic: 'সকল ইসলামিক বিষয়াদি পবিত্র কুরআনের আয়াত ও নির্ভরযোগ্য সহীহ হাদিস দ্বারা সমর্থিত।',
    disclaimerJobs: 'চাকরির সকল তথ্য সরাসরি অফিসিয়াল নিয়োগকারী সংস্থা থেকে সংগৃহীত। আবেদনের পূর্বে মূল সাইট যাচাই করুন।',
    copyrightNotice: '© ২০২৬ নিউজ ওয়ার্ল্ড। সর্বস্বত্ব সংরক্ষিত। আন্তর্জাতিক সংবাদ সংকলন ও এআই চিত্রায়ণ।',
    switchLanguage: 'Read in English',
    facebookPostLimit: 'দৈনিক ফেসবুক পোস্ট কোটা',
    remainingSlots: 'আজকের অবশিষ্ট স্লট'
  }
};

const BENGALI_DIGITS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
  formatNumber: (n) => String(n)
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('nw_lang');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('nw_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
  };

  const formatNumber = (n: number): string => {
    if (lang === 'en') return String(n);
    return String(n).replace(/[0-9]/g, (w) => BENGALI_DIGITS[w] || w);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
