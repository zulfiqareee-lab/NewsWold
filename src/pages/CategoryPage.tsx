import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { CATEGORIES } from '../data/categories';
import { NewsCard } from '../components/NewsCard';
import { ArrowLeft, Tag, Layers } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const { lang, t } = useLanguage();
  const { goToHome, goToCategory } = useNav();

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const category = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?category=${categorySlug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setArticles(json.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  const catName = lang === 'bn' ? category.nameBn : category.nameEn;
  const altName = lang === 'bn' ? category.nameEn : category.nameBn;
  const catDesc = lang === 'bn' ? category.descriptionBn : category.descriptionEn;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Category Masthead */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 space-y-3">
        <button
          onClick={goToHome}
          className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 font-sans transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('home')}</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-500">
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'বিশেষায়িত বিভাগ' : 'Editorial Department'}</span>
            </div>
            <h1 className="font-editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 dark:text-stone-50 mt-1">
              {catName}
            </h1>
            <p className="font-editorial-body text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              {altName}
            </p>
          </div>

          <p className="font-editorial-body text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg leading-relaxed">
            {catDesc}
          </p>
        </div>
      </div>

      {/* Category Articles */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs uppercase tracking-widest text-stone-400">Loading {catName}...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="space-y-8">
          {/* Top Lead Story if available */}
          <NewsCard article={articles[0]} variant="lead" showCategory={false} />

          {/* Remaining in grid */}
          {articles.length > 1 && (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article) => (
                <NewsCard key={article.id} article={article} variant="secondary" showCategory={false} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-stone-100/60 dark:bg-stone-900/40 rounded-xl p-8 border border-stone-200 dark:border-stone-800">
          <Tag className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-editorial-title text-xl font-bold text-stone-800 dark:text-stone-200">
            {lang === 'bn' ? 'এই বিভাগে এখনো কোনো সংবাদ প্রকাশিত হয়নি' : 'No Published Articles in this Section Yet'}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {lang === 'bn'
              ? 'আন্তর্জাতিক সংবাদ ডেস্কে নতুন ড্রাফট প্রক্রিয়াধীন রয়েছে। অ্যাডমিন ড্যাশবোর্ড থেকে এআই ড্রাফট অনুমোদন করুন।'
              : 'Our international news desk is continuously reviewing incoming feeds. Authorized administrators can generate and approve drafts in the Admin Dashboard.'}
          </p>
        </div>
      )}

      {/* Other Categories Switcher */}
      <div className="pt-10 border-t border-stone-200 dark:border-stone-800">
        <h3 className="text-xs uppercase tracking-widest font-bold text-stone-500 mb-4 font-sans">
          {lang === 'bn' ? 'অন্যান্য বিভাগসমূহ ঘুরে দেখুন:' : 'Explore Other Departments:'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.slug !== categorySlug).map((c) => (
            <button
              key={c.id}
              onClick={() => goToCategory(c.slug)}
              className="px-3 py-1.5 rounded bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors"
            >
              {lang === 'bn' ? c.nameBn : c.nameEn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
