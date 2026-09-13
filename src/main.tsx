import { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './styles.css';

function App() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    document.title = pathname === '/about' || pathname === '/about/'
      ? 'About — Omar Alothman'
      : 'Omar Alothman — Art Director & Filmmaker';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return <Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /></Routes>;
}

createRoot(document.getElementById('root')!).render(<BrowserRouter><App /></BrowserRouter>);
