import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { CATEGORIES } from '../data/categories';
import { Globe, Shield, BookOpen, AlertCircle, FileText, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const {
    goToHome,
    goToLatest,
    goToBreaking,
    goToTrending,
    goToMostRead,
    goToCategory,
    goToAbout,
    goToContact,
    goToPrivacy,
    goToTerms,
    goToCopyrightPolicy,
    goToCopyrightRemoval,
    goToAdmin
  } = useNav();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 px-4 md:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Masthead & Mission */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <span className="font-editorial-title text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
              NEWS WORLD
            </span>
            <p className="font-editorial-body text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
              {lang === 'bn'
                ? 'আন্তর্জাতিক দ্বিভাষিক সংবাদ ও তথ্য প্রকাশনা। কৃত্রিম বুদ্ধিমত্তা চালিত ড্রাফটিং, বহুভাষিক অনুবাদ এবং বিশ্বমানের নির্ভরযোগ্য সম্পাদকীয় চিত্রায়ণ।'
                : 'International bilingual journalistic portal. AI-assisted draft synthesis, cross-lingual translation, and rigorous human-supervised editorial verification.'}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans transition-colors"
          >
            <span>{lang === 'bn' ? 'শীর্ষে যান' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 16 Categories Grid */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-4 font-sans">
            {t('allCategories')} (16)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-2 text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => goToCategory(cat.slug)}
                className="text-left text-stone-400 hover:text-white transition-colors truncate py-0.5"
                title={lang === 'bn' ? cat.nameBn : cat.nameEn}
              >
                {lang === 'bn' ? cat.nameBn : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Legal & Editorial Guidance Disclaimers */}
        <div className="p-4 rounded-lg bg-stone-950/60 border border-stone-800 text-xs space-y-2.5 text-stone-400">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-300 font-semibold">{lang === 'bn' ? 'স্বাস্থ্য সতর্কতা: ' : 'Health Notice: '}</strong>
              {t('disclaimerHealth')}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-300 font-semibold">{lang === 'bn' ? 'ইসলামিক তথ্যসূত্র: ' : 'Islamic Knowledge: '}</strong>
              {t('disclaimerIslamic')}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-300 font-semibold">{lang === 'bn' ? 'চাকরি ও ক্যারিয়ার: ' : 'Employment Notice: '}</strong>
              {t('disclaimerJobs')}
            </p>
          </div>
        </div>

        {/* Site Links & Public Pages */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={goToHome} className="hover:text-white transition-colors">
              {t('home')}
            </button>
            <button onClick={goToLatest} className="hover:text-white transition-colors">
              {t('latestNews')}
            </button>
            <button onClick={goToBreaking} className="hover:text-white transition-colors">
              {t('breakingNews')}
            </button>
            <button onClick={goToTrending} className="hover:text-white transition-colors">
              {t('trendingNews')}
            </button>
            <button onClick={goToMostRead} className="hover:text-white transition-colors">
              {t('mostRead')}
            </button>
            <button onClick={goToAbout} className="hover:text-white transition-colors">
              {t('aboutUs')}
            </button>
            <button onClick={goToContact} className="hover:text-white transition-colors">
              {t('contactUs')}
            </button>
            <button onClick={goToPrivacy} className="hover:text-white transition-colors">
              {t('privacyPolicy')}
            </button>
            <button onClick={goToTerms} className="hover:text-white transition-colors">
              {t('termsConditions')}
            </button>
            <button onClick={goToCopyrightPolicy} className="hover:text-white transition-colors">
              {t('copyrightPolicy')}
            </button>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t('sitemap')}
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              robots.txt
            </a>
          </div>

          <button
            onClick={() => goToAdmin('overview')}
            className="text-stone-500 hover:text-stone-300 transition-colors text-[11px]"
          >
            {t('adminDashboard')}
          </button>
        </div>

        {/* Copyright notice */}
        <div className="text-center text-xs text-stone-500 pt-2 font-sans">
          {t('copyrightNotice')}
        </div>
      </div>
    </footer>
  );
};
