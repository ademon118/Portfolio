'use client';

import { useEffect, useRef, useState } from 'react';

const EDUCATION = [
  {
    degree: 'Pharmacy Studies',
    school: 'University of Pharmacy,MDY',
    year: '2019 - 2020',
    description: 'Specialized in pharmaceutical sciences',
  },
  {
    degree: 'NCC level 4 Diploma in computing',
    school: 'KMD College',
    year: '2022-2023',
    description: 'Foundation for higher study or entry-level IT jobs',
  },
  {
    degree: 'NCC level 5 Diploma in computing',
    school: 'KMD College',
    year: '2023 - 2024',
    description: 'Pathway to university top-up degree or skilled IT role',
  },
  {
    degree: 'Java Basic Certification',
    school: 'KMD College',
    year: '2023-2024',
    description: 'Advanced certification in Java and OOP langauge',
  },
];

export default function EducationSection() {
  const [educationVisible, setEducationVisible] = useState(false);
  const educationSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setEducationVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (educationSectionRef.current) observer.observe(educationSectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="py-10 sm:py-16 md:py-20 px-6 relative overflow-hidden z-10"
      ref={educationSectionRef}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className={`text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-6 sm:mb-16 text-white transition-all duration-1000 px-4 ${
            educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EDUCATION.map((edu, index) => (
            <div
              key={edu.degree}
              className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 ${
                educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: educationVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  🎓
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                  {edu.degree}
                </h3>
                <p className="text-base text-blue-400 font-semibold mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {edu.school}
                </p>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 group-hover:border-purple-400/40 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-300 font-medium">{edu.year}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {edu.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
