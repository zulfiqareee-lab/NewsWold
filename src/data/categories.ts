import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'international-news',
    nameEn: 'International News',
    nameBn: 'আন্তর্জাতিক সংবাদ',
    descriptionEn: 'Major geopolitical developments, global diplomacy, multilateral treaties, and worldwide events.',
    descriptionBn: 'প্রধান ভূ-রাজনৈতিক অগ্রগতি, আন্তর্জাতিক কূটনীতি, বহুপাক্ষিক চুক্তি এবং বিশ্বব্যাপী গুরুত্বপূর্ণ ঘটনা।',
    iconName: 'Globe2',
    color: '#1E3A8A' // Deep Lapis
  },
  {
    id: 'cat-2',
    slug: 'science',
    nameEn: 'Science',
    nameBn: 'বিজ্ঞান',
    descriptionEn: 'Breakthroughs in physics, chemistry, biology, materials science, and scientific research.',
    descriptionBn: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং আধুনিক বৈজ্ঞানিক গবেষণার যুগান্তকারী অগ্রগতি।',
    iconName: 'Microscope',
    color: '#0D9488'
  },
  {
    id: 'cat-3',
    slug: 'technology',
    nameEn: 'Technology',
    nameBn: 'প্রযুক্তি',
    descriptionEn: 'Computing, cybersecurity, semiconductors, digital infrastructure, and consumer electronics.',
    descriptionBn: 'কম্পিউটিং, সাইবার নিরাপত্তা, সেমিকন্ডাক্টর, ডিজিটাল অবকাঠামো এবং আধুনিক ইলেকট্রনিক্স।',
    iconName: 'Cpu',
    color: '#4F46E5'
  },
  {
    id: 'cat-4',
    slug: 'jobs-careers',
    nameEn: 'Jobs & Careers',
    nameBn: 'চাকরি ও ক্যারিয়ার',
    descriptionEn: 'Global workforce trends, remote career opportunities, skills demand, and verified employment openings.',
    descriptionBn: 'বিশ্বব্যাপী কর্মসংস্থানের ধারা, রিমোট জব সুযোগ, দক্ষতার চাহিদা এবং যাচাইকৃত চাকরির সংবাদ।',
    iconName: 'Briefcase',
    color: '#2563EB'
  },
  {
    id: 'cat-5',
    slug: 'education',
    nameEn: 'Education',
    nameBn: 'শিক্ষা',
    descriptionEn: 'International universities, scholarships, higher research, educational policy, and learning systems.',
    descriptionBn: 'আন্তর্জাতিক বিশ্ববিদ্যালয়, উচ্চশিক্ষা বৃত্তি, গবেষণা এবং আধুনিক শিক্ষাব্যবস্থার খবর।',
    iconName: 'GraduationCap',
    color: '#0284C7'
  },
  {
    id: 'cat-6',
    slug: 'islamic-knowledge',
    nameEn: 'Islamic Knowledge',
    nameBn: 'ইসলামিক জ্ঞান',
    descriptionEn: 'Verified Quranic teachings, authentic Hadith references, Islamic history, jurisprudence, and scholarly insights.',
    descriptionBn: 'কুরআন ও সহীহ হাদিসের নির্ভরযোগ্য তথ্য, ইসলামিক ইতিহাস, ফিকহ এবং বিজ্ঞ আলেমদের দিকনির্দেশনা।',
    iconName: 'BookOpen',
    color: '#15803D'
  },
  {
    id: 'cat-7',
    slug: 'health',
    nameEn: 'Health',
    nameBn: 'স্বাস্থ্য',
    descriptionEn: 'Global health research, public health advisories, medical science, nutrition, and wellness guidelines.',
    descriptionBn: 'বিশ্ব স্বাস্থ্য গবেষণা, জনস্বাস্থ্য নির্দেশনা, চিকিৎসা বিজ্ঞান, পুষ্টি এবং সুস্থ জীবনের তথ্য।',
    iconName: 'HeartPulse',
    color: '#DC2626'
  },
  {
    id: 'cat-8',
    slug: 'weather',
    nameEn: 'Weather',
    nameBn: 'আবহাওয়া',
    descriptionEn: 'Global meteorological forecasts, satellite weather patterns, seasonal shifts, and atmospheric phenomena.',
    descriptionBn: 'বিশ্বব্যাপী আবহাওয়ার পূর্বাভাস, স্যাটেলাইট তথ্য, ঋতু পরিবর্তন এবং বায়ুমণ্ডলীয় পরিবর্তন।',
    iconName: 'CloudSun',
    color: '#0891B2'
  },
  {
    id: 'cat-9',
    slug: 'currency',
    nameEn: 'Currency',
    nameBn: 'মুদ্রা বিনিময়',
    descriptionEn: 'Forex exchange rates, central bank currency policies, monetary reserves, and global market valuations.',
    descriptionBn: 'বৈদেশিক মুদ্রা বিনিময় হার, কেন্দ্রীয় ব্যাংকের মুদ্রানীতি এবং আন্তর্জাতিক মুদ্রা বাজার।',
    iconName: 'Coins',
    color: '#D97706'
  },
  {
    id: 'cat-10',
    slug: 'space-astronomy',
    nameEn: 'Space & Astronomy',
    nameBn: 'মহাকাশ ও জ্যোতির্বিজ্ঞান',
    descriptionEn: 'Deep space telescopes, planetary exploration, astrophysics, astronautics, and cosmic discoveries.',
    descriptionBn: 'মহাকাশ দূরবীন, গ্রহ অনুসন্ধান, জ্যোতির্বিজ্ঞান এবং মহাবিশ্বের বিস্ময়কর আবিষ্কার।',
    iconName: 'Telescope',
    color: '#6366F1'
  },
  {
    id: 'cat-11',
    slug: 'ai-innovation',
    nameEn: 'AI & Innovation',
    nameBn: 'কৃত্রিম বুদ্ধিমত্তা ও উদ্ভাবন',
    descriptionEn: 'Artificial intelligence research, generative models, robotics automation, and ethical technology paradigms.',
    descriptionBn: 'কৃত্রিম বুদ্ধিমত্তা গবেষণা, রোবোটিক্স, অটোমেশন এবং প্রযুক্তির ভবিষ্যৎ উদ্ভাবন।',
    iconName: 'Sparkles',
    color: '#7C3AED'
  },
  {
    id: 'cat-12',
    slug: 'finance-economy',
    nameEn: 'Finance & Economy',
    nameBn: 'অর্থনীতি ও ফাইন্যান্স',
    descriptionEn: 'Global trade flows, macroeconomic indicators, bond markets, commodity prices, and fiscal policies.',
    descriptionBn: 'আন্তর্জাতিক বাণিজ্য, সামষ্টিক অর্থনীতি, পণ্যবাজার এবং বৈশ্বিক আর্থিক নীতি।',
    iconName: 'TrendingUp',
    color: '#059669'
  },
  {
    id: 'cat-13',
    slug: 'environment-climate',
    nameEn: 'Environment & Climate',
    nameBn: 'পরিবেশ ও জলবায়ু',
    descriptionEn: 'Renewable energy transitions, conservation biology, climate agreements, and ecological resilience.',
    descriptionBn: 'নবায়নযোগ্য জ্বালানি রূপান্তর, জীববৈচিত্র্য সংরক্ষণ, জলবায়ু চুক্তি এবং পরিবেশ সুরক্ষা।',
    iconName: 'Leaf',
    color: '#16A34A'
  },
  {
    id: 'cat-14',
    slug: 'travel-discovery',
    nameEn: 'Travel & Discovery',
    nameBn: 'ভ্রমণ ও আবিষ্কার',
    descriptionEn: 'Unexplored destinations, international heritage expeditions, cultural travel guides, and wonders.',
    descriptionBn: 'বিশ্বের রোমাঞ্চকর গন্তব্য, আন্তর্জাতিক ঐতিহ্যবাহী স্থান এবং বিশ্ব ভ্রমণের রূপরেখা।',
    iconName: 'Compass',
    color: '#EA580C'
  },
  {
    id: 'cat-15',
    slug: 'history-culture',
    nameEn: 'History & Culture',
    nameBn: 'ইতিহাস ও সংস্কৃতি',
    descriptionEn: 'Archaeological discoveries, civilizational archives, world heritage traditions, and architectural legacies.',
    descriptionBn: 'প্রত্নতাত্ত্বিক নিদর্শন, মানব সভ্যতার ইতিহাস, বিশ্ব ঐতিহ্য এবং প্রাচীন স্থাপত্যের ইতিবৃত্ত।',
    iconName: 'Landmark',
    color: '#9333EA'
  },
  {
    id: 'cat-16',
    slug: 'motivation-lifestyle',
    nameEn: 'Motivation & Lifestyle',
    nameBn: 'অনুপ্রেরণা ও জীবনধারা',
    descriptionEn: 'Personal growth philosophies, cognitive habits, mindful living, productivity discipline, and life mastery.',
    descriptionBn: 'ব্যক্তিগত উন্নয়ন দর্শন, মানসিক প্রশান্তি, উৎপাদনশীলতা বৃদ্ধি এবং ইতিবাচক জীবনধারার দিকনির্দেশনা।',
    iconName: 'Flame',
    color: '#E11D48'
  }
];
