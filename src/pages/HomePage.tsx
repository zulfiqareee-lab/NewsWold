import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { NewsCard } from '../components/NewsCard';
import { WeatherCurrencyRibbon } from '../components/WeatherCurrencyRibbon';
import { CATEGORIES } from '../data/categories';
import { Sparkles, Radio, TrendingUp, Flame, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { lang, t, formatNumber } = useLanguage();
  const { goToLatest, goToBreaking, goToTrending, goToMostRead, goToCategory, goToArticle } = useNav();

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setArticles(json.data);
      })
      .catch((err) => console.error('Failed to load articles:', err))
      .finally(() => setLoading(false));
  }, []);

  // Split into editorial tiers
  const leadStory = articles.find((a) => a.isFeatured) || articles[0];
  const secondaryStories = articles.filter((a) => a.id !== leadStory?.id).slice(0, 3);
  const trendingStories = articles.filter((a) => a.isTrending || a.viewsCount > 5000).slice(0, 5);
  const breakingStories = articles.filter((a) => a.isBreaking);

  // Group news by category for selected highlight blocks
  const scienceNews = articles.filter((a) => a.categorySlug === 'science' || a.categorySlug === 'space-astronomy').slice(0, 3);
  const techAiNews = articles.filter((a) => a.categorySlug === 'technology' || a.categorySlug === 'ai-innovation').slice(0, 3);
  const lifestyleJobsNews = articles.filter((a) => a.categorySlug === 'jobs-careers' || a.categorySlug === 'education' || a.categorySlug === 'islamic-knowledge').slice(0, 3);
  const climateWorldNews = articles.filter((a) => a.categorySlug === 'international-news' || a.categorySlug === 'environment-climate').slice(0, 3);

  return (
    <div className="space-y-8 pb-16">
      {/* Weather & Currency Live Bar */}
      <WeatherCurrencyRibbon />

      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Tier 1: Front-Page Hero & Lead Salience */}
        <section className="pt-2">
          {leadStory && (
            <NewsCard article={leadStory} variant="lead" />
          )}
        </section>

        {/* Tier 2: Secondary Features Grid + Trending Rail */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Main 2-Col Secondary Stream (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-editorial-title text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>{t('topStories')}</span>
              </h2>
              <button
                onClick={goToLatest}
                className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 flex items-center gap-1 transition-colors uppercase tracking-wider font-sans"
              >
                <span>{t('latestNews')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryStories.map((story) => (
                <NewsCard key={story.id} article={story} variant="secondary" />
              ))}
            </div>
          </div>

          {/* Right Rail: Trending & Most Read (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-lg bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <h3 className="font-editorial-title text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span>{t('trendingNews')}</span>
                </h3>
                <button
                  onClick={goToTrending}
                  className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 uppercase tracking-wider"
                >
                  {lang === 'bn' ? 'সব দেখুন' : 'View All'}
                </button>
              </div>

              <div className="space-y-1">
                {trendingStories.map((story, idx) => (
                  <div key={story.id} className="flex gap-3 items-start py-2.5 border-b border-stone-200/50 dark:border-stone-800/50 last:border-b-0">
                    <span className="font-editorial-title text-xl font-bold text-stone-300 dark:text-stone-700 font-serif">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <NewsCard article={story} variant="compact" showCategory={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Constitution Trust Note */}
            <div className="p-4 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-stone-700 dark:text-stone-300 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>{lang === 'bn' ? 'নিউজ ওয়ার্ল্ড সম্পাদকীয় অঙ্গীকার' : 'NEWS WORLD Editorial Pledge'}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
                {lang === 'bn'
                  ? 'আমরা কোনো ওয়েবসাইট থেকে সরাসরি সংবাদ অনুলিপি করি না। প্রতিটি সংবাদ নির্ভরযোগ্য বহুপাক্ষিক উৎস থেকে সংগৃহীত তথ্যের ভিত্তিতে মৌলিকভাবে অনূদিত ও মানব-সম্পাদকের অনুমোদনক্রমে প্রকাশিত হয়।'
                  : 'We never copy articles verbatim from third-party websites. Every report is synthesized originally from accredited international wires and published strictly upon human editorial approval.'}
              </p>
            </div>
          </aside>
        </section>

        {/* Tier 3: Category Department Showcases */}

        {/* 1. Science & Deep Space */}
        <section className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-400">Department</span>
              <h2 className="font-editorial-title text-2xl font-bold text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'বিজ্ঞান ও মহাকাশ গবেষণা' : 'Science & Deep Space'}
              </h2>
            </div>
            <button
              onClick={() => goToCategory('space-astronomy')}
              className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>{lang === 'bn' ? 'আরও পড়ুন' : 'Explore Section'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scienceNews.map((art) => (
              <NewsCard key={art.id} article={art} variant="secondary" />
            ))}
          </div>
        </section>

        {/* 2. AI, Robotics & Technology */}
        <section className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-400">Department</span>
              <h2 className="font-editorial-title text-2xl font-bold text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'কৃত্রিম বুদ্ধিমত্তা ও উদ্ভাবন' : 'AI, Robotics & Innovation'}
              </h2>
            </div>
            <button
              onClick={() => goToCategory('ai-innovation')}
              className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>{lang === 'bn' ? 'আরও পড়ুন' : 'Explore Section'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techAiNews.map((art) => (
              <NewsCard key={art.id} article={art} variant="secondary" />
            ))}
          </div>
        </section>

        {/* 3. Global Careers, Education & Islamic Knowledge */}
        <section className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-400">Department</span>
              <h2 className="font-editorial-title text-2xl font-bold text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'জ্ঞান, নীতিশাস্ত্র ও কর্মসংস্থান' : 'Careers, Knowledge & Ethics'}
              </h2>
            </div>
            <button
              onClick={() => goToCategory('jobs-careers')}
              className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>{lang === 'bn' ? 'আরও পড়ুন' : 'Explore Section'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifestyleJobsNews.map((art) => (
              <NewsCard key={art.id} article={art} variant="secondary" />
            ))}
          </div>
        </section>

        {/* All 16 Category Quick Navigator Banner */}
        <section className="p-6 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-editorial-title text-xl font-bold text-stone-950 dark:text-stone-50">
              {lang === 'bn' ? 'সকল ১৬টি বিশেষায়িত আন্তর্জাতিক বিভাগ' : 'All 16 Specialized International News Categories'}
            </h3>
            <span className="text-xs text-stone-500">
              {lang === 'bn' ? 'যেকোনো বিভাগে ক্লিক করে বিস্তারিত সংবাদ পড়ুন' : 'Click any section to filter news'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => goToCategory(cat.slug)}
                className="p-2.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 hover:border-amber-500 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 text-left transition-colors flex flex-col justify-between"
              >
                <span className="font-semibold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                  {lang === 'bn' ? cat.nameBn : cat.nameEn}
                </span>
                <span className="text-[10px] text-stone-500 line-clamp-1 mt-1">
                  {lang === 'bn' ? cat.nameEn : cat.nameBn}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
