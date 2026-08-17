'use client';

import { openContactModal, openScheduleModal } from '@/lib/contact-events';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-0 sm:min-h-screen text-white relative overflow-hidden flex items-center justify-center z-10 py-12 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full">
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8">
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 text-sm sm:text-base md:text-lg font-bold">C</span>
            </div>
          </div>

          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/50 border-2 border-blue-400 cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg sm:text-xl md:text-2xl font-bold">A</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-50 animate-pulse"></div>
          </div>

          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>

          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-8 leading-tight text-white">
            Let&apos;s build something together.
            <br />
            I&apos;d love to hear from you.
          </h2>
        </div>

        <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-5 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
          Have an idea, a project, or just want to say hi?
          <span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>
          I&apos;m always open to a conversation.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center animate-fade-in-up-delay-3 px-4">
          <button
            onClick={openContactModal}
            className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10 font-medium"
          >
            Contact Me
          </button>
          <button
            onClick={openScheduleModal}
            className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Schedule Meeting
          </button>
        </div>
      </div>
    </section>
  );
}
