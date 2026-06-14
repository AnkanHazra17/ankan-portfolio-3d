"use client";

import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const isLegacySvgImage = props.image === "/images/eie.png";
  const preview = isLegacySvgImage ? (
    <>
      {/* This file has SVG content with a legacy .png name, so bypass next/image optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.image} alt={props.alt ?? "project preview"} className="work-preview-image" />
    </>
  ) : (
    <Image
      src={props.image}
      alt={props.alt ?? "project preview"}
      width={1200}
      height={675}
      sizes="(max-width: 768px) 100vw, 52vw"
      className="work-preview-image"
    />
  );

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(props.video);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  if (!props.link) {
    return (
      <div className="work-image">
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
        >
          {preview}
          {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
        </div>
      </div>
    );
  }

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {preview}
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
