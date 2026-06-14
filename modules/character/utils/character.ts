import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const characterWhite = new THREE.Color(0xf6f1e8);
const hairWarmBlack = new THREE.Color(0x19120d);
const eyeAmber = new THREE.Color(0xf0a33a);
const black = new THREE.Color(0x000000);
const preservedMeshNames = new Set(["screenlight"]);

type CharacterMaterialRole = "base" | "hair" | "iris" | "pupil";

interface CharacterMaterialSettings {
  color: THREE.Color;
  envMapIntensity: number;
  metalness: number;
  roughness: number;
}

const normalizeNameTokens = (value: string) => value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

const getCharacterMaterialRole = (mesh: THREE.Mesh, material: THREE.Material): CharacterMaterialRole => {
  const tokens = normalizeNameTokens(`${mesh.name} ${material.name}`);
  const hasEyeToken = tokens.some(
    (token) => token.startsWith("eye") && !token.startsWith("eyebrow") && !token.startsWith("eyelash")
  );

  if (tokens.some((token) => token.includes("pupil"))) return "pupil";
  if (tokens.some((token) => token.includes("iris"))) return "iris";
  if (hasEyeToken || tokens.some((token) => token.includes("eyeball"))) return "iris";
  if (tokens.some((token) => token.includes("hair"))) return "hair";

  return "base";
};

const getCharacterMaterialSettings = (role: CharacterMaterialRole): CharacterMaterialSettings => {
  switch (role) {
    case "hair":
      return {
        color: hairWarmBlack,
        envMapIntensity: 0.36,
        metalness: 0.01,
        roughness: 0.86,
      };
    case "iris":
      return {
        color: eyeAmber,
        envMapIntensity: 0.72,
        metalness: 0.03,
        roughness: 0.42,
      };
    case "pupil":
      return {
        color: black,
        envMapIntensity: 0.22,
        metalness: 0.01,
        roughness: 0.48,
      };
    case "base":
      return {
        color: characterWhite,
        envMapIntensity: 0.55,
        metalness: 0.02,
        roughness: 0.72,
      };
  }
};

const normalizeCharacterMaterial = (mesh: THREE.Mesh, material: THREE.Material): THREE.Material => {
  if (preservedMeshNames.has(mesh.name)) {
    return material;
  }

  const materialRole = getCharacterMaterialRole(mesh, material);
  const materialSettings = getCharacterMaterialSettings(materialRole);

  return new THREE.MeshStandardMaterial({
    color: materialSettings.color,
    depthTest: material.depthTest,
    depthWrite: material.depthWrite,
    emissive: black,
    emissiveIntensity: 0,
    envMapIntensity: materialSettings.envMapIntensity,
    metalness: materialSettings.metalness,
    name: `${material.name || mesh.name || "character"}-${materialRole}`,
    roughness: materialSettings.roughness,
    side: material.side,
    toneMapped: material.toneMapped,
    transparent: false,
  });
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    const encryptedBlob = await decryptFile("/models/character.enc", "Character3D#@");
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    return new Promise((resolve, reject) => {
      loader.load(
        blobUrl,
        (gltf) => {
          try {
            const character = gltf.scene;
            character.traverse((child) => {
              const mesh = child as THREE.Mesh;
              if (mesh.isMesh) {
                mesh.castShadow = false;
                mesh.receiveShadow = false;
                mesh.frustumCulled = true;
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                const normalizedMaterials = materials.map((material) => {
                  const normalizedMaterial = normalizeCharacterMaterial(mesh, material);
                  (normalizedMaterial as THREE.ShaderMaterial).precision = "mediump";
                  return normalizedMaterial;
                });
                mesh.material = Array.isArray(mesh.material) ? normalizedMaterials : normalizedMaterials[0];
              }
            });
            renderer.compile(character, camera, scene);
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            resolve(gltf);
          } catch (error) {
            reject(error);
          } finally {
            URL.revokeObjectURL(blobUrl);
            dracoLoader.dispose();
          }
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          URL.revokeObjectURL(blobUrl);
          dracoLoader.dispose();
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
