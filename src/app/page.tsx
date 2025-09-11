'use client';

import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const caseStudies = [
    {
      title: "E-Commerce Mobile App",
      description: "Built a comprehensive e-commerce platform with real-time inventory management, payment integration, and push notifications.",
      tech: ["React Native", "Node.js", "MongoDB", "Stripe API"],
      image: "🛒",
      link: "https://github.com/yourusername/ecommerce-app",
      features: ["Real-time sync", "Payment gateway", "Push notifications", "Offline support"]
    },
    {
      title: "Healthcare Management System",
      description: "Developed a HIPAA-compliant healthcare app for patient management, appointment scheduling, and telemedicine features.",
      tech: ["Flutter", "Firebase", "WebRTC", "PostgreSQL"],
      image: "🏥",
      link: "https://github.com/yourusername/healthcare-app",
      features: ["HIPAA compliance", "Video calls", "Secure messaging", "Appointment booking"]
    },
    {
      title: "FinTech Wallet Application",
      description: "Created a secure cryptocurrency wallet with multi-signature support, DeFi integration, and advanced security features.",
      tech: ["React Native", "Blockchain", "Web3", "Biometric Auth"],
      image: "💰",
      link: "https://github.com/yourusername/crypto-wallet",
      features: ["Multi-sig wallet", "DeFi integration", "Biometric security", "Real-time prices"]
    }
  ];

  const experience = [
    {
      company: "TechCorp Solutions",
      position: "Senior Mobile Developer",
      duration: "2022 - Present",
      description: "Leading mobile development team, architecting scalable solutions for enterprise clients.",
      achievements: ["Led team of 5 developers", "Reduced app crash rate by 40%", "Implemented CI/CD pipeline"]
    },
    {
      company: "StartupXYZ",
      position: "Full-Stack Developer",
      duration: "2020 - 2022",
      description: "Developed end-to-end mobile and web applications using modern technologies.",
      achievements: ["Built 3 successful apps", "Increased user retention by 60%", "Optimized performance by 50%"]
    },
    {
      company: "Digital Agency",
      position: "Junior Developer",
      duration: "2019 - 2020",
      description: "Started career building responsive web applications and learning mobile development.",
      achievements: ["Completed 20+ projects", "Learned React Native", "Gained client management skills"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University of Technology",
      year: "2015 - 2019",
      description: "Specialized in Software Engineering and Mobile Development"
    },
    {
      degree: "Mobile App Development Certification",
      school: "Tech Academy",
      year: "2020",
      description: "Advanced certification in React Native and Flutter development"
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
    <div className="min-h-screen bg-black text-white">
      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${
          isHovering ? 'opacity-100' : 'opacity-0'
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
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-blue-500/20' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AUNG KO KO NAING</div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'case-studies', 'experience', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-400 ${
                    activeSection === item ? 'text-blue-400 font-semibold' : 'text-gray-300'
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
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              AUNG KO KO NAING
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up-delay-1">
              Mobile Developer • iOS | Android | Hybrid
            </p>
            <p className="text-lg text-gray-400 mb-12 animate-fade-in-up-delay-2">
              Crafting exceptional mobile experiences with modern technologies
            </p>
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
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6 bg-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  I&apos;m a passionate mobile developer with over 4 years of experience creating 
                  innovative mobile applications. I specialize in cross-platform development 
                  using React Native and Flutter, with a strong foundation in native iOS and Android development.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  My expertise spans from building scalable backend systems to crafting 
                  intuitive user interfaces. I&apos;m always eager to learn new technologies and 
                  take on challenging projects that push the boundaries of mobile development.
                </p>
              </div>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                    <h4 className="font-semibold text-blue-400 mb-4 text-lg">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full border border-blue-400/30">
              {skill}
            </span>
          ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                <div className="text-8xl mb-6">👨‍💻</div>
                <h3 className="text-3xl font-bold mb-6 text-white">Let&apos;s Build Something Amazing</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I&apos;m always excited to work on new projects and collaborate with talented teams.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                    <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-6 bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Case Studies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="p-8">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{study.image}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{study.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{study.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-blue-400">Key Features:</h4>
                    <ul className="space-y-2">
                      {study.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-300 flex items-center">
                          <span className="text-green-400 mr-3 text-lg">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full border border-blue-400/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={study.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career & Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
        <div className="absolute top-20 right-20 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Career & Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{exp.position}</h3>
                    <p className="text-xl text-blue-400 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 font-medium text-lg bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{exp.description}</p>
                <div>
                  <h4 className="font-semibold mb-4 text-blue-400 text-lg">Key Achievements:</h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="text-gray-300 flex items-center text-lg">
                        <span className="text-blue-400 mr-4 text-xl">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mr-4 border border-blue-400/30">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-lg text-blue-400 font-semibold">{edu.school}</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 text-lg bg-white/5 px-4 py-2 rounded-xl border border-white/10 inline-block">
                  {edu.year}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Framer Style */}
      <section id="contact" className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          {/* Interactive Icons Row */}
          <div className="flex justify-center items-center gap-6 mb-16">
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
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            {/* Icon 5 */}
            <div className="w-16 h-16 bg-transparent border-2 border-blue-400/30 rounded-xl flex items-center justify-center hover:border-blue-400/60 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="mb-12">
            <h2 className="text-7xl md:text-9xl font-bold mb-8 leading-tight">
              Step into the<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                future of design
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Join thousands of developers and teams using modern technologies<br />
            to turn ideas into high-performing mobile applications, fast.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('case-studies')}
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View My Work
            </button>
            <button 
              onClick={() => setShowPopup(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Start with AI
            </button>
          </div>

          {/* Contact Information - Subtle */}
          <div className="mt-20 pt-12 border-t border-gray-800">
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>aungkokonaing118@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>github.com/ademon118</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>linkedin.com/in/aung-ko-ko-naing-603111358</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AUNG KO KO NAING</h3>
              <p className="text-gray-400 mb-4">
                Mobile Developer passionate about creating exceptional user experiences 
                through innovative mobile applications.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/ademon118" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/aung-ko-ko-naing-603111358" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:aungkokonaing118@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Case Studies', 'Experience', 'Education', 'Contact'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', '-'))}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 aungkokonaing118@gmail.com</p>
                <p>🌍 Available for remote work</p>
                <p>💼 Open to new opportunities</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AUNG KO KO NAING. All rights reserved.</p>
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
