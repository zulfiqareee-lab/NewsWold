export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  iconName: string;
  color: string;
  articleCount?: number;
}

export type ArticleStatus = 'pending' | 'under_review' | 'approved' | 'published' | 'rejected' | 'failed';

export interface FeaturedImage {
  url: string;
  prompt: string;
  model: string;
  generatedAt: string;
  aspectRatio: string;
  isAiGenerated: boolean;
  altTextEn: string;
  altTextBn: string;
}

export interface NewsSourceInfo {
  name: string;
  url: string;
  publishedAt: string;
  collectedAt: string;
  verified: boolean;
}

export interface DomainDisclaimer {
  type: 'health' | 'islamic' | 'jobs' | 'general';
  textEn: string;
  textBn: string;
}

export interface NewsArticle {
  id: string;
  headlineEn: string;
  headlineBn: string;
  summaryEn: string;
  summaryBn: string;
  contentEn: string;
  contentBn: string;
  categoryId: string;
  categorySlug: string;
  status: ArticleStatus;
  rejectionReason?: string;
  featuredImage: FeaturedImage;
  source: NewsSourceInfo;
  author: {
    nameEn: string;
    nameBn: string;
    roleEn: string;
    roleBn: string;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  viewsCount: number;
  sharesCount: number;
  readingTimeMinutes: number;
  keywords: string[];
  seo: {
    metaTitleEn: string;
    metaTitleBn: string;
    metaDescEn: string;
    metaDescBn: string;
  };
  domainDisclaimer?: DomainDisclaimer;
  facebookPost?: {
    posted: boolean;
    postId?: string;
    postedAt?: string;
    slot?: string;
    error?: string;
  };
}

export interface NewsSource {
  id: string;
  name: string;
  feedUrl: string;
  categorySlug: string;
  language: 'en' | 'bn';
  isActive: boolean;
  lastFetchedAt?: string;
  fetchCount: number;
  description: string;
}

export interface FacebookSettings {
  enabled: boolean;
  pageId: string;
  pageAccessToken: string;
  appSecret: string;
  autoPostApproved: boolean;
  dailyPostLimit: number; // Strictly 4 in Bangladesh time (Asia/Dhaka)
  preferredTimesDhaka: string[]; // ['08:00', '12:00', '16:00', '20:00']
}

export interface FacebookPostLog {
  id: string;
  articleId: string;
  headline: string;
  dateDhaka: string; // YYYY-MM-DD in Asia/Dhaka
  slot: string; // e.g. "08:00 AM"
  status: 'success' | 'failed' | 'skipped' | 'duplicate_prevented';
  fbPostId?: string;
  error?: string;
  timestamp: string;
}

export interface CopyrightComplaint {
  id: string;
  articleId: string;
  articleHeadline: string;
  complainantName: string;
  complainantEmail: string;
  complainantOrganization?: string;
  copyrightOwner: string;
  infringedWorkUrl: string;
  statementOfRights: string;
  explanation: string;
  status: 'pending' | 'investigating' | 'article_unpublished' | 'dismissed' | 'resolved';
  submittedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface WebsiteSettings {
  siteName: string;
  siteTaglineEn: string;
  siteTaglineBn: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  autoNewsFetchIntervalMinutes: number;
  aiNewsGenerationEnabled: boolean;
  aiImageGenerationEnabled: boolean;
  autoPublishDirectly?: boolean;
  facebookAutoPostEnabled: boolean;
  freeTierModeNotice: boolean;
}

export interface WeatherData {
  city: string;
  country: string;
  tempC: number;
  condition: string;
  conditionCode: number;
  humidity: number;
  windSpeedKmh: number;
  lastUpdated: string;
  isForecast?: boolean;
}

export interface CurrencyData {
  base: string;
  lastUpdated: string;
  rates: Record<string, number>;
}

// -----------------------------------------------------------------------------
// SHORT VIDEO & SOCIAL AUTOMATION TYPES (YouTube Shorts & Facebook Reels)
// -----------------------------------------------------------------------------

export interface VideoSubtitleCue {
  id: string;
  timeStart: number; // in seconds
  timeEnd: number;   // in seconds
  textEn: string;
  textBn: string;
}

export type VideoApprovalStatus = 'pending' | 'under_review' | 'approved' | 'published' | 'rejected' | 'failed';

export interface ShortVideoItem {
  id: string;
  articleId: string;
  headlineEn: string;
  headlineBn: string;
  categorySlug: string;
  categoryNameBn: string;
  durationSeconds: number; // 30-60s
  aspectRatio: '9:16';
  resolution: string; // e.g. "1080x1920"
  language: 'bn' | 'en' | 'bilingual';
  status: VideoApprovalStatus;
  rejectionReason?: string;
  
  // Scripts
  scriptEn: string;
  scriptBn: string;
  subtitles: VideoSubtitleCue[];
  
  // Audio & Voice Narration
  voiceover: {
    voiceType: 'ai-elevenlabs' | 'ai-gemini' | 'browser-speech';
    voiceNameEn: string;
    voiceNameBn: string;
    speed: number;
    pitch: number;
    audioUrlEn?: string;
    audioUrlBn?: string;
    complianceNote: string;
  };

  // Background Music
  backgroundMusic: {
    trackId: string;
    trackTitle: string;
    composer: string;
    licenseType: 'Royalty-Free Commercial' | 'Creative Commons CC-BY 4.0';
    licenseCertNumber: string;
    audioUrl: string;
    volume: number; // 0.0 to 1.0
  };

  // Visual Assets & Branding
  visuals: {
    primaryImageUrl: string;
    motionEffect: 'ken-burns' | 'slow-zoom' | 'pan-horizontal';
    watermarkText: string;
    hasTicker: boolean;
    hasWaveform: boolean;
  };

  // YouTube Shorts Publishing Metadata
  youtubeShort: {
    enabled: boolean;
    status: 'none' | 'pending' | 'approved' | 'scheduled' | 'published' | 'failed';
    title: string;
    description: string;
    tags: string[];
    videoId?: string;
    url?: string;
    scheduledAt?: string;
    publishedAt?: string;
    error?: string;
  };

  // Facebook Reels Publishing Metadata (strictly subject to shared 4/day Dhaka limit)
  facebookReel: {
    enabled: boolean;
    status: 'none' | 'pending' | 'approved' | 'scheduled' | 'published' | 'failed';
    caption: string;
    hashtags: string[];
    reelId?: string;
    url?: string;
    scheduledSlot?: string;
    scheduledAt?: string;
    publishedAt?: string;
    error?: string;
  };

  photocutCardUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhotocutCardConfig {
  id?: string;
  articleId: string;
  format: 'facebook-landscape' | 'facebook-portrait'; // 1200x630 or 1080x1350
  theme: 'crimson-breaking' | 'editorial-navy' | 'deep-slate' | 'emerald-world';
  languageMode: 'bn-primary' | 'en-primary' | 'bilingual';
  kickerTextEn: string;
  kickerTextBn: string;
  headlineEn: string;
  headlineBn: string;
  categorySlug: string;
  categoryNameBn: string;
  sourceName: string;
  imageUrl: string;
  dateDhaka: string;
  watermarkText: string;
}

export interface SocialAccountsConfig {
  youtube: {
    connected: boolean;
    channelId: string;
    channelTitle: string;
    customHandle: string;
    subscriberCount: number;
    automationActive: boolean;
    apiDailyQuotaUsed: number;
    apiDailyQuotaLimit: number;
    lastUploadAt?: string;
    defaultLanguage: 'bn' | 'en';
  };
  facebook: {
    connected: boolean;
    pageId: string;
    pageName: string;
    followerCount: number;
    automationActive: boolean;
    sharedDailyLimit: number; // Strictly 4 in Asia/Dhaka
    todaySuccessfulCount: number; // Shared for Reels + news posts
    remainingSlots: number;
    lastPublicationAt?: string;
    preferredSlotsDhaka: string[];
  };
}

