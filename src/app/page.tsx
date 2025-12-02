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
import { projects } from '@/lib/projects';


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const iconRef = useRef<MapPinnedIconHandle>(null);

  const stats = [
    { label: 'Year of Experience', value: 1, suffix: '' },
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setShowPopup(true);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0b21] text-white relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Main cursor dot */}
        <div className="cursor-dot"></div>

        {/* Outer glow ring */}
        <div className="cursor-glow"></div>

        {/* Trail effect */}
        <div className="cursor-trail"></div>

        {/* Additional sparkle effect */}
        <div className="absolute inset-0 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
      </div>
      {/* Modern Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-blue-500/20' : 'bg-transparent'
        }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ">AUNG KO KO NAING</div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'case-studies', 'experience', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-400 ${activeSection === item ? 'text-blue-400 font-semibold' : 'text-gray-300'
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
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden z-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="text-center max-w-4xl mx-auto relative z-10 mt-6">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              AUNG KO KO NAING
            </h1>
            <p className="text-lg text-gray-400 mb-6 animate-fade-in-up-delay-2">
              Mobile Developer • iOS | Android | Hybrid
            </p>
            <TextType
              text={["Crafting exceptional mobile experiences with modern technologies"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className='text-lg text-gray-400 mb-12'
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
              <button
                onClick={() => scrollToSection('case-studies')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-full hover:bg-blue-400 hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
            <div
              className="relative mx-auto w-[400px] will-change-transform md:w-[380px] transition-transform duration-100 ease-out mt-12"
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
      <section id="about" className="relative overflow-hidden z-10">
        {/* Background Effects */}

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-50 ">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I&apos;m a passionate mobile developer with over 1 years of experience creating
                  innovative mobile applications. I specialize in cross-platform development
                  using Ionic and Flutter.
                </p>
                <div ref={sectionRef} className="flex flex-col gap-4 text-white">
                  <div className="flex flex-row gap-32">
                    <div className="flex flex-col w-48">
                      <span className="text-sm text-gray-300 tracking-wide">Year of Experience</span>
                      <p className="text-3xl font-bold text-white mt-1">{counts[0]}{stats[0].suffix}</p>
                    </div>
                    <div className="flex flex-col w-48">
                      <span className="text-sm text-gray-300 tracking-wide">Project Completed</span>
                      <p className="text-3xl font-bold text-white mt-1">{counts[1]}{stats[1].suffix}</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-32">
                    <div className="flex flex-col w-48">
                      <span className="text-sm text-gray-300 tracking-wide">Awards & Recognitions</span>
                      <p className="text-3xl font-bold text-white mt-1">{counts[2]}{stats[2].suffix}</p>
                    </div>
                    <div className="flex flex-col w-48">
                      <span className="text-sm text-gray-300 tracking-wide">Hours of coding</span>
                      <p className="text-3xl font-bold text-white mt-1">{counts[3].toLocaleString()}{stats[3].suffix}</p>
                    </div>
                  </div>
                </div>


                <button
                  onClick={() => {
                    const { latitude, longitude } = { latitude: 16.785571, longitude: 96.126859 };
                    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');

                  }}
                  onMouseEnter={() => iconRef.current?.startAnimation()}
                  onMouseLeave={() => iconRef.current?.stopAnimation()}
                  className="group relative px-8 py-3 rounded-full mt-4 overflow-hidden transition-all duration-300 flex items-center gap-2 font-medium shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <MapPinnedIcon ref={iconRef} size={20} duration={1} className="relative z-10" />
                  <span className="relative z-10 text-white">Yangon, Myanmar</span>
                </button>

              </div>
            </div>

            <div className="relative rounded-[16px] border border-gray-600 p-4 w-250 h-100">
              <img src="profile.png" alt="Profile" />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10" style={{ height: '200px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40px', marginRight: '40px' }}>
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
      {/* Projects / Case Studies Section */}
      <section
        id="case-studies"
        className="py-24 px-6 relative overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-black/40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300/70 mb-3">
                Selected work
              </p>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects that I&apos;ve built
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project) => (
              <article
                key={project.slug}
                className="group relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-6 flex flex-col overflow-hidden hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-300"
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
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/50 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-200 hover:bg-blue-500/20 hover:border-blue-300 transition-colors"
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
                        className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/50 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-200 hover:bg-purple-500/20 hover:border-purple-300 transition-colors"
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
      <section id="education" className="py-20 px-6 relative overflow-hidden z-10" ref={educationSectionRef}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 
            className={`text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent transition-all duration-1000 ${
              educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 ${
                  educationVisible 
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
      <section id="contact" className="min-h-screen text-white relative overflow-hidden flex items-center justify-center z-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          {/* Interactive Icons Row */}
          <div className="flex justify-center items-center gap-6 mb-8">
            {/* Icon 1 */}
            <div className="w-16 h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-lg font-bold">C</span>
              </div>
            </div>

            {/* Icon 2 */}
            <div className="w-16 h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* Central Active Icon */}
            <div className="relative">
              <div className="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/50 border-2 border-blue-400 cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-2xl font-bold">A</span>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-50 animate-pulse"></div>
            </div>

            {/* Icon 4 */}
            <div className="w-16 h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>

            {/* Icon 5 */}
            <div className="w-16 h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="mb-8">
            <h2 className="text-7xl md:text-9xl font-bold mb-8 leading-tight">
              Step into the<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                future of design
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of developers and teams using modern technologies<br />
            to turn ideas into high-performing mobile applications, fast.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
            <button
              onClick={() => scrollToSection('case-studies')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Contact Me
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-full hover:bg-blue-400 hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
          </div>

          {/* Contact Information - Subtle */}

        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12 px-6 relative overflow-hidden z-10">
        {/* Background Effects */}

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className='flex items-center space-x-3'>
              <img className="w-10 h-10 object-contain bg-transparent rounded-xl shadow-lg border border-gray-600 p-1.5" src="logo.png" alt="logo" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AUNG KO KO NAING</h3>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://github.com/ademon118" aria-label="GitHub" className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-400/30 bg-white/5 hover:bg-blue-400/10 hover:text-blue-400 text-gray-300 transition-all duration-300">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/in/aung-ko-ko-naing-603111358" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-400/30 bg-white/5 hover:bg-blue-400/10 hover:text-blue-400 text-gray-300 transition-all duration-300">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://t.me/ademon308" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-400/30 bg-white/5 hover:bg-blue-400/10 hover:text-blue-400 text-gray-300 transition-all duration-300">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </a>
              <a href="mailto:aungkokonaing118@gmail.com" aria-label="Email" className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-400/30 bg-white/5 hover:bg-blue-400/10 hover:text-blue-400 text-gray-300 transition-all duration-300">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-4 pt-4 text-center space-y-2">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Made with
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="relative transform transition-all duration-300 hover:scale-125 active:scale-110"
              >
                <span
                  className={`transition-all duration-300 ${isLiked ? 'animate-pulse' : ''} ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                >
                  {isLiked ? '❤️' : '🤍'}
                </span>
              </button>
              by Aung Ko Ko Naing
            </p>
            <p className="text-gray-500 text-sm">Licensed under BlueStone</p>
          </div>
        </div>
      </footer>

      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h3>
              <p className="text-gray-600 mb-8">
                Thank you for reaching out! I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={closePopup}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
