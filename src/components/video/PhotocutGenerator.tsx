import React, { useState, useEffect, useRef } from 'react';
import { NewsArticle } from '../../types';
import {
  Download,
  Share2,
  Sparkles,
  Palette,
  Type,
  Layers,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface PhotocutGeneratorProps {
  articles: NewsArticle[];
  selectedArticleId?: string;
  onPostToFacebook?: (articleId: string, customMessage: string, photocutDataUrl: string) => Promise<void>;
  fbRemainingSlots?: number;
}

export const PhotocutGenerator: React.FC<PhotocutGeneratorProps> = ({
  articles,
  selectedArticleId,
  onPostToFacebook,
  fbRemainingSlots = 4
}) => {
  const [currentArticleId, setCurrentArticleId] = useState<string>(
    selectedArticleId || (articles[0]?.id ?? '')
  );
  const [format, setFormat] = useState<'landscape' | 'portrait'>('portrait'); // 1200x630 or 1080x1350
  const [theme, setTheme] = useState<'crimson' | 'midnight' | 'slate' | 'emerald'>('crimson');
  const [languageMode, setLanguageMode] = useState<'bn-primary' | 'en-primary' | 'bilingual'>('bilingual');
  const [customKicker, setCustomKicker] = useState<string>('ব্রেকিং আন্তর্জাতিক সংবাদ');
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const article = articles.find((a) => a.id === currentArticleId) || articles[0];

  useEffect(() => {
    if (selectedArticleId) {
      setCurrentArticleId(selectedArticleId);
    }
  }, [selectedArticleId]);

  // Re-draw canvas whenever configuration changes
  useEffect(() => {
    if (!article) return;
    renderPhotocutCanvas();
  }, [article, format, theme, languageMode, customKicker, fontSizeOffset]);

  const renderPhotocutCanvas = async () => {
    setIsRendering(true);
    const canvas = canvasRef.current || document.createElement('canvas');
    const width = format === 'landscape' ? 1200 : 1080;
    const height = format === 'landscape' ? 630 : 1350;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Theme color palettes
    const palettes = {
      crimson: {
        bg: '#0c0a09',
        accent: '#dc2626',
        accentGrad: ['#ef4444', '#b91c1c'],
        cardBg: '#1c1917',
        textColor: '#ffffff',
        subTextColor: '#fca5a5'
      },
      midnight: {
        bg: '#030712',
        accent: '#2563eb',
        accentGrad: ['#3b82f6', '#1d4ed8'],
        cardBg: '#0f172a',
        textColor: '#ffffff',
        subTextColor: '#93c5fd'
      },
      slate: {
        bg: '#0f172a',
        accent: '#0d9488',
        accentGrad: ['#14b8a6', '#0f766e'],
        cardBg: '#1e293b',
        textColor: '#ffffff',
        subTextColor: '#99f6e4'
      },
      emerald: {
        bg: '#064e3b',
        accent: '#10b981',
        accentGrad: ['#34d399', '#059669'],
        cardBg: '#022c22',
        textColor: '#ffffff',
        subTextColor: '#a7f3d0'
      }
    };

    const curPalette = palettes[theme];

    // Background base
    ctx.fillStyle = curPalette.bg;
    ctx.fillRect(0, 0, width, height);

    // Load Article Featured Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = article?.featuredImage?.url || '/src/assets/images/news_world_hero_summit_1793632290118.jpg';

    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    if (format === 'landscape') {
      // 1200 x 630 Landscape Facebook Card Layout
      // Draw background image full bleed
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, width, height);
      }

      // Strong gradient for text legibility
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'rgba(12, 10, 9, 0.98)');
      grad.addColorStop(0.55, 'rgba(12, 10, 9, 0.88)');
      grad.addColorStop(1, 'rgba(12, 10, 9, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Top Banner
      ctx.fillStyle = curPalette.accent;
      ctx.beginPath();
      ctx.roundRect(60, 50, 240, 48, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('NEWS WORLD', 80, 82);

      // Category badge
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.roundRect(315, 50, 320, 48, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(article.categorySlug.toUpperCase(), 335, 82);

      // Custom Kicker text
      if (customKicker) {
        ctx.fillStyle = curPalette.subTextColor;
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText(`• ${customKicker}`, 60, 140);
      }

      // Primary Headline
      ctx.fillStyle = '#ffffff';
      const hSize = 46 + fontSizeOffset;
      ctx.font = `bold ${hSize}px sans-serif`;
      const primaryText = languageMode === 'en-primary' ? article.headlineEn : article.headlineBn;
      wrapText(ctx, primaryText, 60, 210, 780, hSize * 1.25);

      // Secondary Headline if bilingual
      if (languageMode === 'bilingual') {
        ctx.fillStyle = '#cbd5e1';
        const subHSize = 26 + fontSizeOffset;
        ctx.font = `500 ${subHSize}px sans-serif`;
        const subText = article.headlineEn;
        wrapText(ctx, subText, 60, 380, 760, subHSize * 1.3);
      }

      // Footer bar
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, 560, width, 70);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px sans-serif';
      ctx.fillText(`তথ্যসূত্র: ${article.source.name} | যাচাইকৃত আন্তর্জাতিক প্রতিবেদন`, 60, 602);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('newsworld-portal.org', width - 260, 602);

    } else {
      // 1080 x 1350 Portrait Facebook Post Layout (Highest mobile conversion)
      // Top Half: Image Container
      const imgHeight = 680;
      if (img.complete && img.naturalWidth > 0) {
        const scale = Math.max(width / img.naturalWidth, imgHeight / img.naturalHeight);
        const ix = (width - img.naturalWidth * scale) / 2;
        const iy = (imgHeight - img.naturalHeight * scale) / 2;
        ctx.drawImage(img, ix, iy, img.naturalWidth * scale, imgHeight);
      }

      // Image bottom shadow blend
      const imgGrad = ctx.createLinearGradient(0, imgHeight - 140, 0, imgHeight);
      imgGrad.addColorStop(0, 'rgba(12, 10, 9, 0)');
      imgGrad.addColorStop(1, curPalette.bg);
      ctx.fillStyle = imgGrad;
      ctx.fillRect(0, imgHeight - 140, width, 140);

      // Top Corner Badge on Image
      ctx.fillStyle = curPalette.accent;
      ctx.beginPath();
      ctx.roundRect(50, 45, 260, 54, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('NEWS WORLD', 75, 81);

      // Category Tag on image
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.beginPath();
      ctx.roundRect(325, 45, 340, 54, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(article.categorySlug.toUpperCase(), 345, 80);

      // Bottom Half: Typographic Photocut Card
      ctx.fillStyle = curPalette.cardBg;
      ctx.beginPath();
      ctx.roundRect(40, 710, width - 80, 520, 24);
      ctx.fill();

      // Card Accent Left Strip
      ctx.fillStyle = curPalette.accent;
      ctx.beginPath();
      ctx.roundRect(40, 710, 16, 520, [24, 0, 0, 24]);
      ctx.fill();

      // Kicker
      if (customKicker) {
        ctx.fillStyle = curPalette.subTextColor;
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText(`▶ ${customKicker}`, 85, 775);
      }

      // Bangla Primary Headline
      ctx.fillStyle = '#ffffff';
      const mainFontSize = 48 + fontSizeOffset;
      ctx.font = `bold ${mainFontSize}px sans-serif`;
      const primaryHeadline = languageMode === 'en-primary' ? article.headlineEn : article.headlineBn;
      wrapText(ctx, primaryHeadline, 85, 850, 910, mainFontSize * 1.35);

      // English Subheadline if bilingual
      if (languageMode === 'bilingual') {
        ctx.fillStyle = '#cbd5e1';
        const secFontSize = 26 + fontSizeOffset;
        ctx.font = `500 ${secFontSize}px sans-serif`;
        wrapText(ctx, article.headlineEn, 85, 1070, 910, secFontSize * 1.35);
      }

      // Attribution & Date footer inside card
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px sans-serif';
      ctx.fillText(`তথ্যসূত্র: ${article.source.name} | তারিখ: ${new Date().toLocaleDateString('bn-BD')}`, 85, 1190);

      // Bottom Global Footer
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '22px sans-serif';
      ctx.fillText('newsworld-portal.org | অফিসিয়াল ফেসবুক পেজ ফটোকাট', 60, 1295);

      ctx.fillStyle = curPalette.accent;
      ctx.beginPath();
      ctx.arc(width - 80, 1285, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    setPreviewDataUrl(canvas.toDataURL('image/png'));
    setIsRendering(false);
  };

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  const handleDownload = () => {
    if (!previewDataUrl) return;
    const a = document.createElement('a');
    a.href = previewDataUrl;
    a.download = `newsworld-photocut-${article.id}-${format}.png`;
    a.click();
  };

  const handlePublishToFacebook = async () => {
    if (!article || !onPostToFacebook) return;
    if (fbRemainingSlots <= 0) {
      setFeedback({
        text: 'Strict daily quota reached: Maximum 4 Facebook publications per Bangladesh calendar day (Asia/Dhaka). Quota resets at 12:00 AM.',
        type: 'error'
      });
      return;
    }

    try {
      setIsPosting(true);
      setFeedback(null);
      const postMessage = `${article.headlineEn}\n\n${article.headlineBn}\n\n${article.summaryEn}\n\nবিস্তারিত পড়ুন: https://newsworld-portal.org/article/${article.id}`;
      await onPostToFacebook(article.id, postMessage, previewDataUrl);
      setFeedback({
        text: 'Photocut news card successfully posted to Facebook Page with official framing!',
        type: 'success'
      });
    } catch (err: any) {
      setFeedback({
        text: err.message || 'Failed to post to Facebook Page',
        type: 'error'
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-stone-100 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-500" />
            <span>Facebook Photocut Card Studio (ফটোকাট)</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Create high-engagement branded news cards for Facebook Page posts with verified editorial framing
          </p>
        </div>

        {/* Dhaka 4-post quota status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-xs text-stone-400">Facebook Daily Slots:</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            fbRemainingSlots > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {fbRemainingSlots} of 4 Available Today (Asia/Dhaka)
          </span>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
              : 'bg-red-950/60 text-red-300 border border-red-800/60'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Main Grid: Left Controls, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Article Picker */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Select Approved Article for Photocut:
            </label>
            <select
              value={currentArticleId}
              onChange={(e) => setCurrentArticleId(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-red-500"
            >
              {articles.map((a) => (
                <option key={a.id} value={a.id}>
                  [{a.categorySlug}] {a.headlineEn.slice(0, 65)}...
                </option>
              ))}
            </select>
          </div>

          {/* Format / Aspect Ratio Switcher */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Card Format:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat('portrait')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                  format === 'portrait'
                    ? 'bg-red-600 text-white border-red-500'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                }`}
              >
                <span>4:5 Portrait (1080×1350)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('landscape')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                  format === 'landscape'
                    ? 'bg-red-600 text-white border-red-500'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                }`}
              >
                <span>1.91:1 Landscape (1200×630)</span>
              </button>
            </div>
          </div>

          {/* Color Theme Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Photocut Theme Palette:</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'crimson', label: 'Crimson', color: 'bg-red-600' },
                { id: 'midnight', label: 'Midnight', color: 'bg-blue-600' },
                { id: 'slate', label: 'Slate', color: 'bg-teal-600' },
                { id: 'emerald', label: 'Emerald', color: 'bg-emerald-600' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as any)}
                  className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1.5 transition-all ${
                    theme === t.id
                      ? 'border-white bg-stone-800 text-white shadow-md'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${t.color}`} />
                  <span className="text-[10px]">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Mode */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Language Typography:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bilingual', label: 'Bilingual (দ্বিভাষিক)' },
                { id: 'bn-primary', label: 'Bangla Only (বাংলা)' },
                { id: 'en-primary', label: 'English Only' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setLanguageMode(m.id as any)}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                    languageMode === m.id
                      ? 'bg-stone-800 text-amber-300 border-amber-500/50'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Kicker / Banner Tag */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              Editorial Kicker Tag (হেডলাইন ব্যানার):
            </label>
            <input
              type="text"
              value={customKicker}
              onChange={(e) => setCustomKicker(e.target.value)}
              placeholder="e.g. ব্রেকিং আন্তর্জাতিক সংবাদ / BREAKING NEWS"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Font Size Adjuster */}
          <div>
            <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
              <span>Headline Font Scale:</span>
              <span className="font-mono text-stone-400">{fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}px</span>
            </div>
            <input
              type="range"
              min="-12"
              max="16"
              value={fontSizeOffset}
              onChange={(e) => setFontSizeOffset(Number(e.target.value))}
              className="w-full accent-red-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors shadow-md"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download High-Res PNG ({format === 'portrait' ? '1080×1350' : '1200×630'})</span>
            </button>

            {onPostToFacebook && (
              <button
                onClick={handlePublishToFacebook}
                disabled={isPosting || fbRemainingSlots <= 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg disabled:opacity-50"
              >
                <Share2 className="w-4 h-4" />
                <span>
                  {isPosting ? 'Posting to Facebook...' : 'Publish Photocut Card to Facebook Page'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Live Canvas Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-stone-950 p-4 rounded-2xl border border-stone-800 min-h-[460px]">
          <div className="text-xs font-bold text-stone-400 mb-2 flex items-center justify-between w-full">
            <span>Live Output Preview ({format === 'portrait' ? '1080×1350 Portrait' : '1200×630 Landscape'})</span>
            <button
              onClick={renderPhotocutCanvas}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-white"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="relative max-w-full flex items-center justify-center overflow-hidden rounded-xl shadow-2xl border border-stone-800 bg-black">
            {previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Photocut Card Preview"
                className={`object-contain ${
                  format === 'portrait' ? 'max-h-[520px] w-auto' : 'max-h-[380px] w-full'
                }`}
              />
            ) : (
              <div className="p-12 text-center text-stone-500 text-xs">
                Rendering High-Res Photocut Card...
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};
