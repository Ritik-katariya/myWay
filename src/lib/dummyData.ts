// Dummy data for portfolio components when database is empty

export const dummyProjects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern UI and secure payment integration",
    longDescription: "A comprehensive e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart functionality, and secure payment processing using Stripe. The platform includes admin dashboard, order management, and real-time inventory tracking.",
    image: "/project.jpg",
    images: ["/project.jpg", "/project.jpg"],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    category: "web",
    status: "completed",
    featured: true,
    order: 1
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    longDescription: "A modern task management application that allows teams to collaborate effectively. Features include real-time updates, drag-and-drop functionality, file attachments, and team collaboration tools.",
    image: "/project.jpg",
    images: ["/project.jpg"],
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Express"],
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    category: "web",
    status: "completed",
    featured: true,
    order: 2
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather monitoring dashboard with interactive charts",
    longDescription: "A comprehensive weather dashboard that displays real-time weather data, forecasts, and historical trends. Features interactive charts, location-based weather, and customizable widgets.",
    image: "/project.jpg",
    images: ["/project.jpg"],
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3"],
    githubUrl: "https://github.com/username/weather-dashboard",
    liveUrl: "https://weather-demo.vercel.app",
    category: "web",
    status: "completed",
    featured: false,
    order: 3
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    longDescription: "A secure mobile banking application featuring biometric authentication, transaction history, bill payments, and money transfer capabilities. Built with React Native for cross-platform compatibility.",
    image: "/project.jpg",
    images: ["/project.jpg"],
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometric Auth"],
    githubUrl: "https://github.com/username/banking-app",
    liveUrl: null,
    category: "mobile",
    status: "in-progress",
    featured: true,
    order: 4
  },
  {
    title: "AI Chatbot",
    description: "Intelligent chatbot powered by machine learning and natural language processing",
    longDescription: "An AI-powered chatbot that can understand and respond to user queries using advanced NLP techniques. Features include context awareness, multi-language support, and learning capabilities.",
    image: "/project.jpg",
    images: ["/project.jpg"],
    technologies: ["Python", "TensorFlow", "OpenAI API", "FastAPI", "Docker"],
    githubUrl: "https://github.com/username/ai-chatbot",
    liveUrl: "https://chatbot-demo.vercel.app",
    category: "ai",
    status: "completed",
    featured: false,
    order: 5
  },
  {
    title: "Desktop File Manager",
    description: "Cross-platform desktop file manager with advanced search capabilities",
    longDescription: "A powerful desktop file manager built with Electron, featuring advanced search, file preview, batch operations, and cloud storage integration.",
    image: "/project.jpg",
    images: ["/project.jpg"],
    technologies: ["Electron", "React", "Node.js", "SQLite"],
    githubUrl: "https://github.com/username/file-manager",
    liveUrl: null,
    category: "desktop",
    status: "planned",
    featured: false,
    order: 6
  }
];

export const dummySkills = [
  {
    category: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
    order: 1
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "Vue.js", "Angular", "HTML5", "CSS3", "Tailwind CSS"],
    order: 2
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Express.js", "FastAPI", "Spring Boot", "REST APIs", "GraphQL"],
    order: 3
  },
  {
    category: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite"],
    order: 4
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub Actions"],
    order: 5
  },
  {
    category: "Mobile Development",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    order: 6
  },
  {
    category: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "OpenAI API", "Computer Vision", "NLP"],
    order: 7
  },
  {
    category: "Tools & Others",
    skills: ["VS Code", "Figma", "Postman", "Jest", "Cypress"],
    order: 8
  }
];

export const dummyAchievements = [
  {
    title: "Full Stack Developer Certification",
    description: "Completed comprehensive full-stack development program covering modern web technologies and best practices",
    icon: "🎓",
    order: 1
  },
  {
    title: "AWS Solutions Architect",
    description: "Achieved AWS Solutions Architect certification demonstrating expertise in cloud architecture and deployment",
    icon: "☁️",
    order: 2
  },
  {
    title: "Open Source Contributor",
    description: "Active contributor to multiple open-source projects with 500+ commits and 50+ repositories",
    icon: "🚀",
    order: 3
  },
  {
    title: "Hackathon Winner",
    description: "First place winner in national coding hackathon for innovative AI-powered solution",
    icon: "🏆",
    order: 4
  },
  {
    title: "Tech Conference Speaker",
    description: "Featured speaker at multiple tech conferences sharing knowledge about modern web development",
    icon: "🎤",
    order: 5
  },
  {
    title: "Mentor & Educator",
    description: "Mentored 100+ junior developers and conducted workshops on modern development practices",
    icon: "👨‍🏫",
    order: 6
  }
];

export const dummyTestimonials = [
  {
    name: "Sarah Johnson",
    designation: "Senior Product Manager",
    company: "TechCorp Inc.",
    quote: "Exceptional developer with outstanding problem-solving skills. Delivered our project ahead of schedule with impeccable code quality.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    order: 1
  },
  {
    name: "Michael Chen",
    designation: "CTO",
    company: "StartupXYZ",
    quote: "Outstanding technical expertise and communication skills. The solutions provided exceeded our expectations and helped scale our platform.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    order: 2
  },
  {
    name: "Emily Rodriguez",
    designation: "Lead Designer",
    company: "DesignStudio",
    quote: "Collaborative approach and attention to detail made our design-to-development handoff seamless. Highly recommend working with this developer.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    order: 3
  },
  {
    name: "David Kim",
    designation: "Engineering Manager",
    company: "BigTech Corp",
    quote: "Exceptional problem-solving abilities and clean code practices. Contributed significantly to our team's success and knowledge sharing.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    order: 4
  },
  {
    name: "Lisa Thompson",
    designation: "Project Director",
    company: "Innovation Labs",
    quote: "Professional, reliable, and technically excellent. Delivered complex projects on time with outstanding quality and documentation.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    order: 5
  }
];

export const dummyTimeline = [
  {
    title: "2024",
    content: "Launched multiple full-stack applications and contributed to open-source projects. Achieved AWS Solutions Architect certification and spoke at 3 tech conferences.",
    images: [
      "https://assets.aceternity.com/templates/startup-1.webp",
      "https://assets.aceternity.com/templates/startup-2.webp",
      "https://assets.aceternity.com/templates/startup-3.webp",
      "https://assets.aceternity.com/templates/startup-4.webp"
    ],
    date: new Date("2024-01-01"),
    order: 1
  },
  {
    title: "2023",
    content: "Completed advanced full-stack development bootcamp and started contributing to major open-source projects. Built and deployed 10+ web applications.",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png"
    ],
    date: new Date("2023-01-01"),
    order: 2
  },
  {
    title: "2022",
    content: "Started learning web development fundamentals. Completed multiple online courses and built first portfolio projects. Participated in first hackathon.",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png"
    ],
    date: new Date("2022-01-01"),
    order: 3
  }
];

export const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  avatar: "/profile.png",
  bio: "Passionate full-stack developer with expertise in modern web technologies. I love building scalable applications and contributing to open-source projects.",
  title: "Full Stack Developer",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe",
  instagram: "https://instagram.com/johndoe",
  resume: "/resume.pdf"
};
