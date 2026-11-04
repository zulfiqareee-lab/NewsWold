import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { SafeImage } from './common/SafeImage';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'lead' | 'secondary' | 'compact' | 'horizontal';
  showCategory?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  variant = 'secondary',
  showCategory = true
}) => {
  const { lang, t, formatNumber } = useLanguage();
  const { goToArticle, goToCategory } = useNav();

  const headline = lang === 'bn' ? article.headlineBn : article.headlineEn;
  const summary = lang === 'bn' ? article.summaryBn : article.summaryEn;
  const authorName = lang === 'bn' ? article.author.nameBn : article.author.nameEn;

  // Format date
  const pubDate = new Date(article.publishedAt || article.createdAt);
  const formattedDate = pubDate.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    month: 'short',
    day: 'numeric'
  });

  const handleCardClick = () => {
    goToArticle(article.id);
  };

  // Lead Feature Variant (Large Front Page Dominant Anchor)
  if (variant === 'lead') {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-stone-200 dark:border-stone-800"
      >
        <div className="lg:col-span-7 overflow-hidden rounded-xl bg-stone-900 aspect-[16/9] relative shadow-md">
          <SafeImage
            src={article.featuredImage?.url}
            alt={lang === 'bn' ? article.featuredImage?.altTextBn : article.featuredImage?.altTextEn}
            categorySlug={article.categorySlug}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />

          {/* Discreet AI image label */}
          {article.featuredImage?.isAiGenerated && (
            <div className="absolute bottom-2.5 left-2.5 px-2 py-1 bg-black/80 backdrop-blur-sm text-stone-200 text-[10px] rounded-md flex items-center gap-1.5 shadow">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>{t('aiGeneratedImage')}</span>
            </div>
          )}

          {article.isBreaking && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-md shadow-md animate-pulse">
              {lang === 'bn' ? 'ব্রেকিং নিউজ' : 'BREAKING NEWS'}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {showCategory && (
              <div className="flex items-center gap-2 mb-2">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCategory(article.categorySlug);
                  }}
                  className="font-bold text-xs uppercase tracking-widest text-amber-700 dark:text-amber-500 hover:underline"
                >
                  {article.categorySlug.replace('-', ' ')}
                </span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-xs text-stone-500">{formattedDate}</span>
              </div>
            )}

            <h2 className="font-editorial-title text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 dark:text-stone-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors leading-tight mb-3">
              {headline}
            </h2>

            <p className="font-editorial-body text-sm sm:text-base text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed mb-4">
              {summary}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              {authorName}
            </span>
            <div className="flex items-center gap-1.5 text-stone-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate max-w-[140px]">{article.source.name}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Horizontal Card Variant (used in lists and sidebars)
  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer flex gap-4 py-3 border-b border-stone-200/60 dark:border-stone-800/60"
      >
        <div className="w-24 sm:w-32 aspect-[4/3] rounded-lg overflow-hidden bg-stone-900 shrink-0 relative shadow-sm">
          <SafeImage
            src={article.featuredImage?.url}
            alt={headline}
            categorySlug={article.categorySlug}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
              <span className="uppercase font-semibold tracking-wider text-stone-800 dark:text-stone-200">
                {article.categorySlug.replace('-', ' ')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formattedDate}</span>
            </div>

            <h4 className="font-editorial-title text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {headline}
            </h4>
          </div>

          <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-1">
            <span className="truncate">{article.source.name}</span>
          </div>
        </div>
      </article>
    );
  }

  // Compact Variant (Text-first, sidebar, high density)
  if (variant === 'compact') {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer py-3 border-b border-stone-200/50 dark:border-stone-800/50"
      >
        <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
          <span className="font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            {article.categorySlug.replace('-', ' ')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{formattedDate}</span>
        </div>

        <h4 className="font-editorial-title text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors leading-snug">
          {headline}
        </h4>
      </article>
    );
  }

  // Default Standard Secondary Card Variant
  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col justify-between h-full pb-4 border-b border-stone-200 dark:border-stone-800"
    >
      <div>
        <div className="overflow-hidden rounded-xl bg-stone-900 aspect-[16/9] mb-3 relative shadow-sm">
          <SafeImage
            src={article.featuredImage?.url}
            alt={headline}
            categorySlug={article.categorySlug}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {article.featuredImage?.isAiGenerated && (
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm text-stone-200 text-[9px] rounded flex items-center gap-1">
              <Sparkles className="w-2 h-2 text-amber-300" />
              <span>{t('aiGeneratedImage')}</span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1.5">
          {showCategory && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                goToCategory(article.categorySlug);
              }}
              className="font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 hover:text-amber-700 transition-colors"
            >
              {article.categorySlug.replace('-', ' ')}
            </span>
          )}
          <span aria-hidden="true">·</span>
          <span>{formattedDate}</span>
        </div>

        <h3 className="font-editorial-title text-lg sm:text-xl font-bold text-stone-950 dark:text-stone-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
          {headline}
        </h3>

        <p className="font-editorial-body text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
          {summary}
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-200/50 dark:border-stone-800/50">
        <span className="truncate max-w-[150px]">{article.source.name}</span>
        <span>{formatNumber(article.readingTimeMinutes)} {t('readingTime')}</span>
      </div>
    </article>
  );
};
