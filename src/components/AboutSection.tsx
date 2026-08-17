'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPinnedIcon, MapPinnedIconHandle } from '@/components/ui/MapPinnedIcon';

const STATS = [
  { label: 'Year of Experience', value: 2, suffix: '' },
  { label: 'Project Completed', value: 10, suffix: '+' },
  { label: 'Awards & Recognitions', value: 2, suffix: '+' },
  { label: 'Hours of coding', value: 10000, suffix: '+' },
];

export default function AboutSection() {
  const iconRef = useRef<MapPinnedIconHandle>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(STATS.map((s) => Math.floor(s.value * progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <section id="about" className="relative overflow-hidden z-10 px-6 py-10 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-10 lg:gap-16">
          <div className="space-y-4 sm:space-y-8 flex-1 min-w-0 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-8 text-white">
                About Me
              </h2>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                I&apos;m a passionate frontend developer with over 2 years of experience creating
                innovative web and mobile applications. I specialize in cross-platform development
                using Ionic and Flutter.
              </p>
              <div ref={sectionRef} className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-white">
                {STATS.map((stat, index) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-xs sm:text-sm text-gray-500 tracking-wide">{stat.label}</span>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
                      {index === 3 ? counts[index].toLocaleString() : counts[index]}
                      {stat.suffix}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  window.open('https://www.google.com/maps?q=16.785571,96.126859', '_blank');
                }}
                onMouseEnter={() => iconRef.current?.startAnimation()}
                onMouseLeave={() => iconRef.current?.stopAnimation()}
                className="group relative px-6 sm:px-8 py-3 rounded-full mt-2 sm:mt-4 overflow-hidden transition-all duration-300 inline-flex items-center gap-2 font-medium shadow-lg shadow-white/10 text-sm sm:text-base bg-white text-black hover:bg-gray-200"
              >
                <MapPinnedIcon ref={iconRef} size={20} duration={1} className="relative z-10" />
                <span className="relative z-10">Yangon, Myanmar</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-[16px] border border-white/20 p-3 sm:p-4 w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 lg:max-w-md shrink-0 order-1 lg:order-2">
            <Image
              src="/profile.png"
              alt="Profile"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg object-cover"
              sizes="(max-width: 1024px) 20rem, 28rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
