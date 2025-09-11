'use client';

import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Modern Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">AUNG KO KO NAING</div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'case-studies', 'experience', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-600 ${
                    activeSection === item ? 'text-blue-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button className="text-gray-700">☰</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AUNG KO KO NAING
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-up-delay-1">
              Mobile Developer • iOS | Android | Hybrid
            </p>
            <p className="text-lg text-gray-500 mb-12 animate-fade-in-up-delay-2">
              Crafting exceptional mobile experiences with modern technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
              <button 
                onClick={() => scrollToSection('case-studies')}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m a passionate mobile developer with over 4 years of experience creating 
                innovative mobile applications. I specialize in cross-platform development 
                using React Native and Flutter, with a strong foundation in native iOS and Android development.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My expertise spans from building scalable backend systems to crafting 
                intuitive user interfaces. I&apos;m always eager to learn new technologies and 
                take on challenging projects that push the boundaries of mobile development.
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h3 className="text-2xl font-bold mb-4">Let&apos;s Build Something Amazing</h3>
                <p className="text-blue-100">
                  I&apos;m always excited to work on new projects and collaborate with talented teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8">
                  <div className="text-4xl mb-4">{study.image}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{study.title}</h3>
                  <p className="text-gray-600 mb-6">{study.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-gray-700">Key Features:</h4>
                    <ul className="space-y-1">
                      {study.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={study.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
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
      <section id="experience" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Career & Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-xl text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 font-medium">{exp.duration}</span>
                </div>
                <p className="text-gray-600 mb-6">{exp.description}</p>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-700">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="text-gray-600 flex items-center">
                        <span className="text-blue-500 mr-3">•</span>
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
      <section id="education" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{edu.degree}</h3>
                <p className="text-xl text-blue-600 font-semibold mb-2">{edu.school}</p>
                <p className="text-gray-500 mb-4">{edu.year}</p>
                <p className="text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Let's Connect</h3>
              <p className="text-lg text-gray-600 mb-8">
                I&apos;m always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">aungkokonaing118@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">GitHub</p>
                    <p className="text-gray-600">github.com/ademon118</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">LinkedIn</p>
                    <p className="text-gray-600">linkedin.com/in/aung-ko-ko-naing-603111358</p>
                  </div>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AUNG KO KO NAING</h3>
              <p className="text-gray-400 mb-4">
                Mobile Developer passionate about creating exceptional user experiences 
                through innovative mobile applications.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/ademon118" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/aung-ko-ko-naing-603111358" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:aungkokonaing118@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Case Studies', 'Experience', 'Education', 'Contact'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', '-'))}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
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
    </div>
  );
}
