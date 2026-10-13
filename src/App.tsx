import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import CookieConsentBanner from './components/CookieConsentBanner';
import AccessibilityMenu from './components/AccessibilityMenu';
import Home from './pages/Home';
import About from './pages/About';
import PracticeOverview from './pages/PracticeOverview';
import PracticeCriminal from './pages/PracticeCriminal';
import PracticeCivil from './pages/PracticeCivil';
import PracticeInvestigation from './pages/PracticeInvestigation';
import PracticeDisclosure from './pages/PracticeDisclosure';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import AccessibilityPage from './pages/AccessibilityPage';
import NotFound from './pages/NotFound';
import { ROUTES } from './lib/site';
import { initAnalyticsIfConsented } from './lib/analytics';
import { initContentProtection } from './lib/protection';
import { onConsentChange } from './lib/consent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initAnalyticsIfConsented();
    initContentProtection();
    const off = onConsentChange(() => initAnalyticsIfConsented());
    return off;
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        דילוג לתוכן
      </a>
      <SiteHeader />
      <main id="main">
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.practice} element={<PracticeOverview />} />
          <Route path={ROUTES.criminal} element={<PracticeCriminal />} />
          <Route path={ROUTES.civil} element={<PracticeCivil />} />
          <Route path={ROUTES.investigation} element={<PracticeInvestigation />} />
          <Route path={ROUTES.disclosure} element={<PracticeDisclosure />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.privacy} element={<Privacy />} />
          <Route path={ROUTES.accessibility} element={<AccessibilityPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <WhatsAppFloatingButton />
      <CookieConsentBanner />
      <AccessibilityMenu />
    </BrowserRouter>
  );
}
