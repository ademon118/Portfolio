export type Project = {
  slug: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[]; // tools / technologies used
  githubUrl: string;
  liveUrl?: string;
  role: string;
  timeline: string;
  highlights: string[];
  images?: string[]; // demo screenshots under /public
};

export const projects: Project[] = [
  {
    slug: "pos-system",
    title: "Tea Shop POS System",
    emoji: "🍵",
    tagline: "Fast and reliable POS system built for tea shop operations.",
    description:
      "A web-based point-of-sale system designed for tea shops, supporting fast order entry, menu management, and real-time sales tracking. Built with PHP, MySQL, and JavaScript to deliver a smooth and responsive experience on any device.",
    category: "POS System · Web App",
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/ademon118/Tea-shop-pos-system",
    liveUrl: "",
    role: "Full-Stack Developer",
    timeline: "4 weeks",
    highlights: [
      "Built fast order-taking screens optimized for daily shop workflows.",
      "Designed normalized MySQL database for efficient POS operations.",
      "Implemented role-based access and secure authentication.",
      "Created clear sales reports with daily and monthly summaries.",
      "Developed responsive UI that works on tablets and shop kiosks."
    ],
    images: ["/projects/pos-system-1.png", "/projects/pos-system-2.png"]
  },
  {
    slug: "students-listener",
    title: "Students Listener – English Skills Improvement Platform",
    emoji: "🎧",
    tagline: "A simple and effective platform to help students improve English through listening.",
    description:
      "Students Listener is a lightweight web platform that helps learners practice English listening skills through curated audio content, transcripts, and interactive exercises. Built with a clean and minimal UI, the project focuses on usability and accessibility for students of all levels.",
    category: "Education · Web App",
    tech: ["HTML", "CSS", "JavaScript", "Python"],
    githubUrl: "https://github.com/ademon118/Student-Listener",
    liveUrl: "https://student-listener.vercel.app/",
    role: "Front End Developer",
    timeline: "2 weeks",
    highlights: [
      "Built a clean and distraction-free interface for students to practice English listening.",
      "Implemented audio playback controls with a smooth UI and mobile-friendly layout.",
      "Created listening modules to help students learn through repetition and guided practice.",
      "Used Python for backend logic and content structuring.",
      "Deployed lightweight, fast-loading static pages optimized for mobile and low-bandwidth users."
    ],
    images: ["/projects/students-listener-1.png", "/projects/students-listener-2.png"]
  },
  {
    slug: "water-intake-tracker",
    title: "Water Intake Tracker – Healthy Hydration App",
    emoji: "💧",
    tagline: "Track your daily water intake and stay hydrated effortlessly.",
    description:
      "Water Intake Tracker is a Flutter mobile app that helps users monitor their daily water consumption and develop healthy hydration habits. With a visually appealing and intuitive interface, the app provides reminders, progress tracking, and statistics to motivate consistent water intake. Built using Flutter and Riverpod, it emphasizes performance, state management, and responsiveness across devices.",
    category: "Health & Fitness · Mobile App",
    tech: ["Flutter", "Dart", "Riverpod", "Firebase"],
    githubUrl: "https://github.com/ademon118/water_intaker_app",   // Add link if you have one
    liveUrl: "",     // Add link if deployed
    role: "Mobile Developer",
    timeline: "6 weeks",
    highlights: [
      "Designed a clean, intuitive UI with Flutter, ensuring smooth animations and responsive layouts.",
      "Implemented state management using Riverpod for reliable and scalable app behavior.",
      "Added daily reminders and notifications to help users stay consistent with hydration goals.",
      "Tracked water intake with interactive charts and history for motivational feedback.",
      "Optimized for both Android and iOS with fast performance and low battery usage."
    ],
    images: ["/projects/water-intake-1.png", "/projects/water-intake-2.png"]
  },
  {
    slug: "anime-updates-app",
    title: "Anime Updates – Latest Anime Tracking Platform",
    emoji: "🎬",
    tagline: "Stay up-to-date with the latest anime releases and news.",
    description:
      "Anime Updates is a web application built with Java and Spring Framework that fetches, organizes, and displays the latest anime episodes, news, and release schedules. It uses a clean and responsive interface to provide anime fans with easy access to updates, personalized tracking, and notifications. The backend is powered by Spring Boot, REST APIs, and scheduled tasks to keep content current.",
    category: "Entertainment · Web App",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "REST API"],
    githubUrl: "https://github.com/ademon118/anime-updates",
    liveUrl: "",
    role: "Backend Developer",
    timeline: "8 weeks",
    highlights: [
      "Implemented Spring Boot backend with REST APIs for fetching and managing anime data.",
      "Scheduled periodic updates using Spring Scheduler to keep anime information current.",
      "Built a responsive frontend with Thymeleaf templates for easy browsing of episodes and news.",
      "Integrated MySQL database for storing anime details, user preferences, and tracking history.",
      "Provided personalized notifications and tracking features to enhance user engagement."
    ],
    images: ["/projects/anime-updates-1.png", "/projects/anime-updates-2.png"]
  },
  {
    slug: "anime-updates-mobile",
    title: "Anime Updates – Mobile Tracker App",
    emoji: "📱",
    tagline: "Track the latest anime episodes and news on your mobile device.",
    description:
      "Anime Updates is a Flutter mobile application that allows anime fans to stay up-to-date with the latest episodes, release schedules, and news. Built with Flutter for cross-platform support, Riverpod for state management, and Kotlin for native integrations, the app offers a smooth, responsive, and personalized experience. Users can browse trending anime, set reminders, and track their watched episodes seamlessly.",
    category: "Entertainment · Mobile App",
    tech: ["Flutter", "Dart", "Riverpod", "Kotlin", "Firebase"],
    githubUrl: "https://github.com/Kirragami/anime-updates-mobile",
    liveUrl: "",     // Add link if deployed
    role: "Mobile Developer",
    timeline: "8 weeks",
    highlights: [
      "Developed a cross-platform Flutter app with smooth animations and responsive design.",
      "Managed app state efficiently using Riverpod for scalable and maintainable code.",
      "Implemented Kotlin for native features like push notifications and local storage.",
      "Fetched real-time anime updates via APIs and displayed them in an organized interface.",
      "Added personalized tracking, episode reminders, and watch history to enhance engagement."
    ],
    images: ["/projects/anime-updates-mobile-1.png", "/projects/anime-updates-mobile-2.png"]
  }

];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);


