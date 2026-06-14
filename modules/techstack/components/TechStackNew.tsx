"use client";

import "../styles/TechStackNew.css";

interface TechItem {
  name: string;
  icon?: string;
  iconText?: string;
  url: string;
}

const techStack: TechItem[][] = [
  [
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://typescriptlang.org" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", url: "https://java.com" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://python.org" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", url: "https://en.cppreference.com/w/c" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org" },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", url: "https://go.dev" },
  ],
  [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
    { name: "Next.js", icon: "/next.svg", url: "https://nextjs.org" },
    { name: "Redux Toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", url: "https://redux-toolkit.js.org" },
    { name: "Zustand", icon: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/favicon.ico", url: "https://zustand-demo.pmnd.rs" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" },
    { name: "Shadcn UI", iconText: "UI", url: "https://ui.shadcn.com" },
    { name: "Recharts", iconText: "RC", url: "https://recharts.org" },
    { name: "Chart.js", iconText: "CJ", url: "https://chartjs.org" },
  ],
  [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" },
    { name: "Express.js", iconText: "EX", url: "https://expressjs.com" },
    { name: "REST APIs", iconText: "API", url: "https://restfulapi.net" },
    { name: "MQTT", iconText: "MQ", url: "https://mqtt.org" },
    { name: "WebSockets", iconText: "WS", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
    { name: "i18next", iconText: "i18", url: "https://www.i18next.com" },
  ],
  [
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", url: "https://mongodb.com" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "https://mysql.com" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "https://postgresql.org" },
    { name: "Clerk", icon: "/icons/techstack/clerk.svg", url: "https://clerk.com" },
    { name: "Better Auth", icon: "/icons/techstack/better-auth.svg", url: "https://www.better-auth.com" },
    { name: "JWT", icon: "/icons/techstack/jwt.svg", url: "https://jwt.io" },
  ],
  [
    { name: "Razorpay", icon: "/icons/techstack/razorpay.svg", url: "https://razorpay.com" },
    { name: "Polar", icon: "/icons/techstack/polar.svg", url: "https://polar.sh" },
    { name: "Stripe", icon: "/icons/techstack/stripe.svg", url: "https://stripe.com" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com" },
    { name: "GitHub", icon: "/icons/techstack/github.svg", url: "https://github.com" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", url: "https://postman.com" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://figma.com" },
  ],
];

const TechStackNew = () => {
  return (
    <div className="techstack-new">
      <div className="techstack-content">
        <h2>Tech Stack</h2>
        <div className="techstack-pyramid">
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  {tech.icon ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className={tech.icon.startsWith("/icons/techstack/") ? "techstack-logo-local" : undefined}
                      />
                    </>
                  ) : (
                    <span className="techstack-icon-fallback" aria-hidden="true">
                      {tech.iconText}
                    </span>
                  )}
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
