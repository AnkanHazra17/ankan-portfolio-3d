"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import setSplitText from "@/lib/utils/splitText";
import Landing from "@/modules/hero/components/Landing";
import About from "@/modules/about/components/About";
import WhatIDo from "@/modules/whatido/components/WhatIDo";
import Career from "@/modules/career/components/Career";
import Work from "@/modules/work/components/Work";
import TechStackNew from "@/modules/techstack/components/TechStackNew";
import CallToAction from "@/modules/cta/components/CallToAction";
import Contact from "@/modules/contact/components/Contact";
import { setAllTimeline } from "@/lib/utils/gsapScroll";

const getViewportState = () => ({
  isDesktopView: typeof window !== "undefined" ? window.innerWidth > 1024 : true,
  isMobile: typeof window !== "undefined" ? window.innerWidth <= 768 : false,
});

const MainContainer = ({ children }: PropsWithChildren) => {
  const [{ isDesktopView, isMobile }, setViewport] = useState(getViewportState);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setViewport(getViewportState());
      setAllTimeline();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && !isMobile && children}
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
