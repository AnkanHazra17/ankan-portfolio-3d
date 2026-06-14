"use client";

import dynamic from "next/dynamic";
import LoadingProvider from "./LoadingProvider";

const MainContainer = dynamic(() => import("./MainContainer"), { ssr: false });

const CharacterScene = dynamic(
  () => import("@/modules/character/client").then((mod) => mod.CharacterScene),
  { ssr: false }
);

const ClientShell = () => {
  return (
    <LoadingProvider>
      <MainContainer>
        <CharacterScene />
      </MainContainer>
    </LoadingProvider>
  );
};

export default ClientShell;
