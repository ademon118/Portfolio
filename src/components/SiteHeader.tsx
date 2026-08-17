'use client';

import { useEffect, useState } from 'react';
import LocalTimeClock from '@/components/LocalTimeClock';

const NAV_ITEMS = ['home', 'about', 'now', 'projects', 'education', 'contact'];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 50;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm sm:text-lg md:text-2xl font-bold text-white truncate max-w-[60vw] sm:max-w-none">
            AUNG KO KO NAING
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors duration-200 hover:text-white ${
                  activeSection === item ? 'text-white font-semibold' : 'text-gray-400'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
            <LocalTimeClock className="pl-2 border-l border-white/10 ml-1" />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <LocalTimeClock compact />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-white/10 pt-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg capitalize transition-colors ${
                  activeSection === item
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
            <div className="px-3 pt-3">
              <LocalTimeClock />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
