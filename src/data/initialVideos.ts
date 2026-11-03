import { ShortVideoItem } from '../types';

export const INITIAL_VIDEOS: ShortVideoItem[] = [
  {
    id: 'vid-short-01',
    articleId: 'nw-lead-01',
    headlineEn: 'Global Climate Summit Reaches Historic Clean Power Accord',
    headlineBn: 'বিশ্ব জলবায়ু সম্মেলনে ঐতিহাসিক সার্বজনীন নবায়নযোগ্য জ্বালানি চুক্তি স্বাক্ষর',
    categorySlug: 'environment-climate',
    categoryNameBn: 'পরিবেশ ও জলবায়ু',
    durationSeconds: 42,
    aspectRatio: '9:16',
    resolution: '1080x1920',
    language: 'bilingual',
    status: 'approved',
    scriptEn: 'In Geneva today, delegates from 190 nations concluded a landmark treaty to mobilize five hundred billion dollars for global clean power and grid infrastructure.',
    scriptBn: 'জেনেভায় অনুষ্ঠিত বিশ্ব জলবায়ু সম্মেলনে ১৯০টি দেশের প্রতিনিধিরা ৫০০ বিলিয়ন ডলারের একটি ঐতিহাসিক সার্বজনীন নবায়নযোগ্য জ্বালানি চুক্তিতে স্বাক্ষর করেছেন।',
    subtitles: [
      { id: 'sub-1', timeStart: 0, timeEnd: 6, textEn: 'Breaking News: Historic multilateral clean power treaty signed in Geneva.', textBn: 'ব্রেকিং নিউজ: জেনেভায় ঐতিহাসিক সার্বজনীন নবায়নযোগ্য জ্বালানি চুক্তি স্বাক্ষর।' },
      { id: 'sub-2', timeStart: 6, timeEnd: 15, textEn: '190 nations unite to mobilize $500 Billion for global grid decarbonization.', textBn: 'বিশ্বজুড়ে গ্রিড আধুনিকায়ন ও কার্বন হ্রাসে ১৯০টি দেশ ৫০০ বিলিয়ন ডলার তহবিলে একমত।' },
      { id: 'sub-3', timeStart: 15, timeEnd: 26, textEn: 'Phasing out unabated coal infrastructure before 2038 with verified audit benchmarks.', textBn: '২০৩৮ সালের মধ্যে কয়লাভিত্তিক কেন্দ্র পর্যায়ক্রমে বন্ধের কঠোর আন্তর্জাতিক মানদণ্ড নির্ধারণ।' },
      { id: 'sub-4', timeStart: 26, timeEnd: 42, textEn: 'Stay updated with verified international reporting on NEWS WORLD.', textBn: 'নিরপেক্ষ ও যাচাইকৃত আন্তর্জাতিক সংবাদের সাথে থাকুন — নিউজ ওয়ার্ল্ড।' }
    ],
    voiceover: {
      voiceType: 'ai-gemini',
      voiceNameEn: 'International Editorial Voice (Neural Studio)',
      voiceNameBn: 'বাংলা সংবাদ উপস্থাপক (স্টুডিও ভয়েস)',
      speed: 1.0,
      pitch: 1.0,
      complianceNote: 'Original neural voice synthesis generated specifically for NEWS WORLD broadcast.'
    },
    backgroundMusic: {
      trackId: 'track-pulse-01',
      trackTitle: 'Global Wire Pulse (Original Orchestral Edit)',
      composer: 'News World Soundworks',
      licenseType: 'Royalty-Free Commercial',
      licenseCertNumber: 'NW-LIC-2026-081',
      audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/scifi_hum.ogg',
      volume: 0.18
    },
    visuals: {
      primaryImageUrl: '/src/assets/images/news_world_hero_summit_1793632290118.jpg',
      motionEffect: 'ken-burns',
      watermarkText: 'NEWS WORLD | 9:16 HD',
      hasTicker: true,
      hasWaveform: true
    },
    youtubeShort: {
      enabled: true,
      status: 'approved',
      title: 'Historic $500B Clean Energy Accord Signed in Geneva #Shorts #NewsWorld',
      description: 'Delegates from 190 nations reach historic multilateral agreement on renewable grid financing. Full report on newsworld-portal.org\n\n#Shorts #CleanEnergy #ClimateAction #GlobalNews #NewsWorld',
      tags: ['Shorts', 'CleanEnergy', 'ClimateSummit', 'NewsWorld', 'InternationalNews', 'Geneva']
    },
    facebookReel: {
      enabled: true,
      status: 'approved',
      caption: 'জেনেভায় বিশ্ব জলবায়ু সম্মেলনে ঐতিহাসিক ৫০০ বিলিয়ন ডলারের সার্বজনীন নবায়নযোগ্য জ্বালানি চুক্তি স্বাক্ষর। পড়ুন newsworld-portal.org-এ। #Reels #NewsWorld #ClimateAccord',
      hashtags: ['Reels', 'NewsWorld', 'InternationalNews', 'BangladeshMedia'],
      scheduledSlot: '04:00 PM'
    },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'vid-short-02',
    articleId: 'nw-lead-02',
    headlineEn: 'Next-Gen Space Telescope Unveils Atmospheric Signature of Exoplanet K2-18b',
    headlineBn: 'বহির্গ্রহ কে২-১৮বি-তে জৈব মিথেন ও কার্বন অণুর স্পষ্ট উপস্থিতি নিশ্চিত করেছে মহাকাশ দূরবীক্ষণ যন্ত্র',
    categorySlug: 'space-astronomy',
    categoryNameBn: 'মহাকাশ ও জ্যোতির্বিজ্ঞান',
    durationSeconds: 38,
    aspectRatio: '9:16',
    resolution: '1080x1920',
    language: 'bilingual',
    status: 'pending',
    scriptEn: 'Deep-space spectroscopic data reveals definitive molecular biosignatures in the habitable zone of star system K2-18.',
    scriptBn: 'দূর মহাশূন্যে ১২০ আলোকবর্ষ দূরে অবস্থিত কে২-১৮ নক্ষত্রমণ্ডলের বসবাসযোগ্য অঞ্চলের বহির্গ্রহে জৈব বায়ুমণ্ডলীয় অণু শনাক্ত হয়েছে।',
    subtitles: [
      { id: 'sub-2-1', timeStart: 0, timeEnd: 7, textEn: 'Space Discovery: Chemical fingerprints of carbon molecules found 120 light-years away.', textBn: 'মহাকাশ গবেষণা: ১২০ আলোকবর্ষ দূরের গ্রহে মিথেন ও কার্বন অণুর সন্ধান।' },
      { id: 'sub-2-2', timeStart: 7, timeEnd: 18, textEn: 'Spectroscopic absorption confirms water vapor and potential ocean surface candidates.', textBn: 'বর্ণালী বিশ্লেষণ নিশ্চিত করেছে বায়ুমণ্ডলে জলীয় বাষ্প ও সম্ভাব্য মহাসাগরের উপস্থিতি।' },
      { id: 'sub-2-3', timeStart: 18, timeEnd: 28, textEn: 'Astrophysicists describe this as a critical milestone in search for habitable worlds.', textBn: 'জ্যোতির্বিজ্ঞানীদের মতে এটি বাসযোগ্য গ্রহ অনুসন্ধানের পথে যুগান্তকারী মাইলফলক।' },
      { id: 'sub-2-4', timeStart: 28, timeEnd: 38, textEn: 'Follow NEWS WORLD for daily verified science and space discoveries.', textBn: 'প্রতিদিনের সঠিক ও যাচাইকৃত মহাকাশ সংবাদের সাথে থাকুন — নিউজ ওয়ার্ল্ড।' }
    ],
    voiceover: {
      voiceType: 'ai-gemini',
      voiceNameEn: 'Science Desk Narrator',
      voiceNameBn: 'বিজ্ঞান সংবাদ ভাষ্যকার',
      speed: 1.0,
      pitch: 1.0,
      complianceNote: 'Voice generated under NEWS WORLD editorial copyright compliance charter.'
    },
    backgroundMusic: {
      trackId: 'track-ambient-02',
      trackTitle: 'Deep Space Horizon (CC-BY 4.0 Certified)',
      composer: 'Stellar Ambient Collective',
      licenseType: 'Creative Commons CC-BY 4.0',
      licenseCertNumber: 'NW-LIC-2026-094',
      audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/force_field.ogg',
      volume: 0.15
    },
    visuals: {
      primaryImageUrl: '/src/assets/images/news_world_space_telescope_1793632290606.jpg',
      motionEffect: 'slow-zoom',
      watermarkText: 'NEWS WORLD SPACE | 9:16',
      hasTicker: true,
      hasWaveform: true
    },
    youtubeShort: {
      enabled: true,
      status: 'pending',
      title: 'Atmospheric Biosignatures Confirmed on Exoplanet K2-18b! #Shorts #Space',
      description: 'Deep-space spectroscopic instruments detect carbon dioxide and methane in habitable zone planet. Details on newsworld-portal.org\n\n#Shorts #Space #Astronomy #Science #NewsWorld',
      tags: ['Shorts', 'Space', 'Astronomy', 'Exoplanet', 'NewsWorld']
    },
    facebookReel: {
      enabled: true,
      status: 'pending',
      caption: 'বহির্গ্রহ কে২-১৮বি-তে জৈব মিথেন ও কার্বন অণুর উপস্থিতি নিশ্চিত করেছে মহাকাশ দূরবীক্ষণ যন্ত্র। জানুন বিস্তারিত: newsworld-portal.org #Reels #Space #NewsWorld',
      hashtags: ['Reels', 'SpaceNews', 'Astronomy', 'NewsWorld'],
      scheduledSlot: '08:00 PM'
    },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];
