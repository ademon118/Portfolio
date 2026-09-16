import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="text-white py-6 sm:py-12 px-4 sm:px-6 relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <Image
              className="w-10 h-10 object-contain bg-transparent rounded-xl shadow-lg border border-white/20 p-1.5"
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
            />
            <h3 className="text-lg sm:text-2xl font-bold text-white">AUNG KO KO NAING</h3>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://github.com/ademon118" aria-label="GitHub" className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/30 bg-white/5 hover:bg-white/15 hover:text-white text-gray-300 transition-all duration-300">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/aung-ko-ko-naing-603111358" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/30 bg-white/5 hover:bg-white/15 hover:text-white text-gray-300 transition-all duration-300">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://t.me/ademon308" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/30 bg-white/5 hover:bg-white/15 hover:text-white text-gray-300 transition-all duration-300">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13"></path>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </a>
            <a href="mailto:aungkokonaing118@gmail.com" aria-label="Email" className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/30 bg-white/5 hover:bg-white/15 hover:text-white text-gray-300 transition-all duration-300">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-4 pt-4 text-center space-y-2">
          <p className="text-gray-400 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            <span>
              Designed & Built by <span className="font-medium text-white">Aung Ko Ko Naing</span>
            </span>
            <span className="text-white/20 hidden sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href="/notes"
              className="group inline-flex items-center gap-1.5 rounded-full border border-amber-200/25 bg-gradient-to-br from-amber-100/15 to-amber-900/20 px-3 py-1 text-sm text-amber-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:border-amber-200/50 hover:from-amber-100/25 hover:to-amber-800/30 hover:text-amber-50 hover:-translate-y-0.5"
            >
              <svg
                className="h-3.5 w-3.5 opacity-80 transition-transform duration-300 group-hover:rotate-[-8deg]"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <rect x="3" y="2" width="9" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5.5 5h4M5.5 7.5h4M5.5 10h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M11.5 3.5l1.5 1.2v8.3l-1.5-1.1V3.5z" fill="currentColor" opacity="0.35" />
              </svg>
              <span>Creative notes</span>
              <span className="text-[10px] tracking-wide text-amber-200/70 transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
