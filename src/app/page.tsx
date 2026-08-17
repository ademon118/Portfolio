import dynamic from 'next/dynamic';
import AnimatedBackground from '@/components/AnimatedBackground';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';

const TechLogoLoop = dynamic(() => import('@/components/TechLogoLoop'), {
  loading: () => (
    <div className="relative z-10 h-[100px] sm:h-[160px] md:h-[200px]" />
  ),
});

const WhatImDoingNow = dynamic(() => import('@/components/WhatImDoingNow'), {
  loading: () => (
    <section id="now" className="py-8 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden z-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 sm:mb-10 text-white px-2">
          What I&apos;m doing now
        </h2>
        <div className="h-40 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
      </div>
    </section>
  ),
});

const ContactOverlay = dynamic(() => import('@/components/ContactOverlay'));

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <AnimatedBackground />
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <TechLogoLoop />
      <WhatImDoingNow />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <SiteFooter />
      <ContactOverlay />
    </div>
  );
}
