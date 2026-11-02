import { NewsSource } from '../types';

export const INITIAL_SOURCES: NewsSource[] = [
  {
    id: 'src-bbc-world',
    name: 'BBC World News Service',
    feedUrl: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    categorySlug: 'international-news',
    language: 'en',
    isActive: true,
    fetchCount: 42,
    description: 'International reporting, verified global diplomacy, multilateral treaties and correspondent coverage.'
  },
  {
    id: 'src-nasa-breaking',
    name: 'NASA Science & Astrophysics News',
    feedUrl: 'https://www.nasa.gov/news-release/feed/',
    categorySlug: 'space-astronomy',
    language: 'en',
    isActive: true,
    fetchCount: 28,
    description: 'Official releases from NASA deep-space observatories, planetary rovers, and astrophysicists.'
  },
  {
    id: 'src-nature-science',
    name: 'Nature Research International',
    feedUrl: 'https://www.nature.com/nature.rss',
    categorySlug: 'science',
    language: 'en',
    isActive: true,
    fetchCount: 19,
    description: 'Peer-reviewed research breakthroughs, molecular biology, astrophysics, and climate modeling.'
  },
  {
    id: 'src-un-climate',
    name: 'UN Climate & Environment Bureau',
    feedUrl: 'https://news.un.org/feed/subscribe/en/news/topic/climate-change/feed/rss.xml',
    categorySlug: 'environment-climate',
    language: 'en',
    isActive: true,
    fetchCount: 15,
    description: 'United Nations environmental assemblies, IPCC assessments, and renewable transition metrics.'
  },
  {
    id: 'src-techcrunch',
    name: 'TechCrunch Global AI & Computing',
    feedUrl: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    categorySlug: 'ai-innovation',
    language: 'en',
    isActive: true,
    fetchCount: 31,
    description: 'Emerging artificial intelligence systems, foundation models, robotics, and computational ethics.'
  },
  {
    id: 'src-who-health',
    name: 'World Health Organization (WHO)',
    feedUrl: 'https://www.who.int/rss-feeds/news-english.xml',
    categorySlug: 'health',
    language: 'en',
    isActive: true,
    fetchCount: 22,
    description: 'Global epidemiology bulletins, health guidelines, and clinical advisory releases.'
  }
];
