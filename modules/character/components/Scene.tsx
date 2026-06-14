"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "../utils/character";
import setLighting from "../utils/lighting";
import { useLoading } from "@/components/LoadingProvider";
import handleResize from "../utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "../utils/mouseUtils";
import setAnimations from "../utils/animationUtils";
import { setProgress } from "@/components/Loading";
import { setCharTimeline } from "@/lib/utils/gsapScroll";

const disposeObject = (object: THREE.Object3D) => {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => material?.dispose());
  });
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const canvasElement = canvasDiv.current;
    if (canvasElement) {
      let isDisposed = false;
      let character: THREE.Object3D | null = null;
      canvasElement.querySelectorAll("canvas").forEach((canvas) => canvas.remove());

      const rect = canvasElement.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasElement.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: (THREE.Mesh & { material: THREE.MeshStandardMaterial }) | null = null;
      let mixer: THREE.AnimationMixer;

      const timer = new THREE.Timer();
      timer.connect(document);
      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);
      let onResize: (() => void) | null = null;

      loadCharacter()
        .then((gltf) => {
          if (isDisposed) {
            if (gltf) disposeObject(gltf.scene);
            return;
          }
          if (!gltf) {
            progress.clear();
            return;
          }
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          const loadedCharacter = gltf.scene;
          character = loadedCharacter;
          setChar(loadedCharacter);
          scene.add(loadedCharacter);
          setCharTimeline(loadedCharacter, camera);
          headBone = loadedCharacter.getObjectByName("spine006") || null;
          screenLight = (loadedCharacter.getObjectByName("screenlight") as THREE.Mesh & { material: THREE.MeshStandardMaterial }) || null;
          progress.loaded().then(() => {
            if (isDisposed) return;
            setTimeout(() => {
              if (isDisposed) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          onResize = () => handleResize(renderer, camera, canvasDiv, loadedCharacter);
          window.addEventListener("resize", onResize);
        })
        .catch((error) => {
          if (isDisposed) return;
          console.error("Failed to load character scene:", error);
          progress.clear();
        });

      let mouse = { x: 0, y: 0 };
      let interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      let debounce: ReturnType<typeof setTimeout> | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let animationId: number;
      const animate = (time?: number) => {
        animationId = requestAnimationFrame(animate);
        timer.update(time);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = timer.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationId);
        clearTimeout(debounce);
        if (character) {
          scene.remove(character);
          disposeObject(character);
          character = null;
        }
        timer.dispose();
        scene.clear();
        renderer.forceContextLoss();
        renderer.dispose();
        document.removeEventListener("mousemove", onMouseMove);
        if (onResize) window.removeEventListener("resize", onResize);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (renderer.domElement.parentNode === canvasElement) {
          canvasElement.removeChild(renderer.domElement);
        }
      };
    }
  }, [setLoading]);

  return (
    <div className="character-container" ref={containerRef}>
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
