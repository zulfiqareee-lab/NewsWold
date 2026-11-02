import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider, useNav } from './contexts/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { ListingPage } from './pages/ListingPage';
import { LegalPages } from './pages/LegalPages';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { nav } = useNav();

  // If in Admin Dashboard view, render admin suite directly
  if (nav.view === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="flex flex-col min-h-screen transition-colors">
      <Header />
      <div className="flex-1">
        {nav.view === 'home' && <HomePage />}
        {nav.view === 'latest' && <ListingPage type="latest" />}
        {nav.view === 'breaking' && <ListingPage type="breaking" />}
        {nav.view === 'trending' && <ListingPage type="trending" />}
        {nav.view === 'most-read' && <ListingPage type="most-read" />}
        {nav.view === 'category' && (
          <CategoryPage categorySlug={nav.categorySlug || 'international-news'} />
        )}
        {nav.view === 'article' && (
          <NewsDetailPage articleId={nav.articleId || 'nw-lead-01'} />
        )}
        {nav.view === 'search' && (
          <SearchPage initialQuery={nav.searchQuery || ''} />
        )}
        {nav.view === 'about' && <LegalPages page="about" />}
        {nav.view === 'contact' && <LegalPages page="contact" />}
        {nav.view === 'privacy' && <LegalPages page="privacy" />}
        {nav.view === 'terms' && <LegalPages page="terms" />}
        {nav.view === 'copyright-policy' && <LegalPages page="copyright-policy" />}
        {nav.view === 'copyright-removal' && (
          <LegalPages page="copyright-removal" complaintData={nav.complaintData} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
