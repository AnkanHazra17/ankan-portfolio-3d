import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const warmMonitorColor = "#F4E7D0";
const warmScreenLight = "#FFE3BA";

const characterTriggerIds = [
  "character-landing",
  "character-about",
  "character-whatido",
  "whatido-mobile",
] as const;
const careerTriggerId = "career";

const killTriggers = (ids: readonly string[]) => {
  ids.forEach((id) => ScrollTrigger.getById(id)?.kill());
};

let intensityInterval: ReturnType<typeof setInterval> | null = null;

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  killTriggers(characterTriggerIds);

  let intensity: number = 0;
  if (intensityInterval) clearInterval(intensityInterval);
  intensityInterval = setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      id: "character-landing",
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      id: "character-about",
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      id: "character-whatido",
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  let screenLight: THREE.Mesh | null = null;
  let monitor: THREE.Mesh | null = null;

  character?.children.forEach((object: THREE.Object3D) => {
    const obj = object as THREE.Mesh & { material?: THREE.MeshStandardMaterial & { name?: string; transparent?: boolean; opacity?: number; emissive?: THREE.Color; emissiveIntensity?: number; color?: THREE.Color } };
    if (obj.name === "Plane004") {
      obj.children.forEach((child: THREE.Object3D) => {
        const c = child as THREE.Mesh & { material: THREE.MeshStandardMaterial & { name?: string; transparent?: boolean; opacity?: number; color?: THREE.Color } };
        c.material.transparent = true;
        c.material.opacity = 0;
        if (c.material.name === "Material.027") {
          monitor = c as unknown as THREE.Mesh;
          c.material.color.set(warmMonitorColor);
        }
      });
    }
    if (obj.name === "screenlight") {
      const sl = obj as THREE.Mesh & { material: THREE.MeshStandardMaterial & { transparent?: boolean; opacity?: number; emissive: THREE.Color; emissiveIntensity?: number } };
      sl.material.transparent = true;
      sl.material.opacity = 0;
      sl.material.emissive.set(warmScreenLight);
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(sl.material, {
        emissiveIntensity: () => intensity * 2.5,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = sl as unknown as THREE.Mesh;
    }
  });

  const neckBone = character?.getObjectByName("spine005");

  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      if (neckBone && monitor && screenLight) {
        tl2
          .to(camera.position, { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" }, 0)
          .to(".about-section", { y: "30%", duration: 6 }, 0)
          .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
          .fromTo(".character-model", { pointerEvents: "inherit" }, { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 }, 0)
          .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
          .to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
          .to((monitor as THREE.Mesh & { material: THREE.MeshStandardMaterial }).material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
          .to((screenLight as THREE.Mesh & { material: THREE.MeshStandardMaterial }).material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
          .fromTo(".what-box-in", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, delay: 6 }, 0)
          .fromTo((monitor as THREE.Mesh).position, { y: -10, z: 2 }, { y: 0, z: 0, delay: 1.5, duration: 3 }, 0)
          .fromTo(".character-rim", { opacity: 1, scaleX: 1.4 }, { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 }, 0.3);
      }

      tl3
        .fromTo(".character-model", { y: "0%" }, { y: "-100%", duration: 4, ease: "none", delay: 1 }, 0)
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          id: "whatido-mobile",
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { autoAlpha: 1, duration: 0.1, delay: 0 }, 0);
    }
  }

  ScrollTrigger.refresh();
}

export function setAllTimeline() {
  ScrollTrigger.getById(careerTriggerId)?.kill();

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      id: careerTriggerId,
      trigger: ".career-section",
      start: "top 50%",
      end: "bottom 30%",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(".career-timeline", { maxHeight: "0%" }, { maxHeight: "100%", duration: 1, ease: "none" }, 0)
    .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)
    .fromTo(".career-info-box", { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 0.5 }, 0)
    .fromTo(".career-dot", { animationIterationCount: "infinite" }, { animationIterationCount: "1", delay: 0.3, duration: 0.1 }, 0);

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(".career-section", { y: 0 }, { y: "20%", duration: 0.5, delay: 0.2 }, 0);
  } else {
    careerTimeline.fromTo(".career-section", { y: 0 }, { y: 0, duration: 0.5, delay: 0.2 }, 0);
  }

  ScrollTrigger.refresh();
}
