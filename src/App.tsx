import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTop';
import RouteScrollToTop from './components/RouteScrollToTop';
import ChatbotWidget from './components/ChatbotWidget';
import { usePremiumScroll } from './hooks/usePremiumScroll';
import { initSmoothScroll } from './utils/smoothScroll';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PublicOffer from './pages/PublicOffer';
import Consent from './pages/Consent';
import TelegramAgreement from './pages/TelegramAgreement';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Academy from './pages/Academy';
import TokenCalculator from './pages/TokenCalculator';

function App() {
  // Инициализируем премиум скролл
  usePremiumScroll();
  
  // Инициализируем плавный скролл
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <AuthProvider>
      <ChatbotProvider>
        <CurrencyProvider>
          <Router>
          <RouteScrollToTop />
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/lk" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/public-offer" element={<PublicOffer />} />
                <Route path="/consent" element={<Consent />} />
                <Route path="/telegram-agreement" element={<TelegramAgreement />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/token-calculator" element={<TokenCalculator />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTopButton />
            <ChatbotWidget />
          </div>
          </Router>
        </CurrencyProvider>
      </ChatbotProvider>
    </AuthProvider>
  );
}

export default App;
