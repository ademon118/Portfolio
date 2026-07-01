'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import LogoLoop from '@/components/LogoLoop';
import { MapPinnedIcon, MapPinnedIconHandle } from '@/components/ui/MapPinnedIcon';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter,
  SiFigma,
  SiAngular,
  SiIonic,
  SiPhp,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import TextType from '@/components/TextType';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import ScheduleMeetingModal from '@/components/ScheduleMeetingModal';
import WhatImDoingNow from '@/components/WhatImDoingNow';
import { projects } from '@/lib/projects';


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isModalInputFocused, setIsModalInputFocused] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupMeetLink, setPopupMeetLink] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const iconRef = useRef<MapPinnedIconHandle>(null);

  const stats = [
    { label: 'Year of Experience', value: 2, suffix: '' },
    { label: 'Project Completed', value: 10, suffix: '+' },
    { label: 'Awards & Recognitions', value: 2, suffix: '+' },
    { label: 'Hours of coding', value: 10000, suffix: '+' },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [visible, setVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [educationVisible, setEducationVisible] = useState(false);
  const educationSectionRef = useRef<HTMLDivElement | null>(null);

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

  // Count animation
  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(stats.map((s) => Math.floor(s.value * progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible]);

  useEffect(() => {
    if (!showPopup) return;
    const timer = setTimeout(() => {
      setShowPopup(false);
      setPopupMeetLink(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  useEffect(() => {
    if (!showContactModal && !showScheduleModal) {
      setIsModalInputFocused(false);
    }
  }, [showContactModal, showScheduleModal]);

  useEffect(() => {
    if (isModalInputFocused) {
      document.body.classList.add('contact-form-focus');
    } else {
      document.body.classList.remove('contact-form-focus');
    }

    return () => document.body.classList.remove('contact-form-focus');
  }, [isModalInputFocused]);

  const handleModalFormFocusIn = (e: React.FocusEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      setIsModalInputFocused(true);
    }
  };

  const handleModalFormFocusOut = (e: React.FocusEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    requestAnimationFrame(() => {
      if (!form.contains(document.activeElement)) {
        setIsModalInputFocused(false);
      }
    });
  };

  const showSuccessToast = (message: string, meetLink?: string) => {
    setPopupMessage(message);
    setPopupMeetLink(meetLink ?? null);
    setShowPopup(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate rotation based on scroll position
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = docHeight > 0 ? scrollTop / docHeight : 0;
      // Rotate 360 degrees as user scrolls to bottom
      const maxRotation = 360;
      setRotation(scrollFraction * maxRotation);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techLogos = [
    { node: <SiReact color="#61DAFB" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs color="#AAAAAA" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript color="#3178C6" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss color="#06B6D4" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiFlutter color="#02569B" />, title: "Flutter", href: "https://flutter.dev" },
    { node: <SiFigma color="#F24E1E" />, title: "Figma", href: "https://www.figma.com" },
    { node: <SiAngular color="#DD0031" />, title: "Angular", href: "https://angular.io" },
    { node: <SiIonic color="#3880FF" />, title: "Ionic", href: "https://ionicframework.com" },
    { node: <SiPhp color="#777BB4" />, title: "PHP", href: "https://www.php.net" },
    { node: <FaJava color="#007396" />, title: "Java", href: "https://www.java.com" },
  ];

  const education = [
    {
      degree: "Pharmacy Studies",
      school: "University of Pharmacy,MDY",
      year: "2019 - 2020",
      description: "Specialized in pharmaceutical sciences"
    },
    {
      degree: "NCC level 4 Diploma in computing",
      school: "KMD College",
      year: "2022-2023",
      description: "Foundation for higher study or entry-level IT jobs"
    },
    {
      degree: "NCC level 5 Diploma in computing",
      school: "KMD College",
      year: "2023 - 2024",
      description: "Pathway to university top-up degree or skilled IT role"
    },
    {
      degree: "Java Basic Certification",
      school: "KMD College",
      year: "2023-2024",
      description: "Advanced certification in Java and OOP langauge"
    }

  ];

  const skills = [
    { category: "Mobile Development", items: ["React Native", "Flutter", "iOS", "Android", "Ionic"] },
    { category: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "REST APIs"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "MySQL"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "CI/CD", "Agile"] }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openContactModal = () => {
    setSubmitError('');
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    if (isSubmitting) return;
    setShowContactModal(false);
    setSubmitError('');
  };

  const openScheduleModal = () => {
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    if (isSubmitting) return;
    setShowScheduleModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setShowContactModal(false);
      showSuccessToast('Your message has been sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMeetLink(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      <CustomCursor hidden={isModalInputFocused} />

      {/* Modern Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
        }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm sm:text-lg md:text-2xl font-bold text-white truncate max-w-[60vw] sm:max-w-none">
              AUNG KO KO NAING
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'now', 'case-studies', 'experience', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-white ${activeSection === item ? 'text-white font-semibold' : 'text-gray-400'
                    }`}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button className="text-gray-300">☰</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-0 py-20 pt-24 pb-10 sm:min-h-screen sm:py-0 flex items-center justify-center px-6 relative overflow-hidden z-10 mt-8">
        <div className="text-center max-w-4xl mx-auto relative z-10 sm:mt-6 px-2">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight">
              AUNG KO KO NAING
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 sm:mb-6 animate-fade-in-up-delay-2">
              Frontend Developer • Web | iOS | Android | Hybrid
            </p>
            <TextType
              text={["Crafting exceptional mobile experiences with modern technologies"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className='text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-12 px-2'
            />
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center animate-fade-in-up-delay-3 px-4">
              <button
                onClick={() => scrollToSection('case-studies')}
                className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10 font-medium"
              >
                View My Work
              </button>
              <button
                onClick={openContactModal}
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Get In Touch
              </button>
            </div>
            <div
              className="relative mx-auto w-full max-w-[220px] sm:max-w-[320px] md:max-w-[380px] will-change-transform transition-transform duration-100 ease-out mt-5 sm:mt-12"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <img
                alt="decorative circle rotating"
                className="z-10 w-full select-none rounded-full opacity-85"
                draggable="false"
                src="/decorative-circle.svg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
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
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-gray-500 tracking-wide">Year of Experience</span>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{counts[0]}{stats[0].suffix}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-gray-500 tracking-wide">Project Completed</span>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{counts[1]}{stats[1].suffix}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-gray-500 tracking-wide">Awards & Recognitions</span>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{counts[2]}{stats[2].suffix}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-gray-500 tracking-wide">Hours of coding</span>
                    <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{counts[3].toLocaleString()}{stats[3].suffix}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const { latitude, longitude } = { latitude: 16.785571, longitude: 96.126859 };
                    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');

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
              <img src="profile.png" alt="Profile" className="w-full h-auto rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 h-[100px] sm:h-[160px] md:h-[200px] overflow-hidden flex justify-center items-center mx-4 sm:mx-10">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={40}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners"
        />
      </div>

      <WhatImDoingNow />

      {/* Projects / Case Studies Section */}
      <section
        id="case-studies"
        className="py-12 sm:py-20 md:py-24 px-6 relative overflow-hidden z-10"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
                Selected work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Projects that I&apos;ve built
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-400 max-w-2xl">
                A mix of client work and personal projects that show how I design, build,
                and ship mobile experiences from idea to production.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full border border-blue-400/30 text-xs text-blue-200/90 bg-blue-500/10">
                Mobile first
              </span>
              <span className="px-3 py-1 rounded-full border border-purple-400/30 text-xs text-purple-200/90 bg-purple-500/10">
                Real-world apps
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
            {projects.slice(0, 6).map((project) => (
              <article
                key={project.slug}
                className="group relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col overflow-hidden hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-transparent blur-3xl" />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
                      <span aria-hidden>{project.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-blue-200/80 uppercase tracking-[0.2em]">
                        {project.timeline} • {project.role}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="relative z-10 text-sm text-gray-300 mb-4 line-clamp-3">
                  {project.tagline}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2 mb-5">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/15 hover:border-white/70 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span>View code</span>
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl.trim().length > 0 && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/15 hover:border-white/70 transition-colors"
                      >
                        <span>Live demo</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-200 group-hover:text-white transition-colors"
                  >
                    <span>View details</span>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-blue-500 group-hover:border-blue-300 transition-all">
                      <svg
                        className="w-2.5 h-2.5"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 11L11 5M7 5H11V9"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* Education Section */}
      <section id="education" className="py-10 sm:py-16 md:py-20 px-6 relative overflow-hidden z-10" ref={educationSectionRef}>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2
            className={`text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-6 sm:mb-16 text-white transition-all duration-1000 px-4 ${educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 ${educationVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                  }`}
                style={{
                  transitionDelay: educationVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl"></div>

                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon/Emoji Badge */}
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    🎓
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                    {edu.degree}
                  </h3>

                  {/* School Name */}
                  <p className="text-base text-blue-400 font-semibold mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {edu.school}
                  </p>

                  {/* Year Badge */}
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 group-hover:border-purple-400/40 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-300 font-medium">{edu.year}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {edu.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Framer Style */}
      <section id="contact" className="min-h-0 sm:min-h-screen text-white relative overflow-hidden flex items-center justify-center z-10 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full">
          {/* Interactive Icons Row */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8">
            {/* Icon 1 */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-sm sm:text-base md:text-lg font-bold">C</span>
              </div>
            </div>

            {/* Icon 2 */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* Central Active Icon */}
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/50 border-2 border-blue-400 cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg sm:text-xl md:text-2xl font-bold">A</span>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-50 animate-pulse"></div>
            </div>

            {/* Icon 4 */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>

            {/* Icon 5 */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="mb-4 sm:mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-3 sm:mb-8 leading-tight text-white">
              Step into the<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              future of design
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-5 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Join thousands of developers and teams using modern technologies
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            to turn ideas into high-performing mobile applications, fast.
          </p>

          {/* Call-to-Action Buttons */}
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

          {/* Contact Information - Subtle */}

        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-6 sm:py-12 px-4 sm:px-6 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className='flex items-center space-x-3 justify-center md:justify-start'>
              <img className="w-10 h-10 object-contain bg-transparent rounded-xl shadow-lg border border-white/20 p-1.5" src="logo.png" alt="logo" />
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
            <p className="text-gray-400">
              Designed & Built by <span className="font-medium text-white">Aung Ko Ko Naing</span>
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9000] p-4"
          onClick={closeContactModal}
        >
          <div
            className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Get in touch</h3>
                <p className="text-sm text-gray-400 mt-1">Send me a message and I&apos;ll get back to you.</p>
              </div>
              <button
                type="button"
                onClick={closeContactModal}
                className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
                aria-label="Close contact form"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              onFocusCapture={handleModalFormFocusIn}
              onBlurCapture={handleModalFormFocusOut}
              className="space-y-4"
            >
              {submitError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
                  {submitError}
                </p>
              )}
              <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1.5">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1.5">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-300 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={closeScheduleModal}
        onSuccess={(meetLink) => showSuccessToast('Google Meet scheduled successfully!', meetLink)}
        onFormFocusChange={setIsModalInputFocused}
      />

      {/* Success Toast */}
      {showPopup && (
        <div className="fixed top-6 right-4 sm:top-8 sm:right-8 z-[9100] w-[calc(100%-2rem)] max-w-sm animate-fade-in-up">
          <div className="relative bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors text-lg leading-none"
              aria-label="Close notification"
            >
              ×
            </button>

            <div className="flex items-start gap-3 pr-6">
              <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-snug">
                  {popupMessage}
                </p>
                {popupMeetLink && (
                  <a
                    href={popupMeetLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs text-blue-300 hover:text-blue-200 underline mt-1 inline-block break-all"
                  >
                    Open Google Meet link
                  </a>
                )}
                <p className="text-xs text-gray-400 mt-1">Just now</p>
                <button
                  type="button"
                  onClick={closePopup}
                  className="text-xs text-gray-400 hover:text-blue-300 transition-colors mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
