import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { CATEGORIES } from '../data/categories';
import { NewsCard } from '../components/NewsCard';
import { Search, ArrowLeft, Filter } from 'lucide-react';

interface SearchPageProps {
  initialQuery?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({ initialQuery = '' }) => {
  const { lang, t } = useLanguage();
  const { goToHome } = useNav();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = (q: string, cat: string) => {
    setLoading(true);
    let url = `/api/news?search=${encodeURIComponent(q)}`;
    if (cat !== 'all') {
      url += `&category=${cat}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setArticles(json.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    performSearch(query, selectedCategory);
  }, [query, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, selectedCategory);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 space-y-4">
        <button
          onClick={goToHome}
          className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 font-sans transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('home')}</span>
        </button>

        <h1 className="font-editorial-title text-3xl font-bold text-stone-950 dark:text-stone-50">
          {lang === 'bn' ? 'সংবাদ অনুসন্ধান' : 'Search International Archives'}
        </h1>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200"
          >
            <option value="all">{lang === 'bn' ? 'সকল বিভাগ' : 'All 16 Categories'}</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {lang === 'bn' ? c.nameBn : c.nameEn}
              </option>
            ))}
          </select>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs uppercase tracking-widest text-stone-400">Searching...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-stone-500">
            {lang === 'bn'
              ? `${articles.length}টি সংবাদ পাওয়া গেছে:`
              : `Found ${articles.length} verified news reports:`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <NewsCard key={art.id} article={art} variant="secondary" />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-16 text-center text-stone-500 bg-stone-100/50 dark:bg-stone-900/30 rounded-xl p-8 border border-stone-200 dark:border-stone-800">
          <Search className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-50" />
          <p className="font-semibold text-stone-800 dark:text-stone-200">
            {lang === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No articles match your search criteria'}
          </p>
          <p className="text-xs text-stone-500 mt-1">
            {lang === 'bn'
              ? 'ভিন্ন কীওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন অথবা অন্য বিভাগে অনুসন্ধান করুন।'
              : 'Try different search keywords or filter across all categories.'}
          </p>
        </div>
      )}
    </div>
  );
};
