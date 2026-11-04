import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNav } from '../contexts/NavigationContext';
import { NewsArticle } from '../types';
import { NewsCard } from '../components/NewsCard';
import { SafeImage } from '../components/common/SafeImage';
import {
  Sparkles,
  CheckCircle2,
  Share2,
  Clock,
  ExternalLink,
  Volume2,
  VolumeX,
  Type,
  Flag,
  ArrowLeft,
  Calendar,
  User,
  Shield,
  BookOpen,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

interface NewsDetailPageProps {
  articleId: string;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ articleId }) => {
  const { lang, t, formatNumber } = useLanguage();
  const { goToCategory, goToHome } = useNav();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Article reading settings
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [activeLangTab, setActiveLangTab] = useState<'current' | 'compare'>('current');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news/${articleId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setArticle(json.data);
          setRelated(json.related || []);
        } else {
          setError(json.error || 'Article not found');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // Stop speech synthesis on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [articleId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <div className="w-8 h-8 border-2 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">
          Loading Editorial Dispatch...
        </p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-editorial-title text-2xl font-bold text-stone-900 dark:text-stone-100">
          Article Unavailable
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {error || 'The requested article could not be located in our publication index.'}
        </p>
        <button
          onClick={goToHome}
          className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded"
        >
          Return to Front Page
        </button>
      </div>
    );
  }

  const headline = lang === 'bn' ? article.headlineBn : article.headlineEn;
  const summary = lang === 'bn' ? article.summaryBn : article.summaryEn;
  const content = lang === 'bn' ? article.contentBn : article.contentEn;
  const authorName = lang === 'bn' ? article.author.nameBn : article.author.nameEn;
  const authorRole = lang === 'bn' ? article.author.roleBn : article.author.roleEn;

  const pubDate = new Date(article.publishedAt || article.createdAt);
  const formattedDate = pubDate.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Text to speech handler
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${headline}. ${summary}. ${content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${headline} via NEWS WORLD`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${headline}\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="flex items-center gap-2">
          <button
            onClick={goToHome}
            className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('home')}</span>
          </button>
          <span aria-hidden="true">/</span>
          <button
            onClick={() => goToCategory(article.categorySlug)}
            className="font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 hover:text-amber-700 transition-colors"
          >
            {article.categorySlug.replace('-', ' ')}
          </button>
        </div>

        {/* View mode toggle: Single vs Bilingual Side-by-Side Comparison */}
        <div className="flex items-center gap-1 p-0.5 bg-stone-200/70 dark:bg-stone-800 rounded">
          <button
            onClick={() => setActiveLangTab('current')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              activeLangTab === 'current'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {lang === 'bn' ? 'বাংলা সংস্করণ' : 'Standard View'}
          </button>
          <button
            onClick={() => setActiveLangTab('compare')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              activeLangTab === 'compare'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {lang === 'bn' ? 'দ্বিভাষিক তুলনা (BN & EN)' : 'Bilingual Dual View'}
          </button>
        </div>
      </div>

      {/* Headline Header Zone */}
      <header className="space-y-4">
        <h1 className="font-editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 dark:text-stone-50 leading-tight">
          {headline}
        </h1>

        <p className="font-editorial-body text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed italic border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-1">
          {summary}
        </p>

        {/* Author Byline, Source and Publishing Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center font-serif font-bold text-stone-700 dark:text-stone-300">
              {authorName.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">{authorName}</div>
              <div className="text-[11px] text-stone-500">{authorRole}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{formatNumber(article.readingTimeMinutes)} {t('readingTime')}</span>
            </div>

            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline"
              title="View original wire verification"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-medium">{article.source.name}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Featured Editorial Visual with Provenance Badge */}
      <figure className="space-y-2">
        <div className="relative overflow-hidden rounded-xl bg-stone-900 aspect-[16/9] shadow-md">
          <SafeImage
            src={article.featuredImage?.url}
            alt={lang === 'bn' ? article.featuredImage?.altTextBn : article.featuredImage?.altTextEn}
            categorySlug={article.categorySlug}
            className="w-full h-full object-cover"
          />

          {/* AI Generated Illustration Badge with Provenance Inspector */}
          {article.featuredImage.isAiGenerated && (
            <button
              onClick={() => setImageModalOpen(true)}
              className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-stone-200 text-xs rounded-md flex items-center gap-1.5 hover:bg-black transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{t('aiGeneratedImage')}</span>
              <span className="text-[10px] text-stone-400 underline ml-1">(Inspect)</span>
            </button>
          )}
        </div>

        <figcaption className="text-xs text-stone-500 italic flex items-center justify-between px-1">
          <span>{lang === 'bn' ? article.featuredImage.altTextBn : article.featuredImage.altTextEn}</span>
          <span className="text-[10px] text-stone-400">NEWS WORLD Editorial Archive</span>
        </figcaption>
      </figure>

      {/* Reading Utility Controls: Audio Player, Font Size, Share */}
      <div className="p-3 bg-stone-100/80 dark:bg-stone-900/60 rounded-lg border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
        {/* Text-to-speech audio reader */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              isSpeaking
                ? 'bg-rose-600 text-white'
                : 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? t('stopAudio') : t('listenArticle')}</span>
          </button>

          {isSpeaking && (
            <span className="text-xs text-rose-600 font-medium animate-pulse">
              {lang === 'bn' ? 'অডিও চলছে...' : 'Reading article audio...'}
            </span>
          )}
        </div>

        {/* Font size adjuster */}
        <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400">
          <Type className="w-3.5 h-3.5 mr-1 text-stone-400" />
          <span className="hidden sm:inline mr-1">{t('fontSize')}:</span>
          <button
            onClick={() => setFontSize('sm')}
            className={`px-2 py-0.5 rounded ${fontSize === 'sm' ? 'bg-stone-300 dark:bg-stone-700 font-bold' : ''}`}
          >
            A-
          </button>
          <button
            onClick={() => setFontSize('base')}
            className={`px-2 py-0.5 rounded ${fontSize === 'base' ? 'bg-stone-300 dark:bg-stone-700 font-bold' : ''}`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('lg')}
            className={`px-2 py-0.5 rounded ${fontSize === 'lg' ? 'bg-stone-300 dark:bg-stone-700 font-bold' : ''}`}
          >
            A+
          </button>
        </div>

        {/* Social Share Suite */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={shareOnFacebook}
            className="p-1.5 rounded hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
            title="Share on Facebook"
          >
            <span className="font-bold text-xs">FB</span>
          </button>
          <button
            onClick={shareOnTwitter}
            className="p-1.5 rounded hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
            title="Share on X"
          >
            <span className="font-bold text-xs">𝕏</span>
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="p-1.5 rounded hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
            title="Share on WhatsApp"
          >
            <span className="font-bold text-xs">WA</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-1 text-xs"
            title="Copy Article Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Body Prose (Supports Single View or Bilingual Side-by-Side Dual View) */}
      {activeLangTab === 'compare' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-200 dark:border-stone-800">
          {/* Bengali Column */}
          <div className="space-y-4 border-r border-stone-200/60 dark:border-stone-800/60 pr-0 md:pr-6">
            <div className="pb-2 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-800 dark:text-amber-400">
                বাংলা সংস্করণ (Bangla)
              </span>
              <h2 className="font-editorial-title text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {article.headlineBn}
              </h2>
            </div>
            <div className="font-editorial-body text-base text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
              {article.contentBn}
            </div>
          </div>

          {/* English Column */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-800 dark:text-amber-400">
                English Edition
              </span>
              <h2 className="font-editorial-title text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {article.headlineEn}
              </h2>
            </div>
            <div className="font-editorial-body text-base text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
              {article.contentEn}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`font-editorial-body text-stone-900 dark:text-stone-100 leading-relaxed whitespace-pre-line ${
            fontSize === 'sm'
              ? 'text-sm sm:text-base leading-normal'
              : fontSize === 'base'
              ? 'text-base sm:text-lg leading-relaxed'
              : fontSize === 'lg'
              ? 'text-lg sm:text-xl leading-loose'
              : 'text-xl sm:text-2xl leading-loose'
          }`}
        >
          {content}
        </div>
      )}

      {/* Domain-Specific Safety Disclaimers */}
      {article.domainDisclaimer && (
        <div className="p-4 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100">
            {article.domainDisclaimer.type === 'health' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
            {article.domainDisclaimer.type === 'islamic' && <BookOpen className="w-4 h-4 text-emerald-600" />}
            {article.domainDisclaimer.type === 'jobs' && <Shield className="w-4 h-4 text-sky-600" />}
            <span>
              {lang === 'bn' ? 'সম্পাদকীয় সতকর্তা ও নির্দেশনা' : 'Editorial Compliance & Domain Disclaimer'}
            </span>
          </div>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            {lang === 'bn' ? article.domainDisclaimer.textBn : article.domainDisclaimer.textEn}
          </p>
        </div>
      )}

      {/* Verified Source & Content Integrity Footer */}
      <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {lang === 'bn' ? 'তথ্যের মূল উৎস: ' : 'Primary Source: '}
            </span>
            <span>{article.source.name}</span>
          </div>

          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-800 dark:text-stone-200 hover:text-amber-700 flex items-center gap-1 font-medium"
          >
            <span>{lang === 'bn' ? 'মূল প্রতিবেদন দেখুন' : 'Verify Original Source Wire'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800/60 text-[11px]">
          <span>
            {lang === 'bn'
              ? 'নিউজ ওয়ার্ল্ড কোনো সংবাদ সরাসরি নকল করে না। সকল তথ্য বহুভাষিক সমন্বয়ে প্রস্তুত।'
              : 'NEWS WORLD does not copy third-party articles verbatim. Content is uniquely synthesized.'}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {lang === 'bn' ? '✓ আন্তর্জাতিক ফ্যাক্ট-চেক যাচিত' : '✓ Verified International Reporting'}
          </span>
        </div>
      </div>

      {/* Related News in Same Category */}
      {related.length > 0 && (
        <section className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="font-editorial-title text-xl font-bold text-stone-900 dark:text-stone-100">
            {t('relatedNews')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((rel) => (
              <NewsCard key={rel.id} article={rel} variant="secondary" />
            ))}
          </div>
        </section>
      )}

      {/* AI Image Provenance Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h4 className="font-editorial-title text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === 'bn' ? 'এআই চিত্রায়ণ উৎস ও প্রমাণপত্র' : 'AI Illustration Provenance Certificate'}</span>
              </h4>
              <button
                onClick={() => setImageModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <div>
                <strong className="block text-stone-900 dark:text-stone-100 font-semibold mb-1">
                  Generation Model:
                </strong>
                <code className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[11px]">
                  {article.featuredImage.model}
                </code>
              </div>

              <div>
                <strong className="block text-stone-900 dark:text-stone-100 font-semibold mb-1">
                  Editorial Prompt:
                </strong>
                <p className="p-2.5 rounded bg-stone-100 dark:bg-stone-800 font-sans italic text-stone-700 dark:text-stone-300 leading-relaxed">
                  "{article.featuredImage.prompt}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-stone-400">Aspect Ratio:</span> {article.featuredImage.aspectRatio}
                </div>
                <div>
                  <span className="text-stone-400">Generated Date:</span> {new Date(article.featuredImage.generatedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300">
                {lang === 'bn'
                  ? 'এই ছবিটি গুগল ইমেজ সার্চ বা অন্য কোনো ওয়েবসাইট থেকে ডাউনলোড করা হয়নি। এটি নিবন্ধের মূল বিষয়ের ওপর ভিত্তি করে সরাসরি এআই দ্বারা চিত্রিত হয়েছে।'
                  : 'This image is not downloaded from other news sites or Google Search. It was generated specifically to illustrate this journalistic report.'}
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => setImageModalOpen(false)}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
