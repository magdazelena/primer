import { useEffect, useState } from "react";

// Keep this in sync with Tailwind's `md` breakpoint (default 768px).
export const MD_BREAKPOINT = 768;

export const useIsMdUp = () => {
  const [isMdUp, setIsMdUp] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth >= MD_BREAKPOINT;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMdUp(event.matches);
    };

    // Ensure state is in sync on mount
    setIsMdUp(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Fallback for older browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return isMdUp;
};

