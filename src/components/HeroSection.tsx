'use client';

import dynamic from 'next/dynamic';
import { openContactModal } from '@/lib/contact-events';
import RotatingCircle from '@/components/RotatingCircle';

const TextType = dynamic(() => import('@/components/TextType'), {
  ssr: false,
  loading: () => (
    <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-12 px-2">
      Crafting exceptional mobile experiences with modern technologies
    </p>
  ),
});

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-0 py-20 pt-24 pb-10 sm:min-h-screen sm:py-0 flex items-center justify-center px-6 relative overflow-hidden z-10 mt-8"
    >
      <div className="text-center max-w-4xl mx-auto relative z-10 sm:mt-6 px-2">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight">
            AUNG KO KO NAING
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 sm:mb-6 animate-fade-in-up-delay-2">
            Frontend Developer • Web | iOS | Android | Hybrid
          </p>
          <TextType
            text={['Crafting exceptional mobile experiences with modern technologies']}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-12 px-2"
          />
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center animate-fade-in-up-delay-3 px-4">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10 font-medium text-center"
            >
              View My Work
            </a>
            <button
              onClick={openContactModal}
              className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Get In Touch
            </button>
          </div>
          <RotatingCircle />
        </div>
      </div>
    </section>
  );
}
