export interface DeveloperConfig {
  name: string;
  fullName: string;
  title: string;
  description: string;
  roles: [string, string];
}

export interface SocialConfig {
  github: string;
  email: string;
  location: string;
}

export interface AboutConfig {
  title: string;
  description: string;
}

export interface ExperienceEntry {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectEntry {
  id: number;
  title: string;
  category: string;
  role: string;
  technologies: string[];
  image: string;
  description: string;
}

export interface ContactConfig {
  email: string;
  resume: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  details: string;
  tools: string[];
}

export interface Config {
  developer: DeveloperConfig;
  social: SocialConfig;
  about: AboutConfig;
  experiences: ExperienceEntry[];
  projects: ProjectEntry[];
  contact: ContactConfig;
  skills: {
    develop: SkillCategory;
    design: SkillCategory;
  };
}

export const config: Config = {
  developer: {
    name: "Ankan",
    fullName: "Ankan Hazra",
    title: "Full Stack Software Engineer",
    roles: ["Software Engineer", "Full-Stack Developer"],
    description:
      "Full Stack Software Engineer working across React, Next.js, TypeScript, Node.js, MongoDB, MQTT, and real-time systems. Focused on healthcare dashboards, IoT monitoring, authentication, state management, frontend architecture, and payment integrations.",
  },
  social: {
    github: "",
    email: "ankan.hazra1710@gmail.com",
    location: "Tamluk, West Bengal, India",
  },
  about: {
    title: "About Me",
    description:
      "I am a Full Stack Software Engineer at SEDA G-Tech, building real-time dashboards and production web apps with React, Next.js, TypeScript, Node.js, and MQTT. I focus on clean frontend architecture, authentication, analytics, and reliable user experiences.",
  },
  experiences: [
    {
      position: "Software Engineer",
      company: "SEDA G-Tech",
      period: "Aug 2025 - Present",
      location: "Taiwan",
      description:
        "Developing scalable frontend applications and production dashboards for healthcare and IoT monitoring systems.",
      responsibilities: [
        "Developed scalable frontend applications using React.js, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, and Zustand.",
        "Built MQTT-based real-time sensor dashboards for healthcare and IoT monitoring workflows.",
        "Created reusable UI components, custom hooks, role-based access control, and responsive layouts.",
        "Integrated REST APIs, cookie-based authentication, Clerk, Better Auth, i18next, and payment gateways including Razorpay, Polar, and Stripe.",
        "Improved performance by reducing unnecessary API calls, optimizing renders, and updating only changed state.",
      ],
      technologies: ["React.js", "Next.js", "TypeScript", "MQTT", "Redux Toolkit", "Zustand", "Tailwind CSS"],
    },
    {
      position: "Software Engineering Intern",
      company: "SEDA G-Tech",
      period: "Aug 2024 - Aug 2025",
      location: "Taiwan",
      description:
        "Built responsive dashboards, live monitoring tools, and analytics features while contributing to production frontend workflows.",
      responsibilities: [
        "Built responsive dashboards using React.js, TypeScript, Tailwind CSS, and Shadcn UI.",
        "Implemented MQTT integration for live device status updates, notifications, and event-driven UI changes.",
        "Developed graphs and time-based analytics using Recharts and Chart.js.",
        "Worked with REST APIs, authentication, Redux Toolkit, Zustand, and frontend state management.",
        "Contributed to multilingual support using i18next and supported deployment workflows with Git.",
      ],
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "MQTT", "Recharts", "Chart.js"],
    },
    {
      position: "Master's Degree",
      company: "Yuan Ze University",
      period: "Expected 2027",
      location: "Taiwan",
      description: "Pursuing graduate studies while continuing full-time software engineering work.",
      responsibilities: [
        "Balancing academic growth with production software engineering responsibilities.",
        "Deepening full-stack development, system design, and applied engineering foundations.",
      ],
      technologies: ["Software Engineering", "System Design", "Full-Stack Development"],
    },
    {
      position: "B.E. in Computer Science and Engineering",
      company: "Chandigarh University",
      period: "Aug 2021 - Jun 2025",
      location: "Punjab, India",
      description: "Completed undergraduate studies in Computer Science and Engineering.",
      responsibilities: [
        "Studied core computer science, programming, software development, and engineering fundamentals.",
        "Built a technical foundation across JavaScript, TypeScript, Java, Python, C++, C, and Go.",
      ],
      technologies: ["Computer Science", "JavaScript", "TypeScript", "Java", "Python", "C++", "Go"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "ArchForge",
      category: "AI Architecture Builder",
      role: "Full-stack product engineering",
      technologies: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Tailwind CSS"],
      image: "/images/projects/archforge.png",
      description:
        "An AI-powered architecture workspace for generating, refining, and exporting technical system designs. Built around a polished collaborative interface, typed API flows, and durable project data for architecture teams.",
    },
    {
      id: 2,
      title: "WhizPad",
      category: "Smart Mattress Care System",
      role: "SEDA G-Tech production work",
      technologies: ["React", "Go", "MariaDB", "MongoDB", "GCP", "Tailwind CSS"],
      image: "/images/projects/whizpad.png",
      description:
        "A real-time care dashboard for smart mattress monitoring, built for older-adult safety workflows. The system surfaces bed status, pressure risk, device alerts, and patient context for faster caregiver response.",
    },
    {
      id: 3,
      title: "StudyNotion",
      category: "EdTech Platform",
      role: "Full-stack learning platform",
      technologies: ["React", "Express", "MongoDB", "Tailwind CSS"],
      image: "/images/projects/studynotion.png",
      description:
        "A course marketplace and learning platform for instructors and students, covering course discovery, account flows, and education-focused UI patterns across a MERN-style application stack.",
    },
  ],
  contact: {
    email: "ankan.hazra1710@gmail.com",
    resume: "/Ankan_SWE.pdf",
  },
  skills: {
    develop: {
      title: "FRONTEND ENGINEERING",
      description: "Production dashboards, real-time UI, and frontend architecture",
      details:
        "Building scalable applications with React.js, Next.js, TypeScript, Tailwind CSS, Shadcn UI, Redux Toolkit, Zustand, reusable components, custom hooks, and responsive layouts.",
      tools: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Redux Toolkit",
        "Zustand",
        "Recharts",
        "Chart.js",
        "i18next",
      ],
    },
    design: {
      title: "FULL-STACK SYSTEMS",
      description: "APIs, real-time systems, auth, databases, and payments",
      details:
        "Integrating Node.js, Express.js, REST APIs, MongoDB, MySQL, PostgreSQL, MQTT, WebSockets, Clerk, Better Auth, JWT, cookie-based authentication, Razorpay, Polar, and Stripe.",
      tools: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "MQTT",
        "WebSockets",
        "Clerk",
        "Better Auth",
        "Stripe",
        "Git",
      ],
    },
  },
};
