import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ViewType =
  | 'home'
  | 'latest'
  | 'breaking'
  | 'trending'
  | 'most-read'
  | 'category'
  | 'article'
  | 'search'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'copyright-policy'
  | 'copyright-removal'
  | 'admin';

interface NavigationState {
  view: ViewType;
  categorySlug?: string;
  articleId?: string;
  searchQuery?: string;
  adminTab?: string;
  complaintData?: { articleId: string; articleHeadline: string };
}

interface NavigationContextType {
  nav: NavigationState;
  goToHome: () => void;
  goToLatest: () => void;
  goToBreaking: () => void;
  goToTrending: () => void;
  goToMostRead: () => void;
  goToCategory: (slug: string) => void;
  goToArticle: (id: string) => void;
  goToSearch: (query: string) => void;
  goToAbout: () => void;
  goToContact: () => void;
  goToPrivacy: () => void;
  goToTerms: () => void;
  goToCopyrightPolicy: () => void;
  goToCopyrightRemoval: (articleId?: string, articleHeadline?: string) => void;
  goToAdmin: (tab?: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  nav: { view: 'home' },
  goToHome: () => {},
  goToLatest: () => {},
  goToBreaking: () => {},
  goToTrending: () => {},
  goToMostRead: () => {},
  goToCategory: () => {},
  goToArticle: () => {},
  goToSearch: () => {},
  goToAbout: () => {},
  goToContact: () => {},
  goToPrivacy: () => {},
  goToTerms: () => {},
  goToCopyrightPolicy: () => {},
  goToCopyrightRemoval: () => {},
  goToAdmin: () => {},
});

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nav, setNav] = useState<NavigationState>({ view: 'home' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    setNav({ view: 'home' });
    scrollToTop();
  };

  const goToLatest = () => {
    setNav({ view: 'latest' });
    scrollToTop();
  };

  const goToBreaking = () => {
    setNav({ view: 'breaking' });
    scrollToTop();
  };

  const goToTrending = () => {
    setNav({ view: 'trending' });
    scrollToTop();
  };

  const goToMostRead = () => {
    setNav({ view: 'most-read' });
    scrollToTop();
  };

  const goToCategory = (slug: string) => {
    setNav({ view: 'category', categorySlug: slug });
    scrollToTop();
  };

  const goToArticle = (id: string) => {
    setNav({ view: 'article', articleId: id });
    scrollToTop();
  };

  const goToSearch = (query: string) => {
    setNav({ view: 'search', searchQuery: query });
    scrollToTop();
  };

  const goToAbout = () => {
    setNav({ view: 'about' });
    scrollToTop();
  };

  const goToContact = () => {
    setNav({ view: 'contact' });
    scrollToTop();
  };

  const goToPrivacy = () => {
    setNav({ view: 'privacy' });
    scrollToTop();
  };

  const goToTerms = () => {
    setNav({ view: 'terms' });
    scrollToTop();
  };

  const goToCopyrightPolicy = () => {
    setNav({ view: 'copyright-policy' });
    scrollToTop();
  };

  const goToCopyrightRemoval = (articleId?: string, articleHeadline?: string) => {
    setNav({
      view: 'copyright-removal',
      complaintData: articleId && articleHeadline ? { articleId, articleHeadline } : undefined
    });
    scrollToTop();
  };

  const goToAdmin = (tab = 'overview') => {
    setNav({ view: 'admin', adminTab: tab });
    scrollToTop();
  };

  return (
    <NavigationContext.Provider
      value={{
        nav,
        goToHome,
        goToLatest,
        goToBreaking,
        goToTrending,
        goToMostRead,
        goToCategory,
        goToArticle,
        goToSearch,
        goToAbout,
        goToContact,
        goToPrivacy,
        goToTerms,
        goToCopyrightPolicy,
        goToCopyrightRemoval,
        goToAdmin,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => useContext(NavigationContext);
