import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { Sparkles, CheckCircle2, Share2, Clock, Globe } from 'lucide-react';

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
  const [imageError, setImageError] = useState(false);

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
        <div className="lg:col-span-7 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900 aspect-[16/9] relative">
          {!imageError && article.featuredImage?.url ? (
            <img
              src={article.featuredImage.url}
              alt={lang === 'bn' ? article.featuredImage.altTextBn : article.featuredImage.altTextEn}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-400 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800">
              <Globe className="w-12 h-12 mb-2 opacity-50" />
              <span className="text-xs uppercase tracking-wider font-semibold">NEWS WORLD Editorial</span>
            </div>
          )}

          {/* Discreet AI image label */}
          {article.featuredImage?.isAiGenerated && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/75 backdrop-blur-sm text-stone-200 text-[10px] rounded flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>{t('aiGeneratedImage')}</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
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
            <span aria-hidden="true">·</span>
            <span>{formatNumber(article.readingTimeMinutes)} {t('readingTime')}</span>
          </div>

          <h2 className="font-editorial-title text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-stone-950 dark:text-stone-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
            {headline}
          </h2>

          <p className="font-editorial-body text-sm sm:text-base text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed">
            {summary}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-200/50 dark:border-stone-800/50">
            <span className="font-medium text-stone-700 dark:text-stone-300 truncate max-w-[200px]">
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
        <div className="w-24 sm:w-32 aspect-[4/3] rounded overflow-hidden bg-stone-100 dark:bg-stone-900 shrink-0 relative">
          {!imageError && article.featuredImage?.url ? (
            <img
              src={article.featuredImage.url}
              alt={headline}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
              <Globe className="w-5 h-5 text-stone-400" />
            </div>
          )}
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
            <span>{article.source.name}</span>
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
        <div className="overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900 aspect-[16/9] mb-3 relative">
          {!imageError && article.featuredImage?.url ? (
            <img
              src={article.featuredImage.url}
              alt={headline}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
              <Globe className="w-8 h-8 text-stone-400" />
            </div>
          )}

          {article.featuredImage?.isAiGenerated && (
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/75 backdrop-blur-sm text-stone-200 text-[9px] rounded flex items-center gap-1">
              <Sparkles className="w-2 h-2 text-amber-300" />
              <span>{t('aiGeneratedImage')}</span>
            </div>
          )}
        </div>

        {/* Unboxed Metadata */}
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
