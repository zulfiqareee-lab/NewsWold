import { NewsArticle } from '../types';

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'nw-lead-01',
    headlineEn: 'Global Climate & Energy Summit Reaches Historic Multilateral Clean Power Accord in Geneva',
    headlineBn: 'জেনেভায় ঐতিহাসিক বহুমুখী জ্বালানি রূপান্তর চুক্তিতে পৌঁছাল আন্তর্জাতিক জলবায়ু সম্মেলন',
    summaryEn: 'Delegations from sixty nations ratify unified funding mechanisms to accelerate offshore grid interconnections and phase down carbon reliance across three continents.',
    summaryBn: 'তিনটি মহাদেশ জুড়ে অফশোর গ্রিড সম্প্রসারণ এবং কার্বন নির্ভরতা হ্রাসে সমন্বিত তহবিল গঠনে একমত হয়েছেন ৬০টি দেশের প্রতিনিধিরা।',
    contentEn: `GENEVA — In an extraordinary round of marathon plenary deliberations, representatives from sixty national governments and global regulatory bodies concluded a landmark multilateral treaty establishing unified capital allocations for transnational clean energy grids.

The agreement, designated the Geneva Transcontinental Power Compact, provides direct fiscal commitments exceeding $140 billion dedicated toward constructing cross-border offshore transmission corridors. By linking high-yield wind corridors in the North Sea with distributed solar arrays across Mediterranean and North African hubs, the initiative aims to stabilize grid fluctuations and eliminate redundant fossil reserves.

"Modern climate resilience requires shared physical infrastructure rather than isolated national targets," stated Dr. Elena Rostova, special rapporteur for multilateral energy transitions. "This accord transitions multilateral commitments from abstract emissions targets to concrete copper-and-silicon reality."

The compact also institutes rigorous transparency protocols for critical mineral supply chains, ensuring lithium, copper, and rare-earth extraction adheres to binding environmental and community protection benchmarks. Implementation will be monitored biannually through an independent joint technical committee convened under international auspices.`,
    contentBn: `জেনেভা — দীর্ঘ আলোচনার পর ৬০টি দেশের প্রতিনিধি এবং আন্তর্জাতিক নীতিনির্ধারকেরা আন্তঃসীমান্ত পরিবেশবান্ধব জ্বালানি গ্রিড সম্প্রসারণের লক্ষ্যে একটি ঐতিহাসিক বহুপাক্ষিক চুক্তি স্বাক্ষর করেছেন।

'জেনেভা ট্রান্সকন্টিনেন্টাল পাওয়ার কম্প্যাক্ট' শীর্ষক এই চুক্তির আওতায় ১৪০ বিলিয়ন ডলারের বেশি তহবিল বরাদ্দ করা হয়েছে, যা মূলত মহাদেশীয় ট্রান্সমিশন করিডোর নির্মাণে ব্যবহৃত হবে। উত্তর সাগরের অফশোর উইন্ড করিডোরের সাথে ভূমধ্যসাগরীয় এবং উত্তর আফ্রিকার সৌরবিদ্যুৎ গ্রিড সংযুক্ত করার মাধ্যমে বিদ্যুৎ সরবরাহের তারতম্য দূর করা এবং জীবাশ্ম জ্বালানির ওপর নির্ভরতা উল্লেখযোগ্য হারে কমানোই এর মূল লক্ষ্য।

সম্মেলনের বিশেষ পর্যবেক্ষক ড. এলেনা রোস্তোভা বলেন, "আজকের বিশ্বে জলবায়ু সংকট মোকাবিলার জন্য একক প্রচেষ্টার চেয়ে যৌথ আন্তর্জাতিক অবকাঠামো গড়ে তোলা অনেক বেশি জরুরি। এই চুক্তি শুধুমাত্র ঘোষণার মধ্যে সীমাবদ্ধ না থেকে বাস্তবায়নের রূপরেখা তৈরি করেছে।"

চুক্তিতে ব্যাটারি ও সোলার প্যানেলের জন্য প্রয়োজনীয় খনিজ সম্পদ উত্তোলনে পরিবেশ ও স্থানীয় জনগোষ্ঠীর সুরক্ষা নিশ্চিত করার বিষয়েও কঠোর নির্দেশনা দেওয়া হয়েছে। একটি যৌথ স্বাধীন কারিগরি কমিটির তত্ত্বাবধানে প্রতি দুই বছর পর পর এর অগ্রগতি পর্যালোচনা করা হবে।`,
    categoryId: 'cat-1',
    categorySlug: 'international-news',
    status: 'published',
    featuredImage: {
      url: '/src/assets/images/news_world_hero_summit_1793632290118.jpg',
      prompt: 'High-contrast documentary editorial photo of global leaders and scientists gathered around a circular international climate and energy summit table, natural dramatic lighting, muted color grading',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-11-01T14:30:00Z',
      aspectRatio: '16:9',
      isAiGenerated: true,
      altTextEn: 'International climate and energy summit delegates deliberating in Geneva',
      altTextBn: 'জেনেভায় আন্তর্জাতিক জলবায়ু ও জ্বালানি সম্মেলনে প্রতিনিধিদের আলোচনা'
    },
    source: {
      name: 'United Nations Information Service',
      url: 'https://www.ungeneva.org/en/news-media',
      publishedAt: '2026-11-01T12:00:00Z',
      collectedAt: '2026-11-01T13:15:00Z',
      verified: true
    },
    author: {
      nameEn: 'Julian Vance & Editorial Bureau',
      nameBn: 'জুলিয়ান ভ্যান্স ও সম্পাদকীয় ডেস্ক',
      roleEn: 'Senior Geopolitical Correspondent',
      roleBn: 'জ্যেষ্ঠ আন্তর্জাতিক প্রতিবেদক'
    },
    publishedAt: '2026-11-01T15:00:00Z',
    createdAt: '2026-11-01T13:30:00Z',
    updatedAt: '2026-11-01T15:00:00Z',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    viewsCount: 14200,
    sharesCount: 1240,
    readingTimeMinutes: 4,
    keywords: ['Geneva Summit', 'Clean Energy Accord', 'Global Grid', 'Climate Finance'],
    seo: {
      metaTitleEn: 'Global Climate & Energy Summit Reaches Historic Accord in Geneva - NEWS WORLD',
      metaTitleBn: 'জেনেভায় ঐতিহাসিক বহুমুখী জ্বালানি রূপান্তর চুক্তি - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'Sixty nations ratify Geneva Transcontinental Power Compact to build cross-border green electricity corridors.',
      metaDescBn: 'জেনেভায় ৬০ দেশের উপস্থিতিতে ঐতিহাসিক গ্রিন এনার্জি গ্রিড চুক্তি স্বাক্ষরিত।'
    },
    domainDisclaimer: {
      type: 'general',
      textEn: 'Verified international diplomatic reporting compiled from accredited multilateral press briefings.',
      textBn: 'স্বীকৃত বহুপাক্ষিক প্রেস ব্রিফিং থেকে সংকলিত যাচাইকৃত আন্তর্জাতিক সংবাদ প্রতিবেদন।'
    },
    facebookPost: {
      posted: true,
      postId: 'fb_post_8839211029',
      postedAt: '2026-11-01T16:00:00Z',
      slot: '04:00 PM'
    }
  },
  {
    id: 'nw-lead-02',
    headlineEn: 'Astrophysicists Unveil Deep-Field Spectra Confirming Water Vapor and Hydrocarbons on Exoplanet K2-18b',
    headlineBn: 'বহির্গ্রহ কে২-১৮বি তে জলীয় বাষ্প ও হাইড্রোকার্বনের সুনির্দিষ্ট বর্ণালী উন্মোচন করলেন জ্যোতির্বিজ্ঞানীরা',
    summaryEn: 'High-resolution transmission spectroscopy observations reveal chemical signatures of atmospheric water and methane within the habitable zone of an M-dwarf star.',
    summaryBn: 'এম-বামন নক্ষত্রের বাসযোগ্য অঞ্চলের গ্রহ কে২-১৮বি এর বায়ুমণ্ডলে জলীয় বাষ্প ও জৈব রাসায়নিক উপাদান শনাক্ত করল হাবল ও ওয়েব দূরবীক্ষণ দল।',
    contentEn: `BALTIMORE — An international consortia of astrophysicists utilizing combined spectroscopic data from deep-space space telescopes has released definitive transmission spectra for temperate sub-Neptune exoplanet K2-18b, confirming the distinct presence of water vapor and hydrocarbon compounds.

Orbiting within the circumstellar habitable zone of host star K2-18 roughly 120 light-years from Earth in the constellation Leo, the planet possesses approximately 8.6 times the mass of Earth. New infrared filter sweeps captured during stellar transit events eliminated previous noise ambiguity, distinguishing atmospheric methane and dimethyl sulfide candidates with greater than 4-sigma statistical confidence.

"For the first time, our observational data surpasses mere structural modeling," noted lead co-investigator Dr. Marcus Lindqvist. "We are measuring the precise atmospheric photochemical balance of a world with oceans potentially shielded beneath a dense hydrogen-rich envelope."

While researchers emphasize that hydrocarbon markers alone do not establish biological activity, the planet presents an unprecedented laboratory for testing atmospheric circulation models and photochemical reactions outside our solar system. Further observations planned for late 2026 will measure isotopic ratios of atmospheric carbon to further constrain surface temperature estimates.`,
    contentBn: `বাল্টিমোর — পৃথিবীর বাইরে মহাবিশ্বে প্রাণের পরিবেশ সন্ধানে এক বিশাল অগ্রগতি অর্জন করেছেন আন্তর্জাতিক জ্যোতির্বিজ্ঞানীরা। মহাশূন্যে স্থাপিত গভীর পর্যবেক্ষণ দূরবীন থেকে প্রাপ্ত তথ্যের ভিত্তিতে কে২-১৮বি নামের বহির্গ্রহটিতে জলীয় বাষ্প এবং হাইড্রোকার্বন যৌগের জোরালো প্রমাণ পাওয়া গেছে।

সিংহ রাশিমণ্ডলে পৃথিবী থেকে প্রায় ১২০ আলোকবর্ষ দূরে অবস্থিত এই গ্রহটি তার নক্ষত্রের 'বাসযোগ্য অঞ্চল' (হ্যাবিটেবল জোন)-এর মধ্যে প্রদক্ষিণ করছে। এর ভর পৃথিবীর প্রায় ৮.৬ গুণ। নক্ষত্র অতিক্রমণের সময় অবলোহিত তরঙ্গদৈর্ঘ্যে ধারণ করা সাম্প্রতিক বর্ণালী পরীক্ষায় বায়ুমণ্ডলে মিথেন ও গুরুত্বপূর্ণ রাসায়নিক উপাদানের উপস্থিতি চার-সিগমা পরিসংখ্যানিক নির্ভুলতায় নিশ্চিত করা সম্ভব হয়েছে।

গবেষক দলের অন্যতম প্রধান বিজ্ঞানী ড. মার্কাস লিন্ডকভিস্ট জানান, "এটি কেবল তাত্ত্বিক ধারণা নয়; বরং সুনির্দিষ্ট বৈজ্ঞানিক তথ্যের ওপর ভিত্তি করে জানা গেছে যে গ্রহটির ঘন বায়ুমণ্ডলের নিচে তরল মহাসাগর থাকার সম্ভাবনা রয়েছে।"

তবে বিজ্ঞানীরা স্পষ্ট করেছেন যে, হাইড্রোকার্বনের উপস্থিতি সরাসরি প্রাণের প্রমাণ নয়; বরং তা পরিবেশের রাসায়নিক গঠন বোঝার এক গুরুত্বপূর্ণ ধাপ। সৌরজগতের বাইরের গ্রহগুলোর তাপমাত্রা ও বায়ুমণ্ডলীয় আচরণ বোঝার জন্য এই আবিষ্কার এক নতুন দিগন্ত উন্মোচন করেছে।`,
    categoryId: 'cat-10',
    categorySlug: 'space-astronomy',
    status: 'published',
    featuredImage: {
      url: '/src/assets/images/news_world_space_telescope_1793632290606.jpg',
      prompt: 'Cinematic wide photograph of a deep-space deep-field observation control room with astronomers looking at cosmic nebula and stellar spectra on wide monitors',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-11-01T16:00:00Z',
      aspectRatio: '16:9',
      isAiGenerated: true,
      altTextEn: 'Astronomers analyzing deep field exoplanet spectra in control facility',
      altTextBn: 'পর্যবেক্ষণ কেন্দ্রে দূরবর্তী গ্রহের রাসায়নিক বর্ণালী বিশ্লেষণ করছেন বিজ্ঞানীরা'
    },
    source: {
      name: 'European Space Agency & NASA Science Directorate',
      url: 'https://science.nasa.gov/astrophysics',
      publishedAt: '2026-11-01T15:00:00Z',
      collectedAt: '2026-11-01T15:45:00Z',
      verified: true
    },
    author: {
      nameEn: 'Dr. Tariq Al-Mansoor',
      nameBn: 'ড. তারিক আল-মানসুর',
      roleEn: 'Science & Aerospace Editor',
      roleBn: 'বিজ্ঞান ও মহাকাশ সম্পাদক'
    },
    publishedAt: '2026-11-01T17:30:00Z',
    createdAt: '2026-11-01T16:15:00Z',
    updatedAt: '2026-11-01T17:30:00Z',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    viewsCount: 9850,
    sharesCount: 740,
    readingTimeMinutes: 3,
    keywords: ['Space Exploration', 'Exoplanet K2-18b', 'James Webb Telescope', 'Water Vapor in Space'],
    seo: {
      metaTitleEn: 'Astrophysicists Unveil Water Vapor and Hydrocarbons on Exoplanet K2-18b - NEWS WORLD',
      metaTitleBn: 'কে২-১৮বি গ্রহে জলীয় বাষ্প ও রাসায়নিক বর্ণালী নিশ্চিত করলেন বিজ্ঞানীরা - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'Spectroscopic analysis confirms water vapor, methane, and atmospheric organics on exoplanet K2-18b.',
      metaDescBn: '১২০ আলোকবর্ষ দূরের গ্রহে জলীয় বাষ্প ও বায়ুমণ্ডলের উপস্থিতি নিশ্চিত হয়েছে।'
    },
    domainDisclaimer: {
      type: 'general',
      textEn: 'Peer-reviewed spectroscopic data verified through astrophysical observatory releases.',
      textBn: 'মহাকাশ গবেষণা সংস্থার পিয়ার-রিভিউড তথ্যের ভিত্তিতে প্রকাশিত বৈজ্ঞানিক সংবাদ।'
    }
  },
  {
    id: 'nw-lead-03',
    headlineEn: 'Bionic Neural Hand Prototype Restores Sub-Millimeter Proprioception in International Clinical Trials',
    headlineBn: 'আন্তর্জাতিক ক্লিনিক্যাল ট্রায়ালে সাব-মিলিমিটার সংবেদনশীলতা ফিরিয়ে আনল নতুন বায়োনিক কৃত্রিম হাত',
    summaryEn: 'Bioengineering researchers combine microelectrode arrays with real-time tactile feedback neural models, enabling amputees to perceive micro-textures without visual guidance.',
    summaryBn: 'বায়োমেডিকেল গবেষক দল মাইক্রোইলেকট্রোড অ্যারে ও আধুনিক নিউরাল মডেলের সমন্বয়ে কৃত্রিম হাতে সূক্ষ্ম স্পর্শানুভূতি নিশ্চিত করেছেন।',
    contentEn: `ZURICH — In a significant milestone for biomedical neural prosthetics, a multicenter clinical trial published preliminary findings demonstrating that bilateral amputees achieved sub-millimeter tactile perception using an advanced closed-loop bionic hand.

The technology integrates direct peripheral nerve cuff electrodes with localized micro-actuators embedded across titanium-carbon fingertips. A low-latency neuromorphic edge processor translates surface shear forces and texture frequencies into biocompatible neural pulse trains, mimicking natural human mechanoreceptors (Merkel discs and Meissner corpuscles).

During blindfolded laboratory evaluation across thirty test subjects, participants successfully identified fabrics, measured eggshell fragility without breakage, and manipulated precision lab tweezers with a 94.8% success rate.

"The patient does not simply manipulate an external tool; their somatosensory cortex recognizes the prosthetic as an integrated limb," explained chief investigator Dr. Sofia Chen. The research team noted that regulatory submission for medical device clearance will commence across European and North American agencies in mid-2027.`,
    contentBn: `জুরিখ — বায়োমেডিকেল প্রকৌশলে এক বিশাল অগ্রগতি সাধন করেছেন সুইজারল্যান্ড ও আন্তর্জাতিক গবেষক দল। নতুন এক ট্রায়ালে দেখা গেছে, উন্নত ক্লোজড-লুপ বায়োনিক হাতের মাধ্যমে কৃত্রিম অঙ্গে মানুষের স্বাভাবিক স্পর্শানুভূতি এবং সূক্ষ্ম টেক্সচার অনুভব করার ক্ষমতা ফিরিয়ে আনা সম্ভব হয়েছে।

এই প্রযুক্তিতে হাতের আঙ্গুলের ডগায় অবস্থিত বিশেষ সেন্সর এবং কব্জির নার্ভের সাথে সরাসরি সংযুক্ত মাইক্রোইলেকট্রোডের সমন্বয় ঘটানো হয়েছে। কোনো বস্তুকে স্পর্শ করলে কৃত্রিম হাতের প্রসেসরটি অতিদ্রুত মস্তিষ্কের গ্রহণোপযোগী বৈদ্যুতিক সংকেতে রূপান্তর করে, যার ফলে ব্যক্তি চোখ বন্ধ রেখেই বস্তুটি নরম, শক্ত, পিচ্ছিল নাকি খসখসে তা নির্ভুলভাবে অনুভব করতে পারেন।

৩০ জন অংশগ্রহণকারীর ওপর পরিচালিত পরীক্ষায় দেখা গেছে, রোগীরা অত্যন্ত ভঙ্গুর জিনিস ভাঙা ছাড়াই তুলে নিতে পেরেছেন এবং সূক্ষ্ম কাজ যেমন সুই-সুতো বা যন্ত্রাংশ নাড়াচাড়া করতে সক্ষম হয়েছেন।

গবেষক দলের প্রধান ড. সোফিয়া চেন বলেন, "ব্যবহারকারীরা এটিকে কেবল বাইরের একটি যন্ত্র হিসেবে নয়, বরং নিজের শরীরের একটি স্বাভাবিক অংশ হিসেবেই অনুভব করতে শুরু করেন।" ২০২৭ সালের মধ্যে সাধারণ চিকিৎসা ব্যবহারের জন্য এটি আন্তর্জাতিক স্বাস্থ্য কর্তৃপক্ষের অনুমোদন প্রক্রিয়ায় প্রবেশ করবে।`,
    categoryId: 'cat-11',
    categorySlug: 'ai-innovation',
    status: 'published',
    featuredImage: {
      url: '/src/assets/images/news_world_ai_robotics_1793632291267.jpg',
      prompt: 'Documentary editorial photograph of international robotics engineers working on a precision bionic hand in a modern research laboratory',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-11-01T17:00:00Z',
      aspectRatio: '4:3',
      isAiGenerated: true,
      altTextEn: 'Biomedical engineering team assembling bionic neural prosthetic hand',
      altTextBn: 'আধুনিক ল্যাবরেটরিতে বায়োনিক কৃত্রিম হাত পরীক্ষা করছেন প্রকৌশলীরা'
    },
    source: {
      name: 'Swiss Federal Institute of Technology (ETH Zurich)',
      url: 'https://ethz.ch/en/news-and-events',
      publishedAt: '2026-11-01T14:00:00Z',
      collectedAt: '2026-11-01T16:30:00Z',
      verified: true
    },
    author: {
      nameEn: 'Amina Chowdhury & Tech Desk',
      nameBn: 'আমিনা চৌধুরী ও প্রযুক্তি বিভাগ',
      roleEn: 'Bioengineering & AI Editor',
      roleBn: 'বায়োটেক ও এআই প্রতিবেদক'
    },
    publishedAt: '2026-11-01T18:00:00Z',
    createdAt: '2026-11-01T16:45:00Z',
    updatedAt: '2026-11-01T18:00:00Z',
    isBreaking: false,
    isFeatured: true,
    isTrending: false,
    viewsCount: 6540,
    sharesCount: 520,
    readingTimeMinutes: 4,
    keywords: ['Bionic Hand', 'Neural Interface', 'Bioengineering', 'Prosthetics Innovation'],
    seo: {
      metaTitleEn: 'Bionic Neural Hand Restores Proprioception in Clinical Trials - NEWS WORLD',
      metaTitleBn: 'বায়োনিক কৃত্রিম হাতে সূক্ষ্ম স্পর্শানুভূতি নিশ্চিত করলেন বিজ্ঞানীরা - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'Clinical trials demonstrate sub-millimeter tactile perception in amputees using closed-loop neuromorphic bionic hand.',
      metaDescBn: 'মানুষের স্বাভাবিক নার্ভের অনুকরণে তৈরি বায়োনিক হাতের সফল ট্রায়াল সম্পন্ন।'
    },
    domainDisclaimer: {
      type: 'health',
      textEn: 'Educational and scientific news reporting only. This does not constitute clinical medical advice or individualized diagnosis.',
      textBn: 'কেবল শিক্ষামূলক ও বিজ্ঞান সংবাদ। এটি কোনো ব্যক্তিগত চিকিৎসা পরামর্শ বা ক্লিনিক্যাল ব্যবস্থা হিসেবে প্রযোজ্য নয়।'
    }
  },
  {
    id: 'nw-lead-04',
    headlineEn: 'North Sea Offshore Wind Consortium Commission World First 1.2-Gigawatt Floating Array',
    headlineBn: 'উত্তর সাগরে চালু হলো বিশ্বের প্রথম ১.২ গিগাওয়াট ভাসমান অফশোর বায়ুবিদ্যুৎ প্রকল্প',
    summaryEn: 'Deep-water tethered turbines connected to synthetic subsea sub-stations begin commercial operation, supplying power to 1.4 million homes.',
    summaryBn: 'গভীর সমুদ্রে স্থাপিত ভাসমান টারবাইন ও আধুনিক সাবসি সাব-স্টেশনের সমন্বয়ে ১৪ লাখ পরিবারের জন্য বিদ্যুৎ সরবরাহ শুরু হয়েছে।',
    contentEn: `STAVANGER — A five-nation maritime energy consortium has officially commissioned the first commercial phase of the North Sea Floating Power Project, activating 1.2 gigawatts of sustained generating capacity in waters exceeding 180 meters depth.

Unlike conventional fixed-bottom turbines constrained to shallow continental shelves, the installation utilizes tension-leg spar platforms anchored via high-tensile synthetic tendons. The configuration allows exploitation of steady, high-velocity oceanic winds previously inaccessible to commercial power generation.

Over seventy-five 16-megawatt turbines are synchronized through automated undersea converter stations, feeding high-voltage direct current (HVDC) connections into mainland distribution hubs across northern Europe.

"Deep-water floating offshore wind opens access to more than 80% of global offshore wind energy potential," said project director Henrik Lindegaard. "This commercial operational milestone proves that deep marine environments can deliver baseload renewable reliability at scale."`,
    contentBn: `স্টাভাঞ্জার — ইউরোপের পাঁচটি দেশের যৌথ উদ্যোগে উত্তর সাগরে গভীর পানির ওপর বিশ্বের প্রথম ১.২ গিগাওয়াটের বাণিজ্যিকভাবে সফল ভাসমান বায়ুবিদ্যুৎ প্রকল্প চালু হয়েছে।

প্রচলিত টারবাইনগুলো সমুদ্রের অগভীর তলায় স্থায়ীভাবে স্থাপন করতে হতো, কিন্তু এই নতুন প্রকল্পে ১৮০ মিটারের চেয়েও গভীর পানিতে বিশেষ ফ্লোটিং প্ল্যাটফর্ম ব্যবহার করা হয়েছে। উচ্চ ক্ষমতাসম্পন্ন তারের সাহায্যে সমুদ্রের তলদেশে নোঙর করা এই টারবাইনগুলো উচ্চগতির নিরবচ্ছিন্ন সামুদ্রিক বাতাস থেকে বিপুল বিদ্যুৎ উৎপাদন করতে সক্ষম।

মোট ৭৫টি ১৬ মেগাওয়াট ক্ষমতার টারবাইন গভীর সমুদ্রের তলদেশে স্থাপিত সাবসি সাব-স্টেশনের সাথে যুক্ত। সেখান থেকে উচ্চ ভোল্টেজের হাই-ভোল্টেজ ডিরেক্ট কারেন্ট (HVDC) লাইনের মাধ্যমে মূল ভূখণ্ডের গ্রিডে বিদ্যুৎ পাঠানো হচ্ছে, যা প্রায় ১৪ লাখ পরিবারের বিদ্যুৎ চাহিদা পূরণ করবে।

প্রকল্প পরিচালক হেনরিক লিন্ডেগার্ড বলেন, "গভীর সমুদ্রে ভাসমান বায়ুবিদ্যুৎ প্রকল্পের সফল বাস্তবায়ন প্রমাণ করে যে নবায়নযোগ্য শক্তির পরিধি এখন বহুগুণে বৃদ্ধি পেয়েছে এবং তা সমুদ্র উপকূলীয় দেশের ভবিষ্যৎ অর্থনীতিতে বড় ভূমিকা রাখবে।"`,
    categoryId: 'cat-13',
    categorySlug: 'environment-climate',
    status: 'published',
    featuredImage: {
      url: '/src/assets/images/news_world_clean_energy_1793632291151.jpg',
      prompt: 'Wide angle landscape photograph of offshore floating wind turbines and solar research floating arrays in the North Sea at dusk, editorial documentary photojournalism',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-11-01T17:30:00Z',
      aspectRatio: '16:9',
      isAiGenerated: true,
      altTextEn: 'Floating offshore wind farm operating in deep North Sea waters',
      altTextBn: 'উত্তর সাগরে বাণিজ্যিকভাবে কার্যকর গভীর সমুদ্রের ভাসমান উইন্ডমিল প্রকল্প'
    },
    source: {
      name: 'International Renewable Energy Agency (IRENA)',
      url: 'https://www.irena.org/News',
      publishedAt: '2026-11-01T15:30:00Z',
      collectedAt: '2026-11-01T17:10:00Z',
      verified: true
    },
    author: {
      nameEn: 'Evelyn Carter',
      nameBn: 'ইভলিন কার্টার',
      roleEn: 'Renewable Energy Analyst',
      roleBn: 'জ্বালানি অর্থনীতি গবেষক'
    },
    publishedAt: '2026-11-01T19:00:00Z',
    createdAt: '2026-11-01T17:25:00Z',
    updatedAt: '2026-11-01T19:00:00Z',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    viewsCount: 4890,
    sharesCount: 310,
    readingTimeMinutes: 3,
    keywords: ['Floating Offshore Wind', 'Renewable Energy', 'North Sea Grid', 'Climate Innovation'],
    seo: {
      metaTitleEn: 'World First 1.2 GW Floating Offshore Wind Array Commissioned - NEWS WORLD',
      metaTitleBn: 'উত্তর সাগরে চালু হলো বিশ্বের প্রথম ১.২ গিগাওয়াট ভাসমান উইন্ডমিল প্রকল্প - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'Five-nation consortium commissions 1.2 GW floating offshore wind farm in deep North Sea waters.',
      metaDescBn: 'গভীর সমুদ্রে ভাসমান বায়ুবিদ্যুৎ থেকে ১৪ লাখ পরিবারের জন্য বিদ্যুৎ সরবরাহ শুরু।'
    },
    domainDisclaimer: {
      type: 'general',
      textEn: 'Verified engineering and clean energy infrastructure reporting.',
      textBn: 'পরিবেশবান্ধব জ্বালানি অবকাঠামো সংক্রান্ত যাচাইকৃত তথ্য।'
    }
  },
  {
    id: 'nw-islamic-01',
    headlineEn: 'Preserving Moral Integrity in the Age of Digital Automation: Lessons from Islamic Ethics',
    headlineBn: 'ডিজিটাল প্রযুক্তির যুগে আত্মশুদ্ধি ও সততা রক্ষা: ইসলামিক নীতিশাস্ত্রের শিক্ষা',
    summaryEn: 'Scholars reflect on accountability (Muhasabah), truthful speech, and ethical responsibility when interacting with artificial media and automated communication.',
    summaryBn: 'কৃত্রিম বুদ্ধিমত্তা ও ডিজিটাল মাধ্যমে মিথ্যা তথ্য পরিহার, আমানত রক্ষা এবং আত্মশুদ্ধির (মুহাসাবাহ) গুরুত্ব নিয়ে ইসলামিক বিশেষজ্ঞদের পর্যালোচনা।',
    contentEn: `AMMAN — Islamic scholars and ethicists participating in the International Conference on Applied Ethics convened in Amman highlighted the timeless guidance of the Holy Quran and authentic Sunnah regarding truthful speech, social responsibility, and accountability in an increasingly automated world.

The scholars emphasized that modern technological conveniences do not alter core ethical mandates: every communication carries accountability before Allah Subhanahu wa Ta'ala. The symposium examined verse 70 of Surah Al-Ahzab: "O you who have believed, fear Allah and speak words of appropriate justice." (Quran 33:70).

Furthermore, referencing the authentic Hadith narrated by Abdullah ibn Mas'ud in Sahih al-Bukhari (Book 73, Hadith 116) and Sahih Muslim: The Messenger of Allah (peace and blessings be upon him) said: "Truthfulness leads to righteousness, and righteousness leads to Paradise... and beware of lying, for lying leads to wickedness, and wickedness leads to the Fire."

The panel concluded that publishing unverified information or generating deceptive representations violates the fundamental Islamic principle of Amanah (trust). Muslims in journalism, data science, and public communication are urged to exercise meticulous verification (Tabayyun), as commanded in Surah Al-Hujurat (49:6).`,
    contentBn: `আম্মান — জর্ডানের রাজধানী আম্মানে আয়োজিত ফলিত নীতিশাস্ত্র বিষয়ক আন্তর্জাতিক সেমিনারে ইসলামিক চিন্তাবিদ ও গবেষকেরা ডিজিটাল যুগে সত্যবাদিতা, আমানত রক্ষা এবং আত্মশুদ্ধির ওপর বিশেষ গুরুত্বারোপ করেছেন।

আলোচকরা উল্লেখ করেন, প্রযুক্তি যত আধুনিকই হোক না কেন, ব্যক্তিগত ও সামাজিক জীবনে আল্লাহ সুবহানাহু ওয়া তাআলার নিকট জবাবদিহিতার অনুভূতি বজায় রাখা অপরিহার্য। পবিত্র কুরআনের সূরা আল-আহযাবের ৭০ নম্বর আয়াতে বলা হয়েছে: "হে ঈমানদারগণ! তোমরা আল্লাহকে ভয় কর এবং সঠিক ও স্পষ্ট কথা বল।" (সূরা আল-আহযাব: ৭০)।

এছাড়া সহীহ বুখারী (হাদিস নং ৬০৯৪) ও সহীহ মুসলিমে হযরত আব্দুল্লাহ ইবনে মাসউদ (রা.) থেকে বর্ণিত নির্ভরযোগ্য হাদিস উল্লেখ করে বক্তারা বলেন, রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) ইরশাদ করেছেন: "তোমরা সত্য অবলম্বন কর, কেননা সত্য সততার দিকে পরিচালিত করে এবং সততা জান্নাতের পথ দেখায়। আর তোমরা মিথ্যা থেকে বেঁচে থাক, কেননা মিথ্যা পাপাচারের দিকে নিয়ে যায় এবং পাপাচার জাহান্নামে নিক্ষেপ করে।"

সেমিনারে সিদ্ধান্ত নেওয়া হয় যে, সাংবাদিকতা ও প্রযুক্তির যুগে যাচাইহীন তথ্য ছড়ানো বা কৃত্রিম বিভ্রান্তি সৃষ্টি করা ইসলামের 'আমানতদারি' নীতিমালার পরিপন্থী। পবিত্র কুরআনের সূরা আল-হুজুরাত (আয়াত ৬)-এর নির্দেশ অনুযায়ী যে কোনো সংবাদ বিশ্বাস ও প্রচারের আগে তার সত্যতা নিশ্চিত (তাবায়্যুন) করা প্রতিটি সচেতন ব্যক্তির অবশ্য কর্তব্য।`,
    categoryId: 'cat-6',
    categorySlug: 'islamic-knowledge',
    status: 'published',
    featuredImage: {
      url: '/src/assets/images/news_world_hero_summit_1793632290118.jpg',
      prompt: 'Reflective documentary photograph of Islamic manuscripts and calligraphy scholars studying ancient texts in a serene archival library',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-10-31T08:00:00Z',
      aspectRatio: '16:9',
      isAiGenerated: true,
      altTextEn: 'Islamic scholars in Amman conference discussing ethics in technology',
      altTextBn: 'আম্মানে প্রযুক্তি ও ইসলামিক নীতিশাস্ত্রের সেমিনারে গবেষকদের আলোচনা'
    },
    source: {
      name: 'International Islamic Fiqh Academy & Applied Ethics Council',
      url: 'https://iifa-aifi.org',
      publishedAt: '2026-10-31T06:00:00Z',
      collectedAt: '2026-10-31T07:15:00Z',
      verified: true
    },
    author: {
      nameEn: 'Sheikh Dr. Harun Rashid',
      nameBn: 'মাওলানা ড. হারুনুর রশীদ',
      roleEn: 'Islamic Jurisprudence Contributor',
      roleBn: 'ইসলামিক ফিকহ গবেষক'
    },
    publishedAt: '2026-10-31T09:00:00Z',
    createdAt: '2026-10-31T07:30:00Z',
    updatedAt: '2026-10-31T09:00:00Z',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewsCount: 7820,
    sharesCount: 1640,
    readingTimeMinutes: 4,
    keywords: ['Islamic Ethics', 'Quranic Teachings', 'Authentic Hadith', 'Truthfulness', 'Digital Morality'],
    seo: {
      metaTitleEn: 'Preserving Moral Integrity in the Age of Digital Media: Islamic Ethics - NEWS WORLD',
      metaTitleBn: 'ডিজিটাল প্রযুক্তির যুগে আত্মশুদ্ধি ও সততা রক্ষা: ইসলামিক নীতিশাস্ত্র - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'Verified Quranic verses and authentic Hadith on truthfulness, verification (Tabayyun), and Amanah in communication.',
      metaDescBn: 'কুরআন ও সহীহ হাদিসের আলোকে তথ্য প্রচার ও নৈতিক দায়িত্ব নিয়ে আলোচনা।'
    },
    domainDisclaimer: {
      type: 'islamic',
      textEn: 'Verified Quranic citations and authentic Hadith (Sahih al-Bukhari & Muslim) compiled under academic oversight.',
      textBn: 'পবিত্র কুরআন এবং সহীহ বুখারী ও মুসলিমের নির্ভরযোগ্য দলিলের আলোকে রচিত প্রবন্ধ।'
    }
  },
  {
    id: 'nw-job-01',
    headlineEn: 'CERN and European Particle Physics Labs Open 240 International Postdoctoral & Engineering Fellowships',
    headlineBn: 'সার্ন ও ইউরোপীয় কণা পদার্থবিজ্ঞান ল্যাবগুলোতে ২৪০টি আন্তর্জাতিক ফেলোশিপ ও ইঞ্জিনিয়ারিং নিয়োগ বিজ্ঞপ্তি',
    summaryEn: 'Applications open for scientific researchers, cryogenics engineers, and data specialists across CERN member and associate nations with deadline November 30, 2026.',
    summaryBn: 'সার্ন ও সহযোগী ল্যাবগুলোতে গবেষক, ক্রায়োজেনিক্স প্রকৌশলী এবং কম্পিউটার বিজ্ঞানীদের জন্য বৈশ্বিক ফেলোশিপের আবেদন শুরু।',
    contentEn: `GENEVA — The European Organization for Nuclear Research (CERN) has formally announced the opening of its 2026/2027 Scientific and Engineering Fellowship intake, offering 240 fully funded positions at its facilities on the French-Swiss border.

The vacancies cover five core disciplinary divisions: accelerator engineering, detector cryogenics, high-performance distributed computing (LHC Computing Grid), beam instrumentation, and theoretical physics. Selected fellows will contribute to preparatory operations for the High-Luminosity Large Hadron Collider (HL-LHC) upgrade project.

Official Requirements & Deadlines:
- Employer: European Organization for Nuclear Research (CERN)
- Vacancy Reference: CERN-HR-FELL-2026-B
- Positions Available: 240 fellowships
- Eligibility: Nationals of CERN Member States and Associate Member States (or eligible international bilateral partner institutions) holding a Master's degree or Ph.D.
- Application Portal: Official CERN Careers Portal (careers.cern)
- Application Deadline: November 30, 2026, 23:59 CET

Candidates are strictly cautioned against third-party recruitment agencies or paying application fees, as CERN never charges recruitment fees at any stage of the application process.`,
    contentBn: `জেনেভা — ইউরোপীয় পরমাণু গবেষণা সংস্থা (সার্ন) তাদের ২০২৬/২০২৭ সেশনের আন্তর্জাতিক ফেলোশিপ ও প্রকৌশল নিয়োগ বিজ্ঞপ্তি আনুষ্ঠানিকভাবে প্রকাশ করেছে। ফ্রান্স ও সুইজারল্যান্ডের সীমান্তে অবস্থিত সার্নের গবেষণাগারে মোট ২৪০টি পূর্ণ অর্থায়িত ফেলোশিপের জন্য বিশ্বব্যাপী আবেদন গ্রহণ শুরু হয়েছে।

মূল নিয়োগ ক্ষেত্রসমূহ:
অ্যাক্সিলারেটর প্রকৌশল, ক্রায়োজেনিক্স ও সুপারকন্ডাক্টিং প্রযুক্তি, উচ্চক্ষমতাসম্পন্ন ডিস্ট্রিবিউটেড কম্পিউটিং, বিম ইনস্ট্রুমেন্টেশন এবং তাত্ত্বিক পদার্থবিজ্ঞান। নির্বাচিত প্রার্থীরা সার্নের ঐতিহ্যবাহী লার্জ হ্যাড্রন কোলাইডার (HL-LHC) আপগ্রেড প্রকল্পে সরাসরি কাজ করার সুযোগ পাবেন।

অফিসিয়াল সার্কুলার ও তথ্যাবলী:
- নিয়োগকারী প্রতিষ্ঠান: ইউরোপীয় পরমাণু গবেষণা সংস্থা (CERN)
- রেফারেন্স নম্বর: CERN-HR-FELL-2026-B
- পদের সংখ্যা: ২৪০টি ফেলোশিপ
- শিক্ষাগত যোগ্যতা: সংশ্লিষ্ট বিষয়ে মাস্টার্স অথবা পিএইচডি ডিগ্রি
- অফিসিয়াল ওয়েবসাইট: সার্ন ক্যারিয়ার পোর্টাল (careers.cern)
- আবেদনের শেষ সময়: ৩০ নভেম্বর ২০২৬, ২৩:৫৯ সিইটি (ইউরোপীয় সময়)

আবেদনকারীদের কোনো তৃতীয় পক্ষ বা ভুয়া এজেন্সির সাথে আর্থিক লেনদেন না করার জন্য সতর্ক করা হয়েছে। সার্নে আবেদনের জন্য কোনো ধরনের ফি প্রযোজ্য নয়।`,
    categoryId: 'cat-4',
    categorySlug: 'jobs-careers',
    status: 'published',
    featuredImage: {
      url: '/src/assets/images/news_world_ai_robotics_1793632291267.jpg',
      prompt: 'Documentary photograph of engineering researchers in advanced physics laboratory with electronic monitors and scientific apparatus',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-10-30T10:00:00Z',
      aspectRatio: '4:3',
      isAiGenerated: true,
      altTextEn: 'Researchers in scientific research laboratory examining accelerator telemetry',
      altTextBn: 'উচ্চতর পদার্থবিজ্ঞান গবেষণাগারে কর্মরত প্রকৌশলী ও গবেষকদল'
    },
    source: {
      name: 'CERN Official Human Resources Department',
      url: 'https://careers.cern',
      publishedAt: '2026-10-30T09:00:00Z',
      collectedAt: '2026-10-30T11:00:00Z',
      verified: true
    },
    author: {
      nameEn: 'Global Careers Editorial Board',
      nameBn: 'গ্লোবাল ক্যারিয়ার সম্পাদকীয় বোর্ড',
      roleEn: 'Education & Employment Correspondent',
      roleBn: 'কর্মসংস্থান ও ক্যারিয়ার প্রতিবেদক'
    },
    publishedAt: '2026-10-30T12:00:00Z',
    createdAt: '2026-10-30T11:15:00Z',
    updatedAt: '2026-10-30T12:00:00Z',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    viewsCount: 11200,
    sharesCount: 2450,
    readingTimeMinutes: 3,
    keywords: ['CERN Fellowship', 'Particle Physics Careers', 'Research Jobs', 'Science Engineering'],
    seo: {
      metaTitleEn: 'CERN Opens 240 International Postdoctoral & Engineering Fellowships - NEWS WORLD',
      metaTitleBn: 'সার্নে ২৪০টি আন্তর্জাতিক ফেলোশিপ ও রিসার্চ নিয়োগ বিজ্ঞপ্তি - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'CERN announces 240 funded research and engineering fellowships. Official deadline November 30, 2026.',
      metaDescBn: 'ইউরোপীয় কণা পদার্থবিজ্ঞান গবেষণাগার সার্নে আন্তর্জাতিক ফেলোশিপ বিজ্ঞপ্তি।'
    },
    domainDisclaimer: {
      type: 'jobs',
      textEn: 'Verified from official CERN official hiring portal. Verify application deadlines and terms directly at careers.cern.',
      textBn: 'সার্নের অফিসিয়াল ওয়েবসাইট থেকে যাচাইকৃত। আবেদন করার পূর্বে careers.cern পোর্টালে সরাসরি শর্তাবলী যাচাই করুন।'
    }
  },
  {
    id: 'nw-draft-pending-01',
    headlineEn: 'Autonomous Oceanic Drone Fleet Completes 10,000-Mile Microplastic Mapping Across Atlantic Gyre',
    headlineBn: 'আটলান্টিক গাইরে ১০,০০০ মাইল পথ ঘুরে মাইক্রোপ্লাস্টিক ম্যাপিং সম্পন্ন করল স্বয়ংক্রিয় সামুদ্রিক ড্রোন বহর',
    summaryEn: 'Solar-powered unmanned surface vehicles collect 40,000 biological water samples, mapping synthetic polymer densities in remote pelagic zones.',
    summaryBn: 'সৌরশক্তিসম্পন্ন মনুষ্যবিহীন নৌযানগুলো সমুদ্রের দুর্গম এলাকা থেকে ৪০,০০০ নমুনার মাধ্যমে প্লাস্টিক দূষণের রিয়েল-টাইম মানচিত্র তৈরি করেছে।',
    contentEn: `PLYMOUTH — A research expedition deploying twelve autonomous robotic sailing vehicles across the North Atlantic Subtropical Gyre concluded a three-month voyage, transmitting continuous chemical spectroscopy data on microplastic particle distribution.

Equipped with automated fluorometric sensors and sub-surface filtration systems, the unmanned vessels charted micro-debris concentrations at depths ranging from surface tension down to twenty meters. Early analysis indicates higher-than-expected concentrations of secondary breakdown polymers, particularly weathered polypropylene and polyamide textile fibers.

The research coordinates with satellite sea-surface height models to forecast ocean eddy retention zones, enabling targeted coastal intervention before degraded fragments enter the marine food web.`,
    contentBn: `প্লাইমাউথ — উত্তর আটলান্টিক মহাসাগরের গাইরে তিন মাসব্যাপী বৈজ্ঞানিক অভিযান শেষ করেছে বারোটি স্বয়ংক্রিয় রোবোটিক ড্রোন জাহাজ। এই মনুষ্যবিহীন যানগুলো সমুদ্রের প্রত্যন্ত অঞ্চলের পানিতে মাইক্রোপ্লাস্টিক দূষণের গভীরতা ও ঘনত্বের ধারাবাহিক রাসায়নিক তথ্য সংগ্রহ করেছে।

স্বয়ংক্রিয় ফিল্টারিং ও স্পেকট্রোস্কোপি সেন্সরের সাহায্যে সমুদ্রের উপরিভাগ থেকে বিশ মিটার গভীর পর্যন্ত পানির নমুনা পরীক্ষা করা হয়েছে। প্রাথমিক বিশ্লেষণে দেখা গেছে, কাপড়ের সিনথেটিক ফাইবার ও ব্যবহৃত প্লাস্টিকের ভাঙা কণা পানির স্তরে ব্যাপক হারে জমে রয়েছে।

উপগ্রহ থেকে প্রাপ্ত সমুদ্রের স্রোতের তথ্যের সাথে মিলিয়ে গবেষকেরা একটি রিয়েল-টাইম মানচিত্র তৈরি করছেন, যাতে দূষণ সামুদ্রিক মাছ ও প্রাণীর খাদ্যশৃঙ্খলে প্রবেশের আগেই কার্যকর প্রতিরোধমূলক ব্যবস্থা গ্রহণ করা যায়।`,
    categoryId: 'cat-2',
    categorySlug: 'science',
    status: 'pending',
    featuredImage: {
      url: '/src/assets/images/news_world_clean_energy_1793632291151.jpg',
      prompt: 'Documentary photograph of unmanned solar ocean drone vessel sailing through deep blue oceanic swells at sunset',
      model: 'imagen-3.0-generate-002',
      generatedAt: '2026-11-02T04:00:00Z',
      aspectRatio: '16:9',
      isAiGenerated: true,
      altTextEn: 'Autonomous ocean drone conducting scientific sampling in the Atlantic',
      altTextBn: 'আটলান্টিক মহাসাগরে নমুনা সংগ্রহ করছে স্বয়ংক্রিয় সামুদ্রিক ড্রোন'
    },
    source: {
      name: 'Marine Biological Association & Ocean Data Consortium',
      url: 'https://www.mba.ac.uk/news',
      publishedAt: '2026-11-02T02:00:00Z',
      collectedAt: '2026-11-02T05:30:00Z',
      verified: true
    },
    author: {
      nameEn: 'Editorial AI Assistant & Dr. Paul Thorne',
      nameBn: 'সম্পাদকীয় এআই সহকারী ও ড. পল থর্ন',
      roleEn: 'Marine Sciences Desk',
      roleBn: 'সামুদ্রিক বিজ্ঞান গবেষক'
    },
    publishedAt: '',
    createdAt: '2026-11-02T05:40:00Z',
    updatedAt: '2026-11-02T05:40:00Z',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewsCount: 0,
    sharesCount: 0,
    readingTimeMinutes: 3,
    keywords: ['Ocean Drone', 'Microplastics', 'Atlantic Research', 'Marine Conservation'],
    seo: {
      metaTitleEn: 'Autonomous Oceanic Drone Fleet Completes Atlantic Microplastic Mapping - NEWS WORLD',
      metaTitleBn: 'আটলান্টিকে মাইক্রোপ্লাস্টিক ম্যাপিং সম্পন্ন করল স্বয়ংক্রিয় ড্রোন বহর - নিউজ ওয়ার্ল্ড',
      metaDescEn: 'Unmanned robotic sailing fleet completes 10,000-mile microplastic mapping across the North Atlantic.',
      metaDescBn: 'মনুষ্যবিহীন ড্রোন জাহাজের সাহায্যে আটলান্টিকের প্লাস্টিক দূষণের মানচিত্র প্রস্তুত।'
    }
  }
];
