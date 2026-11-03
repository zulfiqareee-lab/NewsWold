import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNav } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES } from '../data/categories';
import {
  Search,
  Globe2,
  Moon,
  Sun,
  ShieldCheck,
  Lock,
  ChevronDown,
  Menu,
  X,
  Volume2,
  TrendingUp,
  Flame,
  Radio
} from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, toggleLang, t, formatNumber } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { nav, goToHome, goToLatest, goToBreaking, goToTrending, goToMostRead, goToCategory, goToSearch, goToAdmin, goToAbout } = useNav();
  const { isAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);

  // Current formatted date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDateEn = today.toLocaleDateString('en-US', dateOptions);
  const formattedDateBn = today.toLocaleDateString('bn-BD', dateOptions);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      goToSearch(searchQuery.trim());
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-950 transition-colors">
      {/* Top Utility Ribbon */}
      <div className="border-b border-stone-200/70 dark:border-stone-800/80 text-xs py-1.5 px-4 md:px-8 text-stone-600 dark:text-stone-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-sans font-medium text-stone-800 dark:text-stone-200">
              {lang === 'bn' ? formattedDateBn : formattedDateEn}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="hidden sm:inline text-stone-500 dark:text-stone-400">
              {lang === 'bn' ? 'আন্তর্জাতিক সংবাদ সংস্করণ' : 'International Edition'}
            </span>
          </div>

          {/* Quick Breaking Flash */}
          <div className="hidden lg:flex items-center gap-2 overflow-hidden text-stone-600 dark:text-stone-400 truncate">
            <span className="inline-flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-[11px] shrink-0">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              {t('breakingNews')}
            </span>
            <span className="truncate">
              {lang === 'bn'
                ? 'জেনেভায় ঐতিহাসিক বহুমুখী জ্বালানি রূপান্তর চুক্তিতে পৌঁছাল ৬০ দেশ'
                : 'Sixty nations ratify Geneva Transcontinental Clean Energy Compact'}
            </span>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-2 py-0.5 rounded text-xs font-medium bg-stone-200/70 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
              title={lang === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
            >
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-1 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Admin Portal Gateway */}
            <button
              onClick={() => goToAdmin('overview')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans transition-colors ${
                isAdmin
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title={isAdmin ? 'Admin Console (Logged In)' : 'Admin Login (Restricted)'}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">Admin Console</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                  <span className="hidden sm:inline font-medium">
                    {lang === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Login'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Masthead / Wordmark Bar */}
      <div className="py-5 px-4 md:px-8 border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Brand Wordmark (Zone 1) */}
          <div className="flex flex-col cursor-pointer" onClick={goToHome}>
            <h1 className="font-editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-50 uppercase">
              NEWS WORLD
            </h1>
            <p className="font-editorial-body italic text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              {t('siteTagline')}
            </p>
          </div>

          {/* Search & Actions Bar (Zone 3) */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-56 md:w-72 pl-8 pr-3 py-1.5 text-xs rounded-md bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Input Strip */}
      {searchOpen && (
        <div className="sm:hidden p-3 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="flex-1 px-3 py-2 text-sm rounded bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded"
            >
              {t('search')}
            </button>
          </form>
        </div>
      )}

      {/* Desktop Main Navigation Bar (Clean Editorial Links) */}
      <nav className="hidden lg:block border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 py-2.5 text-xs font-medium tracking-wide uppercase font-sans">
              <button
                onClick={goToHome}
                className={`transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-400 ${
                  nav.view === 'home'
                    ? 'font-bold text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 pb-0.5'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {t('home')}
              </button>

              <button
                onClick={goToLatest}
                className={`transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-400 ${
                  nav.view === 'latest'
                    ? 'font-bold text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 pb-0.5'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {t('latestNews')}
              </button>

              <button
                onClick={goToBreaking}
                className={`transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-400 ${
                  nav.view === 'breaking'
                    ? 'font-bold text-rose-700 dark:text-rose-400 border-b-2 border-rose-700 pb-0.5'
                    : 'text-rose-600 dark:text-rose-400 font-semibold'
                }`}
              >
                {t('breakingNews')}
              </button>

              <button
                onClick={goToTrending}
                className={`transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-400 ${
                  nav.view === 'trending'
                    ? 'font-bold text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 pb-0.5'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {t('trendingNews')}
              </button>

              <button
                onClick={goToMostRead}
                className={`transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-400 ${
                  nav.view === 'most-read'
                    ? 'font-bold text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 pb-0.5'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {t('mostRead')}
              </button>

              <button
                onClick={goToAbout}
                className={`transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-400 ${
                  nav.view === 'about'
                    ? 'font-bold text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 pb-0.5'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {t('aboutUs')}
              </button>
            </div>

            {/* Quick 16 Categories Dropdown trigger */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdown(!categoriesDropdown)}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
              >
                <span>{t('allCategories')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {categoriesDropdown && (
                <div
                  className="absolute right-0 top-full mt-1 w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl rounded-lg p-3 z-50 grid grid-cols-2 gap-1.5"
                  onMouseLeave={() => setCategoriesDropdown(false)}
                >
                  {CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        goToCategory(cat.slug);
                        setCategoriesDropdown(false);
                      }}
                      className="text-left px-2.5 py-2 rounded text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex flex-col"
                    >
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {lang === 'bn' ? cat.nameBn : cat.nameEn}
                      </span>
                      <span className="text-[10px] text-stone-500 truncate">
                        {lang === 'bn' ? cat.nameEn : cat.nameBn}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 16 Categories Horizontal Scroll Rail */}
      <div className="border-b border-stone-200/60 dark:border-stone-800/60 bg-stone-100/60 dark:bg-stone-900/40 overflow-x-auto scrollbar-none py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs whitespace-nowrap">
          <span className="font-sans font-bold uppercase text-[10px] tracking-widest text-stone-400 dark:text-stone-500 shrink-0">
            {lang === 'bn' ? 'বিভাগসমূহ:' : 'SECTIONS:'}
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = nav.view === 'category' && nav.categorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => goToCategory(cat.slug)}
                className={`px-2 py-0.5 rounded transition-colors text-xs shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                }`}
              >
                {lang === 'bn' ? cat.nameBn : cat.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-950 p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => { goToHome(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {t('home')}
            </button>
            <button
              onClick={() => { goToLatest(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {t('latestNews')}
            </button>
            <button
              onClick={() => { goToBreaking(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded text-rose-600 font-bold hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {t('breakingNews')}
            </button>
            <button
              onClick={() => { goToTrending(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {t('trendingNews')}
            </button>
            <button
              onClick={() => { goToMostRead(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {t('mostRead')}
            </button>
            <button
              onClick={() => { goToAbout(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {t('aboutUs')}
            </button>
          </div>

          <div className="border-t border-stone-200 dark:border-stone-800 pt-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500 mb-2">
              {t('allCategories')}
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    goToCategory(cat.slug);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1.5 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300"
                >
                  {lang === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
