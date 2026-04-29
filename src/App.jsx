import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar, Footer } from './components';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Detail from './pages/Detail';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:id" element={<Detail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}
