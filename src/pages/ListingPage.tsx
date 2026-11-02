import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { NewsCard } from '../components/NewsCard';
import { ArrowLeft, Radio, Flame, Clock, TrendingUp } from 'lucide-react';

interface ListingPageProps {
  type: 'latest' | 'breaking' | 'trending' | 'most-read';
}

export const ListingPage: React.FC<ListingPageProps> = ({ type }) => {
  const { lang, t } = useLanguage();
  const { goToHome } = useNav();

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = '/api/news';
    if (type === 'breaking') url = '/api/news?type=breaking';
    else if (type === 'trending') url = '/api/news?type=trending';

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        let items: NewsArticle[] = json.data || [];
        if (type === 'most-read') {
          items.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
        }
        setArticles(items);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [type]);

  const titles = {
    latest: {
      title: t('latestNews'),
      desc: lang === 'bn' ? 'সাম্প্রতিকতম আন্তর্জাতিক সংবাদ ও তথ্যের তাজা হালনাগাদ।' : 'Real-time global dispatches and latest verified international developments.',
      icon: Clock
    },
    breaking: {
      title: t('breakingNews'),
      desc: lang === 'bn' ? 'বিশ্বজুড়ে তাৎক্ষণিক গুরুত্বপূর্ণ আন্তর্জাতিক ঘটনা প্রবাহ।' : 'Immediate international alerts and fast-breaking diplomatic news.',
      icon: Radio
    },
    trending: {
      title: t('trendingNews'),
      desc: lang === 'bn' ? 'সর্বাধিক আলোচিত বৈজ্ঞানিক ও বৈশ্বিক বিষয়াদি।' : 'Most discussed global themes, technological shifts, and scientific breakthroughs.',
      icon: Flame
    },
    'most-read': {
      title: t('mostRead'),
      desc: lang === 'bn' ? 'পাঠকদের সর্বাধিক পঠিত ও শেয়ারকৃত সংবাদসমূহ।' : 'Most viewed articles and shared investigative reports across the globe.',
      icon: TrendingUp
    }
  };

  const currentMeta = titles[type];
  const IconComponent = currentMeta.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 space-y-3">
        <button
          onClick={goToHome}
          className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 font-sans transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('home')}</span>
        </button>

        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <IconComponent className="w-4 h-4" />
          <span className="text-xs uppercase font-bold tracking-widest font-sans">
            {type.toUpperCase()}
          </span>
        </div>

        <h1 className="font-editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 dark:text-stone-50">
          {currentMeta.title}
        </h1>

        <p className="font-editorial-body text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
          {currentMeta.desc}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs uppercase tracking-widest text-stone-400">Loading {currentMeta.title}...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <NewsCard key={art.id} article={art} variant="secondary" />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-stone-500">
          <p>No articles found for this section.</p>
        </div>
      )}
    </div>
  );
};
