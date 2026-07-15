export type Project = {
  slug: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  /** Button label for liveUrl. Defaults to "Live demo". Use "Download" for APK links. */
  liveLabel?: string;
  role: string;
  timeline: string;
  highlights: string[];
  images?: string[]; 
  demoLayout?: 'mobile' | 'web';
  screenshotLayout?: 'mobile' | 'web';
};

export const projects: Project[] = [
  {
    slug: "anime-updates-mobile",
    title: "Anime Updates - Anime Streaming App",
    emoji: "📱",
    tagline: "Track the latest anime episodes and watch on your mobile device.",
    description:
      "Anime Updates is a Flutter mobile application that allows anime fans to stay up-to-date with the latest episodes, release schedules. Built with Flutter for cross-platform support, Riverpod for state management, and Kotlin for native integrations, the app offers a smooth, responsive, and personalized experience. Users can browse trending anime and track their watched episodes seamlessly.",
    category: "Entertainment · Mobile App",
    tech: ["Flutter", "Dart", "Riverpod", "Kotlin", "Firebase"],
    githubUrl: "https://github.com/Kirragami/anime-updates-mobile",
    liveUrl: "https://anime-updates.kirragami.com/download",
    liveLabel: "Download",
    role: "Mobile Developer",
    timeline: "12 weeks",
    highlights: [
      "Developed a cross-platform Flutter app with smooth animations and responsive design.",
      "Managed app state efficiently using Riverpod for scalable and maintainable code.",
      "Implemented Kotlin for native features like video downloader.",
      "Fetched real-time anime updates via APIs and displayed them in an organized interface.",
      "Added personalized tracking and watch history to enhance engagement."
    ],
    demoLayout: 'web',
    screenshotLayout: 'mobile',
    images: [
      "/projects/anime-updates-app-screenshots/image.png",
      "/projects/anime-updates-app-screenshots/IMG_2641.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2642.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2643.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2644.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2645.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2646.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2647.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2648.jpg",
      "/projects/anime-updates-app-screenshots/IMG_2649.jpg"
    ]
  },
  {
    slug: "anime-updates-app",
    title: "Anime Updates – Latest Anime Tracking APIs",
    emoji: "🎬",
    tagline: "Backend API and scheduled jobs for fetching and organizing anime release data.",
    description:
      "This is developing APIs with Java and Spring Boot. It fetches, organizes, and serves the latest anime episodes and release schedules through REST APIs. Scheduled tasks keep the data current, while MySQL stores anime details, user preferences, and tracking history.",
    category: "Backend",
    tech: ["Java", "Spring Boot", "MySQL", "REST API"],
    githubUrl: "https://github.com/ademon118/anime-updates",
    liveUrl: "",
    role: "Backend Developer",
    timeline: "12 weeks",
    highlights: [
      "Implemented Spring Boot backend with REST APIs for fetching and managing anime data.",
      "Scheduled periodic updates using Spring Scheduler to keep anime information current.",
      "Designed MySQL schema for anime details, user preferences, and tracking history.",
      "Built service-layer logic for release schedules, episode tracking, and notifications.",
      "Exposed structured API endpoints consumed by the frontend layer."
    ]
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
    githubUrl: "https://github.com/ademon118/water_intaker_app",
    liveUrl: "",
    role: "Mobile Developer",
    timeline: "6 weeks",
    highlights: [
      "Designed a clean, intuitive UI with Flutter, ensuring smooth animations and responsive layouts.",
      "Implemented state management using Riverpod for reliable and scalable app behavior.",
      "Added daily reminders and notifications to help users stay consistent with hydration goals.",
      "Tracked water intake with interactive charts and history for motivational feedback.",
      "Built a rewards system with badges and achievements to keep users motivated."
    ],
    demoLayout: 'mobile',
    images: [
      "/projects/water-intaker-screenshots/IMG_2634.PNG",
      "/projects/water-intaker-screenshots/IMG_2633.PNG",
      "/projects/water-intaker-screenshots/IMG_2635.PNG",
      "/projects/water-intaker-screenshots/IMG_2636.PNG",
      "/projects/water-intaker-screenshots/IMG_2637.PNG",
      "/projects/water-intaker-screenshots/IMG_2638.PNG",
      "/projects/water-intaker-screenshots/IMG_2639.PNG",
      "/projects/water-intaker-screenshots/IMG_2640.PNG"
    ]
  },
  {
    slug: "students-listener",
    title: "Students Listener – English Skills Improvement Platform",
    emoji: "🎧",
    tagline: "Interactive Grade 6 English platform with lessons, games, and progress tracking.",
    description:
      "Students Listener is a web-based English learning platform for Grade 6 students. It combines video lessons, interactive games, vocabulary practice, and an AI-assisted objectives chat to help learners improve listening, speaking, reading, and writing skills. The dashboard tracks lesson completion, game progress, and personalized insights so students can see what to practice next.",
    category: "Education · Web App",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ademon118/Student-Listener",
    liveUrl: "https://student-listener.vercel.app/",
    role: "Front End Developer",
    timeline: "3 weeks",
    highlights: [
      "Built an interactive dashboard with quiz checks, progress charts, and personalized learning insights.",
      "Designed lesson pages with embedded video content and restaurant conversation practice.",
      "Created a curriculum overview with 2 lessons, 5 games, and 50 vocabulary words.",
      "Implemented an AI chat assistant for exploring learning objectives and study goals.",
      "Deployed a fast, mobile-friendly site on Vercel optimized for classroom and home use."
    ],
    demoLayout: 'web',
    images: [
      "/projects/student-demo.png",
      "/projects/students-listener-hero.png",
      "/projects/students-listener-dashboard.png",
      "/projects/students-listener-landing.png",
      "/projects/students-listener-curriculum.png",
      "/projects/students-listener-lessons.png",
      "/projects/students-listener-objectives.png",
      "/projects/students-listener-wireframe.png"
    ]
  }

];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);


