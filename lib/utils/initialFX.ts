import { TextSplitter } from "./textSplitter";
import gsap from "gsap";

export function initialFX() {
  if (typeof window === "undefined") return;

  document.body.style.overflowY = "auto";

  // Dynamically import lenis to avoid circular dependency issues
  import("@/components/Navbar").then(({ lenis }) => {
    if (lenis) lenis.start();
  });

  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) mainEl.classList.add("main-active");

  const backgroundColor =
    getComputedStyle(document.documentElement).getPropertyValue("--background").trim() ||
    "#120b07";

  gsap.to("body", {
    backgroundColor,
    duration: 0.5,
    delay: 1,
  });

  const selectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap((selector) =>
    Array.from(document.querySelectorAll(selector))
  );
  const landingText = new TextSplitter(elements, {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    { opacity: 1, duration: 1.2, filter: "blur(0px)", ease: "power3.inOut", y: 0, stagger: 0.025, delay: 0.3 }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingText2 = new TextSplitter(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    { opacity: 1, duration: 1.2, filter: "blur(0px)", ease: "power3.inOut", y: 0, stagger: 0.025, delay: 0.3 }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", y: 0, delay: 0.8 }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
  );

  const landingText3 = new TextSplitter(".landing-h2-info-1", TextProps);
  const landingText4 = new TextSplitter(".landing-h2-1", TextProps);
  const landingText5 = new TextSplitter(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: TextSplitter, Text2: TextSplitter) {
  if (Text1.chars.length === 0 || Text2.chars.length === 0) return;

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    { opacity: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: delay },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      { duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: delay2 },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: delay },
      0
    )
    .to(
      Text2.chars,
      { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: delay2 },
      1
    );
}
