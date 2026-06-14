"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import Loading from "./Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

const subscribeToResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const shouldUseCharacterLoader = () => window.innerWidth > 1024;
const getServerLoaderSnapshot = () => false;

const LoadingProvider = ({ children }: PropsWithChildren) => {
  const shouldLoadCharacter = useSyncExternalStore(
    subscribeToResize,
    shouldUseCharacterLoader,
    getServerLoaderSnapshot
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value: LoadingType = {
    isLoading: shouldLoadCharacter && isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    if (shouldLoadCharacter) return;

    import("@/lib/utils/initialFX").then((module) => {
      if (module.initialFX) {
        setTimeout(() => { module.initialFX(); }, 100);
      }
    });
  }, [shouldLoadCharacter]);

  return (
    <LoadingContext.Provider value={value}>
      {shouldLoadCharacter && isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};
