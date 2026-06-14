"use client";

import "../styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "@/lib/config";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let translateX = 0;

    function setTranslateX() {
      const track = document.querySelector<HTMLElement>(".work-flex");
      if (!track) return;
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".work-box"));
      const cardsWidth = cards.reduce((total, card) => total + card.getBoundingClientRect().width, 0);
      translateX = Math.max(cardsWidth - track.getBoundingClientRect().width, 0);
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => {
          setTranslateX();
          return `+=${translateX}`;
        },
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
        onRefreshInit: setTranslateX,
      },
    });

    timeline.to(".work-flex", { x: () => -translateX, ease: "none" });
    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>{project.role}</h4>
                <p className="work-description">{project.description}</p>
                <ul className="work-tech-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link href="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
