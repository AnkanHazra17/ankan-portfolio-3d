import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const warmSpotlight = new THREE.SpotLight(0xfff1dc, 0, 70, Math.PI / 7, 0.72, 1.5);
  warmSpotlight.position.set(-3, 16, 13);
  warmSpotlight.target.position.set(0, 8, 0);
  warmSpotlight.castShadow = true;
  warmSpotlight.shadow.mapSize.width = 1024;
  warmSpotlight.shadow.mapSize.height = 1024;
  warmSpotlight.shadow.camera.near = 0.5;
  warmSpotlight.shadow.camera.far = 50;
  scene.add(warmSpotlight);
  scene.add(warmSpotlight.target);

  const pointLight = new THREE.PointLight(0xffd8ad, 0, 80, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader().setPath("/models/").load("char_enviorment.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.environmentIntensity = 0;
    scene.environmentRotation.set(5.76, 85.85, 1);
  });

  function setPointLight(screenLight: THREE.Mesh & { material: THREE.MeshStandardMaterial } | null) {
    if (!screenLight) return;
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 5;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    gsap.to(scene, { environmentIntensity: 0.42, duration, ease });
    gsap.to(warmSpotlight, { intensity: 0.82, duration, ease });
    gsap.to(".character-rim", { y: "55%", opacity: 0.42, delay: 0.2, duration: 2 });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
