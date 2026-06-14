"use client";

import "./HoverLinks.css";

interface HoverLinksProps {
  text: string;
  cursor?: boolean;
}

const HoverLinks = ({ text, cursor }: HoverLinksProps) => {
  return (
    <div className="hover-link" data-cursor={!cursor ? "disable" : undefined}>
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;
