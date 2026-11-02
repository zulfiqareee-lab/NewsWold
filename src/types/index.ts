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
