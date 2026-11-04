import React, { useState, useEffect, useRef } from 'react';
import { NewsArticle } from '../../types';
import { sanitizeImageUrl, getCategoryDefaultImage } from '../../utils/imageUtils';
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
  ExternalLink,
  BookOpen,
  Heart,
  GraduationCap,
  Flame,
  Award
} from 'lucide-react';

interface PhotocutGeneratorProps {
  articles: NewsArticle[];
  selectedArticleId?: string;
  onPostToFacebook?: (articleId: string, customMessage: string, photocutDataUrl: string) => Promise<void>;
  fbRemainingSlots?: number;
}

// Curated Social Media Post Presets for Islamic, Motivational, and Educational cards
const SOCIAL_PRESETS = [
  // 🕌 ISLAMIC PRESETS
  {
    id: 'islamic-1',
    category: 'islamic',
    labelBn: '🕌 ধৈর্য ও প্রার্থনার শিক্ষা (সূরা বাকারা: ১৫৩)',
    kicker: 'পবিত্র কুরআন ও নববী নির্দেশনা',
    titleBn: '"হে ঈমানদারগণ! তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা কর। নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।"',
    subtitleEn: 'Quran (Surah Al-Baqarah 2:153) • The Virtues of Sabr & Prayer',
    citation: 'পবিত্র কুরআন • সূরা আল-বাকারা: ১৫৩',
    theme: 'emerald' as const,
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'islamic-2',
    category: 'islamic',
    labelBn: '🕌 সত্যবাদিতা ও সততার পুরস্কার (সহীহ বুখারী)',
    kicker: 'সহীহ হাদিসের অমূল্য শিক্ষা',
    titleBn: '"তোমরা সত্য অবলম্বন কর, কেননা সত্য সততার দিকে পরিচালিত করে এবং সততা জান্নাতের পথ দেখায়।"',
    subtitleEn: 'Prophet Muhammad (ﷺ) • Sahih al-Bukhari & Muslim',
    citation: 'সহীহ বুখারী: ৬০৯৪ • সহীহ মুসলিম: ২৬০৭',
    theme: 'gold' as const,
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'islamic-3',
    category: 'islamic',
    labelBn: '🕌 সদাচরণ ও সর্বোত্তম চরিত্র (হাদিস)',
    kicker: 'ইসলামিক নীতিশাস্ত্র ও জীবনদর্শন',
    titleBn: '"তোমাদের মধ্যে সেই ব্যক্তিই আমার নিকট সর্বাধিক প্রিয়, যার চরিত্র ও ব্যবহার সবচেয়ে উত্তম।"',
    subtitleEn: 'The Best Among You Are Those Best in Character',
    citation: 'সহীহ বুখারী: ৩৭৫৯',
    theme: 'emerald' as const,
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80'
  },

  // 💡 MOTIVATIONAL PRESETS
  {
    id: 'moti-1',
    category: 'motivational',
    labelBn: '💡 সাহসিকতা ও অধ্যবসায় (মোটিভেশন)',
    kicker: 'অনুপ্রেরণা ও আত্মউন্নয়ন',
    titleBn: '"সাফল্য চূড়ান্ত নয়, ব্যর্থতা মানেই শেষ নয়—প্রতিকূলতার মাঝেও এগিয়ে যাওয়ার অবিচল সাহসিকতাই আসল।"',
    subtitleEn: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    citation: 'উইনস্টন চার্চিল • আত্মউন্নয়ন বার্তা',
    theme: 'crimson' as const,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'moti-2',
    category: 'motivational',
    labelBn: '💡 প্রতিদিনের ১% উন্নতি (অভ্যাস ও সাফল্য)',
    kicker: 'সাফল্যের মনস্তত্ত্ব ও অভ্যাস',
    titleBn: '"প্রতিদিন নিজের দক্ষতায় মাত্র ১% উন্নতি আনুন; এক বছর পর আপনি হবেন বর্তমানের চেয়ে ৩৭ গুণ বেশি সফল!"',
    subtitleEn: 'Small daily micro-habits compound into extraordinary life-changing outcomes.',
    citation: 'জ্ঞানীয় মনোবিজ্ঞান ও অভ্যাস বিজ্ঞান',
    theme: 'midnight' as const,
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'moti-3',
    category: 'motivational',
    labelBn: '💡 বাধা অতিক্রমের মানসিক শক্তি',
    kicker: 'দৃঢ় সংকল্প ও মনোবল',
    titleBn: '"ঝড় যত প্রবলই হোক, মনে রাখবেন—মেঘের ওপর আকাশ সবসময় শান্ত ও উন্মুক্ত থাকে।"',
    subtitleEn: 'No storm lasts forever; preserve your mental peace and keep moving forward.',
    citation: 'NEWS WORLD মোটিভেশনাল ডেস্ক',
    theme: 'crimson' as const,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
  },

  // 🎓 EDUCATIONAL PRESETS
  {
    id: 'edu-1',
    category: 'educational',
    labelBn: '🎓 ফুল-ফান্ডেড স্কলারশিপ প্রস্তুতি',
    kicker: 'উচ্চশিক্ষা ও আন্তর্জাতিক ক্যারিয়ার',
    titleBn: '"আন্তর্জাতিক ফুল-ফান্ডেড স্কলারশিপ পেতে একাডেমিক সিজিপিএর চেয়ে শক্তিশালী রিসার্চ প্রপোজাল বেশি গুরুত্বপূর্ণ।"',
    subtitleEn: 'Higher Education Advisory • Chevening, DAAD & Erasmus Strategies',
    citation: 'আন্তর্জাতিক উচ্চশিক্ষা বিষয়ক সম্পাদকীয়',
    theme: 'slate' as const,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'edu-2',
    category: 'educational',
    labelBn: '🎓 দ্রুত পড়া মনে রাখার বৈজ্ঞানিক কৌশল',
    kicker: 'মস্তিষ্কের স্মৃতিবিজ্ঞান ও পড়াশোনা',
    titleBn: '"বারবার রিডিং পড়ার চেয়ে বই বন্ধ করে নিজেকে প্রশ্ন করা (Active Recall) পড়া মনে রাখার ক্ষেত্রে ২০০% বেশি কার্যকর।"',
    subtitleEn: 'Active Recall and Spaced Repetition outperform passive reading across all age groups.',
    citation: 'কেমব্রিজ কগনিটিভ ল্যাবরেটরি রিসার্চ',
    theme: 'slate' as const,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
  }
];

export const PhotocutGenerator: React.FC<PhotocutGeneratorProps> = ({
  articles,
  selectedArticleId,
  onPostToFacebook,
  fbRemainingSlots = 4
}) => {
  const [currentArticleId, setCurrentArticleId] = useState<string>(
    selectedArticleId || (articles[0]?.id ?? '')
  );

  // Card Mode: news | islamic | motivational | educational
  const [cardMode, setCardMode] = useState<'news' | 'islamic' | 'motivational' | 'educational'>('news');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  const [format, setFormat] = useState<'landscape' | 'portrait'>('portrait'); // 1200x630 or 1080x1350
  const [theme, setTheme] = useState<'crimson' | 'midnight' | 'slate' | 'emerald' | 'gold'>('crimson');
  const [languageMode, setLanguageMode] = useState<'bn-primary' | 'en-primary' | 'bilingual'>('bilingual');
  const [customKicker, setCustomKicker] = useState<string>('ব্রেকিং আন্তর্জাতিক সংবাদ');
  const [customTitleBn, setCustomTitleBn] = useState<string>('');
  const [customTitleEn, setCustomTitleEn] = useState<string>('');
  const [customCitation, setCustomCitation] = useState<string>('');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
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

  // Load a preset when selected
  const handleApplyPreset = (presetId: string) => {
    const preset = SOCIAL_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setSelectedPresetId(presetId);
    setCardMode(preset.category as any);
    setCustomKicker(preset.kicker);
    setCustomTitleBn(preset.titleBn);
    setCustomTitleEn(preset.subtitleEn);
    setCustomCitation(preset.citation);
    setCustomImageUrl(preset.imageUrl);
    setTheme(preset.theme);
  };

  // Switch card mode
  const handleSwitchMode = (mode: 'news' | 'islamic' | 'motivational' | 'educational') => {
    setCardMode(mode);
    if (mode === 'news') {
      setSelectedPresetId('');
      setCustomKicker(article ? (article.isBreaking ? 'ব্রেকিং আন্তর্জাতিক সংবাদ' : 'বিশেষ আন্তর্জাতিক প্রতিবেদন') : 'সংবাদ শিরোনাম');
      setCustomTitleBn(article?.headlineBn || '');
      setCustomTitleEn(article?.headlineEn || '');
      setCustomCitation(article ? `তথ্যসূত্র: ${article.source.name} | যাচাইকৃত প্রতিবেদন` : '');
      setCustomImageUrl('');
      setTheme('crimson');
    } else {
      const firstPreset = SOCIAL_PRESETS.find((p) => p.category === mode);
      if (firstPreset) {
        handleApplyPreset(firstPreset.id);
      }
    }
  };

  // Set default values when article changes and mode is 'news'
  useEffect(() => {
    if (cardMode === 'news' && article) {
      setCustomKicker(article.isBreaking ? 'ব্রেকিং আন্তর্জাতিক সংবাদ' : 'বিশেষ আন্তর্জাতিক প্রতিবেদন');
      setCustomTitleBn(article.headlineBn);
      setCustomTitleEn(article.headlineEn);
      setCustomCitation(`তথ্যসূত্র: ${article.source.name} | যাচাইকৃত প্রতিবেদন`);
      setCustomImageUrl(sanitizeImageUrl(article.featuredImage?.url, article.categorySlug));
    }
  }, [article, cardMode]);

  // Re-draw canvas whenever configuration changes
  useEffect(() => {
    renderPhotocutCanvas();
  }, [
    article,
    cardMode,
    format,
    theme,
    languageMode,
    customKicker,
    customTitleBn,
    customTitleEn,
    customCitation,
    customImageUrl,
    fontSizeOffset
  ]);

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
        bg: '#022c22',
        accent: '#059669',
        accentGrad: ['#10b981', '#047857'],
        cardBg: '#064e3b',
        textColor: '#ffffff',
        subTextColor: '#a7f3d0'
      },
      gold: {
        bg: '#1c1917',
        accent: '#d97706',
        accentGrad: ['#f59e0b', '#b45309'],
        cardBg: '#292524',
        textColor: '#ffffff',
        subTextColor: '#fde68a'
      }
    };

    const curPalette = palettes[theme] || palettes.crimson;

    // Background base
    ctx.fillStyle = curPalette.bg;
    ctx.fillRect(0, 0, width, height);

    // Resolve Image URL safely with sanitization
    let targetImgUrl = customImageUrl;
    if (!targetImgUrl && article) {
      targetImgUrl = sanitizeImageUrl(article.featuredImage?.url, article.categorySlug);
    }
    if (!targetImgUrl) {
      targetImgUrl = getCategoryDefaultImage('international-news');
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = targetImgUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        // Fallback to local hero summit
        img.src = '/images/news_world_hero_summit_1793632290118.jpg';
        img.onload = resolve;
        img.onerror = resolve;
      };
    });

    const headlineBn = customTitleBn || article?.headlineBn || 'আন্তর্জাতিক সংবাদ শিরোনাম';
    const headlineEn = customTitleEn || article?.headlineEn || 'International News Headline';
    const kickerText = customKicker || 'NEWS WORLD EXCLUSIVE';
    const citationText = customCitation || 'NEWS WORLD | newsworld-portal.org';

    if (format === 'landscape') {
      // 1200 x 630 Landscape Facebook Card Layout
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
      const badgeLabel = cardMode === 'islamic' ? '🕌 ইসলামিক জ্ঞান' : cardMode === 'motivational' ? '💡 অনুপ্রেরণা' : cardMode === 'educational' ? '🎓 শিক্ষা ও জ্ঞান' : (article?.categorySlug?.toUpperCase() || 'NEWS');
      ctx.fillText(badgeLabel, 335, 82);

      // Custom Kicker text
      if (kickerText) {
        ctx.fillStyle = curPalette.subTextColor;
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText(`• ${kickerText}`, 60, 140);
      }

      // Primary Headline
      ctx.fillStyle = '#ffffff';
      const hSize = 44 + fontSizeOffset;
      ctx.font = `bold ${hSize}px sans-serif`;
      const primaryText = languageMode === 'en-primary' ? headlineEn : headlineBn;
      wrapText(ctx, primaryText, 60, 210, 780, hSize * 1.25);

      // Secondary Headline if bilingual
      if (languageMode === 'bilingual' && headlineEn) {
        ctx.fillStyle = '#cbd5e1';
        const subHSize = 24 + fontSizeOffset;
        ctx.font = `500 ${subHSize}px sans-serif`;
        wrapText(ctx, headlineEn, 60, 390, 760, subHSize * 1.3);
      }

      // Footer bar
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, 560, width, 70);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px sans-serif';
      ctx.fillText(citationText, 60, 602);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('newsworld-portal.org', width - 260, 602);

    } else {
      // 1080 x 1350 Portrait Facebook Post Layout (Highest mobile engagement)
      const imgHeight = 680;
      if (img.complete && img.naturalWidth > 0) {
        const scale = Math.max(width / img.naturalWidth, imgHeight / img.naturalHeight);
        const ix = (width - img.naturalWidth * scale) / 2;
        const iy = (imgHeight - img.naturalHeight * scale) / 2;
        ctx.drawImage(img, ix, iy, img.naturalWidth * scale, imgHeight);
      }

      // Image bottom shadow blend
      const shadowGrad = ctx.createLinearGradient(0, imgHeight - 200, 0, imgHeight);
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
      shadowGrad.addColorStop(1, curPalette.bg);
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, imgHeight - 200, width, 200);

      // Top Header Pill Over Image
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.beginPath();
      ctx.roundRect(50, 45, width - 100, 72, 36);
      ctx.fill();

      ctx.fillStyle = curPalette.accent;
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('NEWS WORLD', 80, 90);

      ctx.fillStyle = '#ffffff';
      ctx.font = '500 20px sans-serif';
      ctx.fillText('আন্তর্জাতিক সংবাদ মাধ্যম', 260, 90);

      // Category Pill Tag
      ctx.fillStyle = curPalette.accent;
      ctx.beginPath();
      ctx.roundRect(width - 240, 56, 170, 50, 25);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      const pLabel = cardMode === 'islamic' ? '🕌 ইসলামিক' : cardMode === 'motivational' ? '💡 মোটিভেশন' : cardMode === 'educational' ? '🎓 শিক্ষা' : 'NEWS';
      ctx.fillText(pLabel, width - 215, 88);

      // Content Card Container
      ctx.fillStyle = curPalette.cardBg;
      ctx.beginPath();
      ctx.roundRect(50, 660, width - 100, 570, 24);
      ctx.fill();

      // Top Accent line
      const lineGrad = ctx.createLinearGradient(50, 660, width - 50, 660);
      lineGrad.addColorStop(0, curPalette.accentGrad[0]);
      lineGrad.addColorStop(1, curPalette.accentGrad[1]);
      ctx.fillStyle = lineGrad;
      ctx.fillRect(50, 660, width - 100, 8);

      // Kicker / Category Header
      ctx.fillStyle = curPalette.subTextColor;
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(kickerText.toUpperCase(), 90, 725);

      // Primary Headline (Bengali or English)
      ctx.fillStyle = '#ffffff';
      const mainHSize = 42 + fontSizeOffset;
      ctx.font = `bold ${mainHSize}px sans-serif`;
      const primaryHeadline = languageMode === 'en-primary' ? headlineEn : headlineBn;
      const textEndY = wrapText(ctx, primaryHeadline, 90, 790, width - 180, mainHSize * 1.3);

      // Secondary English Subtitle if bilingual
      if (languageMode === 'bilingual' && headlineEn && textEndY < 1050) {
        ctx.fillStyle = '#94a3b8';
        const subSize = 24 + fontSizeOffset;
        ctx.font = `500 ${subSize}px sans-serif`;
        wrapText(ctx, headlineEn, 90, textEndY + 35, width - 180, subSize * 1.35);
      }

      // Verification / Citation Footer
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(50, 1150, width - 100, 80);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(citationText, 90, 1198);

      // Bottom Branding Strip
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('www.newsworld-portal.org', width - 360, 1198);
    }

    setPreviewDataUrl(canvas.toDataURL('image/png'));
    setIsRendering(false);
  };

  // Helper text-wrap function on 2D context
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
    return curY;
  };

  const handleDownload = () => {
    if (!previewDataUrl) return;
    const a = document.createElement('a');
    a.href = previewDataUrl;
    a.download = `newsworld-photocut-${cardMode}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setFeedback({
      text: 'হাই-রেজোলিউশন ফটোকাট ইমেজ সফলভাবে ডাউনলোড হয়েছে!',
      type: 'success'
    });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handlePublishToFacebook = async () => {
    if (!onPostToFacebook || !previewDataUrl) return;
    try {
      setIsPosting(true);
      const caption = `${customKicker}\n\n${customTitleBn}\n\n${customTitleEn}\n\n${customCitation}\n\nবিস্তারিত পড়ুন: https://newsworld-portal.org\n\n#NewsWorld #${cardMode} #Bangladesh #InternationalNews`;
      await onPostToFacebook(article?.id || 'preset-card', caption, previewDataUrl);
      setFeedback({
        text: 'ফেসবুক পেজে সুন্দর ফটোকাট পোস্ট সফলভাবে প্রকাশিত হয়েছে!',
        type: 'success'
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      setFeedback({ text: err.message || 'ফেসবুকে পোস্ট ব্যর্থ হয়েছে', type: 'error' });
      setTimeout(() => setFeedback(null), 5000);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-editorial-title">
              ফেসবুক ও সোশ্যাল ফটোকাট স্টুডিও (Social Card Studio)
            </h2>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            ফেসবুক পেজে পোস্ট করার জন্য শিক্ষামূলক, মোটিভেশনাল, ইসলামিক ও আন্তর্জাতিক সংবাদের আকর্ষণীয় ফটোকার্ড তৈরি করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 font-mono">
            আজকের অবশিষ্ট ফেসবুক স্লট: <strong className="text-white">{fbRemainingSlots}/4</strong>
          </span>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
              : 'bg-rose-950/80 border border-rose-800 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-stone-950 border border-stone-800">
        <button
          onClick={() => handleSwitchMode('news')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            cardMode === 'news'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>সংবাদ ফটোকাট</span>
        </button>

        <button
          onClick={() => handleSwitchMode('islamic')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            cardMode === 'islamic'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>🕌 ইসলামিক জ্ঞান</span>
        </button>

        <button
          onClick={() => handleSwitchMode('motivational')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            cardMode === 'motivational'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>💡 মোটিভেশনাল উক্তি</span>
        </button>

        <button
          onClick={() => handleSwitchMode('educational')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            cardMode === 'educational'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>🎓 শিক্ষামূলক তথ্য</span>
        </button>
      </div>

      {/* Preset Quick Load Bar (for Islamic, Motivational, Educational) */}
      {cardMode !== 'news' && (
        <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
            <span>⚡ ১-ক্লিকে প্রি-সেট লোড করুন:</span>
            <span className="text-stone-500 text-[11px]">ক্লিক করলেই ডিজাইন ও কন্টেন্ট সেট হয়ে যাবে</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_PRESETS.filter((p) => p.category === cardMode).map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all ${
                  selectedPresetId === p.id
                    ? 'bg-stone-800 border-amber-500 text-amber-300 font-bold'
                    : 'bg-stone-900/80 border-stone-700/80 text-stone-300 hover:border-stone-500'
                }`}
              >
                {p.labelBn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Studio Controls + Live Canvas Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Article Picker (Only for News mode) */}
          {cardMode === 'news' && (
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                সংবাদ নির্বাচন করুন (Select Article):
              </label>
              <select
                value={currentArticleId}
                onChange={(e) => setCurrentArticleId(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-red-500"
              >
                {articles.map((a) => (
                  <option key={a.id} value={a.id}>
                    [{a.categorySlug}] {a.headlineBn.slice(0, 50)}...
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Format / Aspect Ratio */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">ক্যানভাস সাইজ:</label>
              <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800">
                <button
                  type="button"
                  onClick={() => setFormat('portrait')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    format === 'portrait' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Portrait (4:5)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('landscape')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    format === 'landscape' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Landscape (1.9:1)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">রঙের থিম:</label>
              <div className="flex gap-1.5 items-center pt-1">
                <button
                  type="button"
                  onClick={() => setTheme('crimson')}
                  className={`w-7 h-7 rounded-full bg-red-600 border-2 transition-transform ${
                    theme === 'crimson' ? 'border-white scale-110' : 'border-transparent opacity-70'
                  }`}
                  title="Crimson Red"
                />
                <button
                  type="button"
                  onClick={() => setTheme('emerald')}
                  className={`w-7 h-7 rounded-full bg-emerald-600 border-2 transition-transform ${
                    theme === 'emerald' ? 'border-white scale-110' : 'border-transparent opacity-70'
                  }`}
                  title="Emerald Islamic"
                />
                <button
                  type="button"
                  onClick={() => setTheme('gold')}
                  className={`w-7 h-7 rounded-full bg-amber-600 border-2 transition-transform ${
                    theme === 'gold' ? 'border-white scale-110' : 'border-transparent opacity-70'
                  }`}
                  title="Royal Gold"
                />
                <button
                  type="button"
                  onClick={() => setTheme('midnight')}
                  className={`w-7 h-7 rounded-full bg-blue-600 border-2 transition-transform ${
                    theme === 'midnight' ? 'border-white scale-110' : 'border-transparent opacity-70'
                  }`}
                  title="Midnight Blue"
                />
                <button
                  type="button"
                  onClick={() => setTheme('slate')}
                  className={`w-7 h-7 rounded-full bg-teal-600 border-2 transition-transform ${
                    theme === 'slate' ? 'border-white scale-110' : 'border-transparent opacity-70'
                  }`}
                  title="Slate Teal"
                />
              </div>
            </div>
          </div>

          {/* Kicker / Tag */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              হেডলাইন ব্যানার ট্যাগ (Kicker):
            </label>
            <input
              type="text"
              value={customKicker}
              onChange={(e) => setCustomKicker(e.target.value)}
              placeholder="e.g. পবিত্র কুরআন ও নববী নির্দেশনা"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Main Bangla Text / Quote */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              প্রধান বাংলা টেক্সট বা উক্তি (Headline / Quote):
            </label>
            <textarea
              rows={3}
              value={customTitleBn}
              onChange={(e) => setCustomTitleBn(e.target.value)}
              placeholder="এখানে কার্ডের মূল বাংলা বার্তা লিখুন..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* English Subtitle */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              ইংরেজি সাবটাইটেল (English Subtitle / Translation):
            </label>
            <input
              type="text"
              value={customTitleEn}
              onChange={(e) => setCustomTitleEn(e.target.value)}
              placeholder="English translation or theme..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Citation / Source */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              তথ্যসূত্র বা সনদ (Citation / Reference):
            </label>
            <input
              type="text"
              value={customCitation}
              onChange={(e) => setCustomCitation(e.target.value)}
              placeholder="e.g. সহীহ বুখারী: ৬০৯৪"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Font Scale */}
          <div>
            <div className="flex justify-between text-xs font-bold text-stone-300 mb-1">
              <span>ফন্ট স্কেল (Font Size):</span>
              <span className="font-mono text-stone-400">{fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}px</span>
            </div>
            <input
              type="range"
              min="-10"
              max="16"
              value={fontSizeOffset}
              onChange={(e) => setFontSizeOffset(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors shadow-md"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>ডাউনলোড করুন (High-Res PNG - {format === 'portrait' ? '1080×1350' : '1200×630'})</span>
            </button>

            {onPostToFacebook && (
              <button
                onClick={handlePublishToFacebook}
                disabled={isPosting || fbRemainingSlots <= 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg disabled:opacity-50"
              >
                <Share2 className="w-4 h-4" />
                <span>
                  {isPosting ? 'ফেসবুকে পোস্ট হচ্ছে...' : 'ফেসবুক পেজে পোস্ট করুন (Publish to Facebook Page)'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Live Canvas Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-stone-950 p-4 rounded-2xl border border-stone-800 min-h-[460px]">
          <div className="text-xs font-bold text-stone-400 mb-2 flex items-center justify-between w-full">
            <span>লাইভ প্রিভিউ ({format === 'portrait' ? '1080×1350 Portrait' : '1200×630 Landscape'})</span>
            <button
              onClick={renderPhotocutCanvas}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-white"
            >
              <RefreshCw className="w-3 h-3" />
              <span>রিফ্রেশ করুন</span>
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
                কার্ড রেন্ডারিং হচ্ছে...
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};
