"use client";

import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "../styles/Contact.css";
import { config } from "@/lib/config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormEvent, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { label: "Resume", href: config.contact.resume },
  { label: "Github", href: config.contact.github },
  { label: "Linkedin", href: config.contact.linkedin },
  { label: "Twitter", href: config.contact.twitter },
  { label: "Facebook", href: config.contact.facebook },
  { label: "Instagram", href: config.contact.instagram },
].filter((link): link is { label: string; href: string } => Boolean(link.href));

const Contact = () => {
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, "", message].join("\n")
    );

    window.location.href = `mailto:${config.contact.email}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    contactTimeline.fromTo(
      ".contact-section h3",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    contactTimeline.fromTo(
      ".contact-box, .contact-form",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    return () => { contactTimeline.kill(); };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          <div className="contact-form-panel">
            <h4>Start a conversation</h4>
            <p>
              Send a short note with the details that matter. Your email app will open with the
              message ready to review.
            </p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
              />

              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about the role, project, or collaboration."
                required
              />

              <button type="submit" data-cursor="disable">
                Compose Email <MdArrowOutward aria-hidden="true" />
              </button>
            </form>
          </div>

          <div className="contact-details">
            <div className="contact-box">
              <h4>Email</h4>
              <p>
                <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                  {config.contact.email}
                </a>
              </p>
              <h4>Location</h4>
              <p><span>{config.social.location}</span></p>
            </div>
            <div className="contact-box">
              <h4>Links</h4>
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  {link.label} <MdArrowOutward aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="contact-box">
              <h2>
                Designed and Developed <br /> by <span>{config.developer.fullName}</span>
              </h2>
              <h5>
                <MdCopyright aria-hidden="true" /> {new Date().getFullYear()}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
